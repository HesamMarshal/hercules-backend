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
import { Roles } from 'src/common/enum/role.enum';
@Injectable()
export class WorkoutsService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(WorkoutEntity)
    private workoutsRepository: Repository<WorkoutEntity>,

    private readonly planService: PlanService,
  ) {}
  async create(createWorkoutDto: CreateWorkoutDto) {
    if (!this.request?.user) {
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }
    const { user } = this?.request;

    const { planId, name, order, day_of_week } = createWorkoutDto;

    // check if the plan with give plan id is availabel
    // check if the plan is belong to the current user?
    // get the plan by plan id

    // Verify plan exists
    const { data: plan } = await this.planService.findOne(+planId);
    if (!plan) {
      throw new NotFoundException(`Plan with ID ${planId} not found`);
    }

    // Verify user has access to the plan (user should own the plan or be admin/trainer)
    if (user.role === Roles.CLIENT && plan.user.id !== user.id) {
      throw new ForbiddenException(
        'You can only add workouts to your own plans',
      );
    }

    // create a new workout with date
    const workouts = await this.workoutsRepository.create({
      name,
      order,
      day_of_week,
      plan,
      createdBy: { id: user.id },
      // TODO" decide it should be there or delete
      // user: { id: user.id }, // Set the owner
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

    // console.log(planId);
    const { data: plan } = await this.planService.findOne(+planId);

    // const result = await this.workoutsRepository.find();
    // console.log(result);
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

  findOne(id: number) {
    return `This action returns a #${id} workout`;
  }

  update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    return `This action updates a #${id} workout`;
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }
}
