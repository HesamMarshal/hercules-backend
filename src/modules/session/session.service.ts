// src/modules/session/session.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Inject,
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
import { UserService } from '../user/user.service';
import { SessionMessage } from './messages/message.enum';
import { PauseSessionDto } from './dto/pause-session.dto';

@Injectable()
export class SessionService {
  constructor(
    // @Inject(REQUEST) private request: Request,
    private readonly userService: UserService,

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

    // @InjectRepository(UserEntity)
    // private readonly userRepository: Repository<UserEntity>,

    private readonly dataSource: DataSource,
  ) {}

  /**
   * Start a new workout session
   */
  async startSession(
    createSessionDto: CreateSessionDto,
  ): Promise<SessionEntity> {
    const { data: user } = await this.userService.findMyProfile();

    if (!user) {
      throw new NotFoundException(SessionMessage.USER_NOT_FOUND);
    }

    // TODO: Checks if workout belongs to user (if workoutId provided)
    let workout: WorkoutEntity | null = null;
    if (createSessionDto.workoutId) {
      workout = await this.workoutRepository.findOne({
        where: { id: createSessionDto.workoutId },
        relations: [
          'plan',
          'user',
          'plan.user',
          // 'practiceList',
          // 'practiceList.exercise',
        ],
      });
      if (!workout) {
        throw new NotFoundException(SessionMessage.WORKOUT_NOT_FOUND);
      }
    }
    console.log(workout);
    if (workout.user.id !== user.id) {
      throw new ForbiddenException(SessionMessage.ACCESS_DENIED);
    }

    const session = this.sessionRepository.create({
      user: { id: user.id },
      workout: workout ? { id: workout.id } : undefined,
      start_time: new Date(),
      status: SessionStatus.ACTIVE,
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
   * Pause an active session.
   */
  async pauseSession(
    sessionId: number,
    dto?: PauseSessionDto,
  ): Promise<SessionEntity> {
    const { data: user } = await this.userService.findMyProfile();
    if (!user) throw new NotFoundException(SessionMessage.USER_NOT_FOUND);

    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['user'],
    });

    if (!session) throw new NotFoundException(SessionMessage.SESSION_NOT_FOUND);
    if (session.user.id !== user.id)
      throw new ForbiddenException(SessionMessage.ACCESS_DENIED);

    // Only ACTIVE sessions can be paused
    if (session.status === SessionStatus.PAUSED) {
      // idempotent - already paused
      return session;
    }
    if (session.status !== SessionStatus.ACTIVE) {
      throw new BadRequestException(
        SessionMessage.INVALID_SESSION_STATE_FOR_PAUSE,
      );
    }

    session.status = SessionStatus.PAUSED;
    session.last_paused_at = new Date();
    // optionally store the reason in notes
    if (dto?.reason) {
      session.notes = session.notes
        ? `${session.notes}\nPAUSE_REASON: ${dto.reason}`
        : `PAUSE_REASON: ${dto.reason}`;
    }

    return this.sessionRepository.save(session);
  }

  /**
   * Resume a paused session (calculate pause duration)
   */
  async resumeSession(sessionId: number): Promise<SessionEntity> {
    const { data: user } = await this.userService.findMyProfile();
    if (!user) throw new NotFoundException(SessionMessage.USER_NOT_FOUND);

    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['user'],
    });

    if (!session) throw new NotFoundException(SessionMessage.SESSION_NOT_FOUND);
    if (session.user.id !== user.id)
      throw new ForbiddenException(SessionMessage.ACCESS_DENIED);

    if (session.status !== SessionStatus.PAUSED) {
      throw new BadRequestException(
        SessionMessage.INVALID_SESSION_STATE_FOR_RESUME,
      );
    }

    // Calculate paused duration
    const now = new Date();
    if (!session.last_paused_at) {
      // Defensive: if missing paused_at, still allow resume (no pause delta)
      session.last_resumed_at = now;
      session.status = SessionStatus.ACTIVE;
      return this.sessionRepository.save(session);
    }

    const pausedMs = now.getTime() - new Date(session.last_paused_at).getTime();
    const pausedSeconds = Math.floor(pausedMs / 1000);

    session.total_pause_seconds =
      (session.total_pause_seconds || 0) + pausedSeconds;
    session.last_paused_at = null;
    session.last_resumed_at = now;
    session.status = SessionStatus.ACTIVE;

    return this.sessionRepository.save(session);
  }

  /**
   * Complete a session
   */
  async completeSession(
    sessionId: number,
    updateSessionDto: UpdateSessionDto,
  ): Promise<SessionEntity> {
    const session = await this.validateSessionOwnership(sessionId);

    if (session.status === SessionStatus.COMPLETED) {
      throw new BadRequestException(SessionMessage.SESSION_ALREADY_COMPLETED);
    }

    session.status = SessionStatus.COMPLETED;
    // session.end_time = updateSessionDto.endTime || new Date();

    // total active duration in seconds (if start_time exists)
    if (session.start_time) {
      const totalMs =
        new Date(session.end_time).getTime() -
        new Date(session.start_time).getTime();
      const totalSeconds = Math.floor(totalMs / 1000);
      // active seconds = total - paused
      session.duration_seconds =
        totalSeconds - (session.total_pause_seconds || 0);
    }
    session.total_pause_seconds = session.total_pause_seconds || 0;

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
    sessionId: number,
    practiceId: number,
    recordSetDto: RecordSetDto,
  ): Promise<PracticeSetEntity> {
    const { data: user } = await this.userService.findMyProfile();

    const sessionPractice = await this.sessionPracticeRepository.findOne({
      where: { id: practiceId, session: { id: sessionId } },
      relations: ['session', 'session.user'],
    });

    if (!sessionPractice) {
      throw new NotFoundException(SessionMessage.SESSION_PRACTICE_NOT_FOUND);
    }

    // ✅ Allow only the session owner to update
    if (sessionPractice.session.user.id !== user.id) {
      throw new ForbiddenException(SessionMessage.ACCESS_DENIED);
    }

    // ✅ Prevent modifying completed session
    if (sessionPractice.session.status === SessionStatus.COMPLETED) {
      throw new BadRequestException(
        SessionMessage.CANNOT_RECORD_FOR_COMPLETED_SESSION,
      );
    }

    // --- CREATE OR UPDATE SET ---
    const existingSet = await this.practiceSetRepository.findOne({
      where: {
        sessionPractice: { id: practiceId },
        set_number: recordSetDto.setNumber,
      },
    });

    let practiceSet: PracticeSetEntity;

    if (existingSet) {
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
      practiceSet = this.practiceSetRepository.create({
        sessionPractice: { id: practiceId },
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

    // ✅ Recalculate summary (total sets, volume, etc.)
    await this.updateSessionPracticeSummary(practiceId);

    return this.practiceSetRepository.findOne({
      where: { id: savedSet.id },
      relations: ['sessionPractice', 'sessionPractice.exercise'],
    });
  }

  /**
   * Get session by ID with details
   */
  async getSessionById(sessionId: number): Promise<SessionEntity> {
    const { data: user } = await this.userService.findMyProfile();
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
      throw new NotFoundException(SessionMessage.SESSION_NOT_FOUND);
    }
    if (session.user.id !== user.id) {
      throw new ForbiddenException(SessionMessage.ACCESS_DENIED);
    }

    return session;
  }

  /**
   * Get user's session history
   */
  async getUserSessions(
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

    const { data: user } = await this.userService.findMyProfile();

    if (!user) {
      throw new NotFoundException(SessionMessage.USER_NOT_FOUND);
    }

    const query = this.sessionRepository
      .createQueryBuilder('session')
      .where('session.user.id = :userId', { userId: user.id })
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
  async getExerciseHistory(exerciseId: number): Promise<PracticeSetEntity[]> {
    const { data: user } = await this.userService.findMyProfile();

    if (!user) {
      throw new NotFoundException(SessionMessage.USER_NOT_FOUND);
    }

    return this.practiceSetRepository
      .createQueryBuilder('set')
      .innerJoin('set.sessionPractice', 'sessionPractice')
      .innerJoin('sessionPractice.session', 'session')
      .innerJoin('sessionPractice.exercise', 'exercise')
      .where('session.user.id = :userId', { userId: user.id })
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
  async getLastUserSession(): Promise<SessionEntity | null> {
    const { data: user } = await this.userService.findMyProfile();

    if (!user) {
      throw new NotFoundException(SessionMessage.USER_NOT_FOUND);
    }
    return this.sessionRepository.findOne({
      where: { user: { id: user.id } },
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

  async deleteSession(sessionId: number): Promise<void> {
    const { data: user } = await this.userService.findMyProfile();
    if (!user) {
      throw new NotFoundException(SessionMessage.USER_NOT_FOUND);
    }

    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['user'],
    });

    if (!session) {
      throw new NotFoundException(SessionMessage.SESSION_NOT_FOUND);
    }

    // Optional: Check if user owns the session
    if (session.user.id !== user.id) {
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
  async hardDeleteSession(sessionId: number): Promise<void> {
    // ✅ Use your helper method for ownership validation
    const session = await this.validateSessionOwnership(sessionId);

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
  // Helpers

  private async validateSessionOwnership(
    sessionId: number,
  ): Promise<SessionEntity> {
    const { data: user } = await this.userService.findMyProfile();

    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['user'], // Make sure to include user relation
    });

    if (!session) throw new NotFoundException(SessionMessage.SESSION_NOT_FOUND);
    if (session.user.id !== user.id)
      throw new ForbiddenException(SessionMessage.ACCESS_DENIED);

    return session;
  }

  private findSessionPractice(sessionId: number, practiceId: number) {
    return this.sessionPracticeRepository.findOne({
      where: { id: practiceId, session: { id: sessionId } },
      relations: ['session', 'session.user'],
    });
  }
}
