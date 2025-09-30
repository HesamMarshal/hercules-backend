// src/modules/practice/practice.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PracticeEntity } from './entities/practice.entity';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { CompletePracticeDto } from './dto/complete-practice.dto';
import { WorkoutEntity } from '../workouts/entities/workout.entity';
import { ExerciseEntity } from '../exercise/entities/exercise.entity';
import { REQUEST } from '@nestjs/core';
import { PracticeStatus } from './enums/practiceStatus.enum';
import { Roles } from '../../common/enum/role.enum';
import { SetType } from './enums/setType.enum';
import { PracticeMessage } from './messages/message.enum';

@Injectable()
export class PracticeService {
  constructor(
    @InjectRepository(PracticeEntity)
    private readonly practiceRepository: Repository<PracticeEntity>,
    @InjectRepository(WorkoutEntity)
    private readonly workoutRepository: Repository<WorkoutEntity>,
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
    @Inject(REQUEST) private readonly request: any,
  ) {}

  async create(createPracticeDto: CreatePracticeDto) {
    const { user } = this.request;
    if (!user) throw new ForbiddenException('Authentication required');

    const { workoutId, exerciseId, ...practiceData } = createPracticeDto;

    // Verify workout exists and user has access
    const workout = await this.workoutRepository.findOne({
      where: { id: workoutId },
      relations: ['user'],
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${workoutId} not found`);
    }

    await this.checkWorkoutAccess(workout, user);

    // Verify exercise exists
    const exercise = await this.exerciseRepository.findOne({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${exerciseId} not found`);
    }

    // Set default order if not provided
    if (!practiceData.order) {
      const lastPractice = await this.practiceRepository.findOne({
        where: { workout: { id: workoutId } },
        order: { order: 'DESC' },
      });
      practiceData.order = lastPractice ? lastPractice.order + 1 : 1;
    }

    const practice = this.practiceRepository.create({
      ...practiceData,
      workout: { id: workoutId },
      exercise: { id: exerciseId },
    });

    return {
      message: PracticeMessage.Found,
      data: await this.practiceRepository.save(practice),
    };
  }

  // TODO : add pagination
  async findAll(workoutId?: number) {
    const { user } = this.request;
    if (!user) throw new ForbiddenException('Authentication required');

    let query = this.practiceRepository
      .createQueryBuilder('practice')
      .leftJoinAndSelect('practice.workout', 'workout')
      .leftJoinAndSelect('practice.exercise', 'exercise')
      .leftJoinAndSelect('workout.user', 'user')
      .orderBy('practice.order', 'ASC');

    if (workoutId) {
      query = query.where('practice.workoutId = :workoutId', { workoutId });

      // Verify workout access
      const workout = await this.workoutRepository.findOne({
        where: { id: workoutId },
        relations: ['user'],
      });

      if (!workout) {
        throw new NotFoundException(`Workout with ID ${workoutId} not found`);
      }

      await this.checkWorkoutAccess(workout, user);
    } else {
      // Role-based filtering for all practices
      switch (user.role) {
        case Roles.CLIENT:
          query = query.where('user.id = :userId', { userId: user.id });
          break;
        case Roles.TRAINER:
          query = query.where('user.trainerId = :trainerId', {
            trainerId: user.id,
          });
          break;
        case Roles.ADMIN:
          // Admin can see all
          break;
        default:
          throw new ForbiddenException('Invalid user role');
      }
    }
    // TODO: Fix It
    return {
      message: PracticeMessage.Found,
      data: await query.getMany(),
    };
  }

  async findOne(id: number) {
    const { user } = this.request;
    if (!user) throw new ForbiddenException('Authentication required');

    const practice = await this.practiceRepository.findOne({
      where: { id },
      relations: ['workout', 'workout.user', 'exercise'],
    });

    if (!practice) {
      throw new NotFoundException(`Practice with ID ${id} not found`);
    }

    await this.checkWorkoutAccess(practice.workout, user);

    return {
      message: PracticeMessage.Found,
      data: practice,
    };
  }

  async update(
    id: number,
    updatePracticeDto: UpdatePracticeDto,
  ): Promise<PracticeEntity> {
    const { user } = this.request;
    if (!user) throw new ForbiddenException('Authentication required');

    const practice = await this.practiceRepository.findOne({
      where: { id },
      relations: ['workout', 'workout.user'],
    });

    if (!practice) {
      throw new NotFoundException(`Practice with ID ${id} not found`);
    }

    await this.checkWorkoutAccess(practice.workout, user);

    // If updating workout, verify new workout exists and user has access
    if (updatePracticeDto.workoutId) {
      const newWorkout = await this.workoutRepository.findOne({
        where: { id: updatePracticeDto.workoutId },
        relations: ['user'],
      });

      if (!newWorkout) {
        throw new NotFoundException(
          `Workout with ID ${updatePracticeDto.workoutId} not found`,
        );
      }

      await this.checkWorkoutAccess(newWorkout, user);
      practice.workout = newWorkout;
    }

    // If updating exercise, verify new exercise exists
    if (updatePracticeDto.exerciseId) {
      const exercise = await this.exerciseRepository.findOne({
        where: { id: updatePracticeDto.exerciseId },
      });

      if (!exercise) {
        throw new NotFoundException(
          `Exercise with ID ${updatePracticeDto.exerciseId} not found`,
        );
      }

      practice.exercise = exercise;
    }

    Object.assign(practice, updatePracticeDto);
    return await this.practiceRepository.save(practice);
  }

  async remove(id: number): Promise<{ message: string }> {
    const { user } = this.request;
    if (!user) throw new ForbiddenException('Authentication required');

    const practice = await this.practiceRepository.findOne({
      where: { id },
      relations: ['workout', 'workout.user'],
    });

    if (!practice) {
      throw new NotFoundException(`Practice with ID ${id} not found`);
    }

    await this.checkWorkoutAccess(practice.workout, user);

    await this.practiceRepository.remove(practice);

    return { message: `Practice with ID ${id} has been deleted successfully` };
  }

  async complete(
    id: number,
    completePracticeDto: CompletePracticeDto,
  ): Promise<PracticeEntity> {
    const { user } = this.request;
    if (!user) throw new ForbiddenException('Authentication required');

    const practice = await this.practiceRepository.findOne({
      where: { id },
      relations: ['workout', 'workout.user'],
    });

    if (!practice) {
      throw new NotFoundException(`Practice with ID ${id} not found`);
    }

    await this.checkWorkoutAccess(practice.workout, user);

    // Update practice with completion data
    Object.assign(practice, {
      ...completePracticeDto,
      status: PracticeStatus.COMPLETED,
      completed_at: new Date(),
    });

    // Set current performance as previous for next time
    practice.previous_weight = completePracticeDto.current_weight;
    practice.previous_reps = completePracticeDto.current_reps;
    practice.previous_time = completePracticeDto.current_time;
    practice.previous_rest = completePracticeDto.current_rest;

    return await this.practiceRepository.save(practice);
  }

  async bulkCreate(
    workoutId: number,
    exerciseIds: number[],
  ): Promise<PracticeEntity[]> {
    const { user } = this.request;
    if (!user) throw new ForbiddenException('Authentication required');

    // Verify workout exists and user has access
    const workout = await this.workoutRepository.findOne({
      where: { id: workoutId },
      relations: ['user'],
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${workoutId} not found`);
    }

    await this.checkWorkoutAccess(workout, user);

    // Verify all exercises exist
    const exercises = await this.exerciseRepository.find({
      where: { id: In(exerciseIds) },
    });

    if (exercises.length !== exerciseIds.length) {
      throw new NotFoundException('Some exercises not found');
    }

    // Get current max order
    const lastPractice = await this.practiceRepository.findOne({
      where: { workout: { id: workoutId } },
      order: { order: 'DESC' },
    });

    let currentOrder = lastPractice ? lastPractice.order + 1 : 1;

    const practices = exerciseIds.map((exerciseId) =>
      this.practiceRepository.create({
        workout: { id: workoutId },
        exercise: { id: exerciseId },
        order: currentOrder++,
        set_number: 1,
        set_type: SetType.WORKING,
        status: PracticeStatus.PLANNED,
      }),
    );

    return await this.practiceRepository.save(practices);
  }

  async findByWorkout(workoutId: number) {
    return this.findAll(workoutId);
  }

  private async checkWorkoutAccess(
    workout: WorkoutEntity,
    user: any,
  ): Promise<void> {
    switch (user.role) {
      case Roles.CLIENT:
        if (workout.user.id !== user.id) {
          throw new ForbiddenException(
            'You can only access practices in your own workouts',
          );
        }
        break;
      // case Roles.TRAINER:
      //   if (workout.user.trainerId !== user.id) {
      //     throw new ForbiddenException('You can only access practices of your clients');
      //   }
      //   break;
      case Roles.ADMIN:
        // Admin has access to everything
        break;
      default:
        throw new ForbiddenException('Invalid user role');
    }
  }
}
