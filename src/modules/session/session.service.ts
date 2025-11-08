// src/modules/session/session.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { SessionEntity } from './entities/session.entity';
import { SessionPracticeEntity } from './entities/session-practice.entity';
import { PracticeSetEntity } from './entities/practice-set.entity';
import { PracticeEntity } from '../practice/entities/practice.entity';
import { WorkoutEntity } from '../workouts/entities/workout.entity';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { RecordSetDto } from './dto/record-set.dto';
import { SessionStatus } from './enum/session-status.enum';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,

    @InjectRepository(SessionPracticeEntity)
    private readonly sessionPracticeRepository: Repository<SessionPracticeEntity>,

    @InjectRepository(PracticeSetEntity)
    private readonly practiceSetRepository: Repository<PracticeSetEntity>,

    @InjectRepository(PracticeEntity)
    private readonly practiceRepository: Repository<PracticeEntity>,

    @InjectRepository(WorkoutEntity)
    private readonly workoutRepository: Repository<WorkoutEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly dataSource: DataSource,
  ) {}

  /**
   * Start a new workout session
   */
  async startSession(
    userId: number,
    createSessionDto: CreateSessionDto,
  ): Promise<SessionEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let workout: WorkoutEntity | null = null;
    if (createSessionDto.workoutId) {
      workout = await this.workoutRepository.findOne({
        where: { id: createSessionDto.workoutId },
        relations: ['practiceList', 'practiceList.exercise'],
      });
      if (!workout) {
        throw new NotFoundException('Workout template not found');
      }
    }

    // Use snake_case column names
    const session = this.sessionRepository.create({
      user: { id: userId },
      workout: workout ? { id: workout.id } : undefined,
      start_time: createSessionDto.startTime || new Date(),
      status: SessionStatus.ACTIVE,
      notes: createSessionDto.notes,
    });

    const savedSession = await this.sessionRepository.save(session);

    // If using a workout template, create session practices
    if (workout && workout.practiceList) {
      const sessionPractices = workout.practiceList.map((practice) =>
        this.sessionPracticeRepository.create({
          session: { id: savedSession.id }, // savedSession is a single entity, not array
          practice: { id: practice.id },
          exercise: { id: practice.exercise.id },
          order_index: practice.order,
        }),
      );

      await this.sessionPracticeRepository.save(sessionPractices);
    }

    return this.sessionRepository.findOne({
      where: { id: savedSession.id },
      relations: ['workout', 'sessionPractices', 'sessionPractices.exercise'],
    });
  }

  /**
   * Complete a session
   */
  async completeSession(
    sessionId: number,
    updateSessionDto: UpdateSessionDto,
  ): Promise<SessionEntity> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['sessionPractices', 'sessionPractices.sets'],
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.status === SessionStatus.COMPLETED) {
      throw new BadRequestException('Session is already completed');
    }

    session.status = SessionStatus.COMPLETED;
    session.end_time = updateSessionDto.endTime || new Date();

    if (updateSessionDto.notes) {
      session.notes = updateSessionDto.notes;
    }

    // Calculate total volume
    session.total_volume = await this.calculateSessionVolume(sessionId);

    return this.sessionRepository.save(session);
  }

  /**
   * Record a set for a session practice
   */
  async recordSet(
    sessionPracticeId: number,
    recordSetDto: RecordSetDto,
  ): Promise<PracticeSetEntity> {
    const sessionPractice = await this.sessionPracticeRepository.findOne({
      where: { id: sessionPracticeId },
      relations: ['session'],
    });

    if (!sessionPractice) {
      throw new NotFoundException('Session practice not found');
    }

    if (sessionPractice.session.status === SessionStatus.COMPLETED) {
      throw new BadRequestException('Cannot record sets for completed session');
    }

    // Check if set already exists
    const existingSet = await this.practiceSetRepository.findOne({
      where: {
        sessionPractice: { id: sessionPracticeId },
        set_number: recordSetDto.setNumber,
      },
    });

    let practiceSet: PracticeSetEntity;

    if (existingSet) {
      // Update existing set
      practiceSet = this.practiceSetRepository.merge(existingSet, {
        weight: recordSetDto.weight,
        reps: recordSetDto.reps,
        duration_seconds: recordSetDto.durationSeconds,
        rest_taken_seconds: recordSetDto.restTakenSeconds,
        rpe: recordSetDto.rpe,
        completed: recordSetDto.completed ?? true,
        completed_at: recordSetDto.completed
          ? new Date()
          : existingSet.completed_at,
        volume: this.calculateSetVolume(recordSetDto),
      });
    } else {
      // Create new set
      practiceSet = this.practiceSetRepository.create({
        sessionPractice: { id: sessionPracticeId },
        set_number: recordSetDto.setNumber,
        weight: recordSetDto.weight,
        reps: recordSetDto.reps,
        duration_seconds: recordSetDto.durationSeconds,
        rest_taken_seconds: recordSetDto.restTakenSeconds,
        rpe: recordSetDto.rpe,
        completed: recordSetDto.completed ?? true,
        completed_at: recordSetDto.completed ? new Date() : null,
        volume: this.calculateSetVolume(recordSetDto),
      });
    }

    const savedSet = await this.practiceSetRepository.save(practiceSet);

    // Update session practice summary
    await this.updateSessionPracticeSummary(sessionPracticeId);

    return this.practiceSetRepository.findOne({
      where: { id: savedSet.id },
      relations: ['sessionPractice', 'sessionPractice.exercise'],
    });
  }

  /**
   * Get session by ID with details
   */
  async getSessionById(sessionId: number): Promise<SessionEntity> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: [
        'workout',
        'sessionPractices',
        'sessionPractices.exercise',
        'sessionPractices.sets',
        'sessionPractices.practice',
      ],
      order: {
        sessionPractices: { order_index: 'ASC' },
        // 'sessionPractices.sets': { set_number: 'ASC' },
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  /**
   * Get user's session history
   */
  async getUserSessions(
    userId: number,
    options: {
      page?: number;
      limit?: number;
      status?: SessionStatus;
      fromDate?: Date;
      toDate?: Date;
    } = {},
  ): Promise<{ sessions: SessionEntity[]; total: number }> {
    const { page = 1, limit = 20, status, fromDate, toDate } = options;
    const skip = (page - 1) * limit;

    const query = this.sessionRepository
      .createQueryBuilder('session')
      .where('session.user.id = :userId', { userId })
      .leftJoinAndSelect('session.workout', 'workout')
      .leftJoinAndSelect('session.sessionPractices', 'sessionPractices')
      .leftJoinAndSelect('sessionPractices.exercise', 'exercise')
      .orderBy('session.start_time', 'DESC')
      .skip(skip)
      .take(limit);

    if (status) {
      query.andWhere('session.status = :status', { status });
    }

    if (fromDate) {
      query.andWhere('session.start_time >= :fromDate', { fromDate });
    }

    if (toDate) {
      query.andWhere('session.start_time <= :toDate', { toDate });
    }

    const [sessions, total] = await query.getManyAndCount();

    return { sessions, total };
  }

  /**
   * Get exercise history for a user
   */
  async getExerciseHistory(
    userId: number,
    exerciseId: number,
  ): Promise<PracticeSetEntity[]> {
    return this.practiceSetRepository
      .createQueryBuilder('set')
      .innerJoin('set.sessionPractice', 'sessionPractice')
      .innerJoin('sessionPractice.session', 'session')
      .innerJoin('sessionPractice.exercise', 'exercise')
      .where('session.user.id = :userId', { userId })
      .andWhere('exercise.id = :exerciseId', { exerciseId })
      .andWhere('session.status = :status', { status: SessionStatus.COMPLETED })
      .leftJoinAndSelect('set.sessionPractice', 'sp')
      .leftJoinAndSelect('sp.session', 's')
      .orderBy('s.start_time', 'DESC')
      .addOrderBy('set.set_number', 'ASC')
      .getMany();
  }

  /**
   * Get user's last session
   */
  async getLastUserSession(userId: number): Promise<SessionEntity | null> {
    return this.sessionRepository.findOne({
      where: { user: { id: userId } },
      order: { start_time: 'DESC' },
      relations: ['workout', 'sessionPractices', 'sessionPractices.exercise'],
    });
  }

  /**
   * Calculate volume for a single set
   */
  private calculateSetVolume(setData: RecordSetDto): number {
    if (setData.weight && setData.reps) {
      return setData.weight * setData.reps;
    }
    // For time-based exercises, you might want a different metric
    if (setData.durationSeconds) {
      return setData.durationSeconds; // Or implement different logic
    }
    return 0;
  }

  /**
   * Calculate total volume for a session
   */
  private async calculateSessionVolume(sessionId: number): Promise<number> {
    const result = await this.practiceSetRepository
      .createQueryBuilder('set')
      .innerJoin('set.sessionPractice', 'sessionPractice')
      .innerJoin('sessionPractice.session', 'session')
      .where('session.id = :sessionId', { sessionId })
      .select('COALESCE(SUM(set.volume), 0)', 'totalVolume')
      .getRawOne();

    return parseFloat(result.totalVolume);
  }

  /**
   * Update session practice summary (total volume, best set, etc.)
   */
  private async updateSessionPracticeSummary(
    sessionPracticeId: number,
  ): Promise<void> {
    const summary = await this.practiceSetRepository
      .createQueryBuilder('set')
      .where('set.sessionPractice.id = :sessionPracticeId', {
        sessionPracticeId,
      })
      .select('COALESCE(SUM(set.volume), 0)', 'totalVolume')
      .addSelect('MAX(set.weight)', 'maxWeight')
      .getRawOne();

    await this.sessionPracticeRepository.update(sessionPracticeId, {
      total_volume: parseFloat(summary.totalVolume),
      best_set_weight: summary.maxWeight ? parseFloat(summary.maxWeight) : null,
    });
  }

  async deleteSession(sessionId: number, userId?: number): Promise<void> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['user'],
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    // Optional: Check if user owns the session
    if (userId && session.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own sessions');
    }

    // Soft delete - set status to cancelled
    session.status = SessionStatus.CANCELLED;
    await this.sessionRepository.save(session);

    // Alternative: Hard delete (use with caution)
    // await this.sessionRepository.remove(session);
  }

  /**
   * Alternative: Hard delete method
   */
  async hardDeleteSession(sessionId: number, userId?: number): Promise<void> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['user'],
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (userId && session.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own sessions');
    }

    // Use transaction to delete related records
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      // Delete sets first
      await transactionalEntityManager
        .createQueryBuilder()
        .delete()
        .from(PracticeSetEntity)
        .where(
          'session_practice_id IN (SELECT id FROM session_practices WHERE session_id = :sessionId)',
          { sessionId },
        )
        .execute();

      // Delete session practices
      await transactionalEntityManager
        .createQueryBuilder()
        .delete()
        .from(SessionPracticeEntity)
        .where('session_id = :sessionId', { sessionId })
        .execute();

      // Delete session
      await transactionalEntityManager
        .createQueryBuilder()
        .delete()
        .from(SessionEntity)
        .where('id = :sessionId', { sessionId })
        .execute();
    });
  }
}
