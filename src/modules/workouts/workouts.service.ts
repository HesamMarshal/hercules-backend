import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutEntity } from './entities/workout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanService } from '../plan/plan.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AuthMessage } from '../../common/messages/message.enum';
import { WorkoutMessage } from './messages/message.enum';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { paginationSolver } from '../../common/utility/pagination.util';
import { Roles } from '../../common/enum/role.enum';
import { PlanEntity } from '../plan/entities/plan.entity';
@Injectable()
export class WorkoutsService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(WorkoutEntity)
    private workoutsRepository: Repository<WorkoutEntity>,

    private readonly planService: PlanService,

    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
  ) {}
  async create(createWorkoutDto: CreateWorkoutDto) {
    if (!this.request?.user) {
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }

    const { user } = this?.request;

    const { planId, name, order, day_of_week } = createWorkoutDto;

    // Verify plan exists
    const { data: plan } = await this.planService.findOne(+planId);
    if (!plan) {
      throw new NotFoundException(`Plan with ID ${planId} not found`);
    }

    // Verify user has access to the plan (user should own the plan or be admin/trainer)
    await this.checkPlanAccess(plan, user);

    // create a new workout with date
    const workouts = await this.workoutsRepository.create({
      name,
      order,
      day_of_week,
      plan: { id: planId },
      user: { id: user.id }, // Set the owner
      createdBy: { id: user.id },
    });

    await this.workoutsRepository.save(workouts);

    return { message: WorkoutMessage.Created };
  }

  async findAllByPlanId(planId: number, paginationDto: PaginationDto) {
    if (!this.request?.user) {
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }
    const { user } = this?.request;

    const { id } = user;
    const { limit, page, skip } = paginationSolver(paginationDto);

    const { data: plan } = await this.planService.findOne(+planId);
    if (!plan) {
      throw new NotFoundException(`Plan with ID ${planId} not found`);
    }
    await this.checkPlanAccess(plan, user);

    const [workouts, total] = await this.workoutsRepository.findAndCount({
      relations: {
        plan: true, // This loads the plan relation
      },
      where: {
        plan: {
          id: planId, //  filter by relation field
        },
      },
      select: {
        plan: {
          id: true,
        },
      },
      order: {
        order: 'DESC',
        id: 'DESC',
      },
      skip, //: (page - 1) * limit,
      take: limit,
    });

    //TODO: map workouts to remove some data
    return {
      data: workouts,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<WorkoutEntity> {
    if (!this.request?.user) {
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }
    const { user } = this?.request;

    const workout = await this.workoutsRepository.findOne({
      where: { id },
      relations: ['plan', 'user', 'plan.user'],
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    // TODO:  Role-based access control
    await this.checkWorkoutAccess(workout, user);
    return workout;
  }

  async update(
    id: number,
    updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<WorkoutEntity> {
    if (!this.request?.user) {
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }
    const { user } = this?.request;

    const workout = await this.workoutsRepository.findOne({
      where: { id },
      relations: ['plan', 'user'],
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    // Check access permissions
    await this.checkWorkoutAccess(workout, user);

    // Update workout fields
    Object.assign(workout, updateWorkoutDto);

    // If planId is provided in update, verify the new plan exists
    if (updateWorkoutDto.planId) {
      const newPlan = await this.planRepository.findOne({
        where: { id: updateWorkoutDto.planId },
      });
      if (!newPlan) {
        throw new NotFoundException(
          `Plan with ID ${updateWorkoutDto.planId} not found`,
        );
      }
      // Check access to the new plan
      await this.checkPlanAccess(newPlan, user);
      workout.plan = newPlan;
      workout.user = newPlan.user; // Update user to match new plan's user
    }

    return await this.workoutsRepository.save(workout);
  }

  async remove(id: number) {
    if (!this.request?.user) {
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }
    const { user } = this?.request;

    const workout = await this.workoutsRepository.findOne({
      where: { id },
      relations: ['plan', 'user'],
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    // Check access permissions
    await this.checkWorkoutAccess(workout, user);

    await this.workoutsRepository.remove(workout);

    return { message: `Workout with ID ${id} has been deleted successfully` };
  }

  // Helper methods

  private async checkWorkoutAccess(
    workout: WorkoutEntity,
    user: any,
  ): Promise<void> {
    switch (user.role) {
      case Roles.CLIENT:
        if (workout.user.id !== user.id) {
          throw new ForbiddenException('You can only access your own workouts');
        }
        break;
      // case Roles.TRAINER:
      //   if (workout.user.trainerId !== user.id) {
      //     throw new ForbiddenException(
      //       'You can only access workouts of your clients',
      //     );
      //   }
      //   break;
      case Roles.ADMIN:
        // Admin has access to everything
        break;
      default:
        throw new ForbiddenException('Invalid user role');
    }
  }

  private async checkPlanAccess(plan: PlanEntity, user: any): Promise<void> {
    switch (user.role) {
      case Roles.CLIENT:
        if (plan.user.id !== user.id) {
          throw new ForbiddenException('You can only access your own plans');
        }
        break;
      // TODO: Good idea to implement
      // case Roles.TRAINER:
      //   if (plan.user.trainerId !== user.id) {
      //     throw new ForbiddenException(
      //       'You can only access plans of your clients',
      //     );
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
