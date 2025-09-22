import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { AuthMessage, PlanMessage } from '../../common/messages/message.enum';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { paginationSolver } from '../../common/utility/pagination.util';

@Injectable()
export class PlanService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly userService: UserService,

    @InjectRepository(PlanEntity)
    private planRepository: Repository<PlanEntity>,
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    const user = await this.userService.findMyProfile();
    let { name, order, start_date, end_date } = createPlanDto;

    if (!order) order = 0;
    if (!start_date) start_date = new Date();
    if (!end_date) {
      end_date = new Date();
      end_date.setDate(start_date.getDate() + 30);
    }

    const plan = await this.planRepository.create({
      user,
      name,
      order,
      start_date,
      end_date,
    });
    await this.planRepository.save(plan);

    return {
      message: PlanMessage.Created,
    };
  }

  async findAll(paginationDto: PaginationDto) {
    if (!this.request?.user) {
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }

    const { user } = this?.request;

    const { id } = user;
    const { limit, page, skip } = paginationSolver(paginationDto);

    const [plans, total] = await this.planRepository.findAndCount({
      relations: {
        user: true, // This loads the user relation
      },
      where: {
        user: {
          id: id, //  filter by relation field
        },
      },
      select: {
        user: {
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

    //TODO: map plans to remove some data
    return {
      data: plans,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async findOne(id: number) {
    if (!this.request?.user) {
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }

    const { user } = this?.request;

    const { id: userId } = user;

    const plan = await this.planRepository.findOne({
      relations: {
        user: true, // This loads the user relation
      },
      where: {
        user: {
          id: userId, //  filter by relation field
        },
        id: id,
      },
      select: {
        user: {
          id: true,
        },
      },
      order: {
        order: 'DESC',
        id: 'DESC',
      },
    });
    if (!plan) throw new NotFoundException(PlanMessage.NotFound);

    return {
      data: plan,
    };
  }

  async update(id: number, updatePlanDto: UpdatePlanDto) {
    const { data: plan } = await this.findOne(id);
    const { name, order, start_date, end_date } = updatePlanDto;

    if (name) plan.name = name;
    if (order) plan.order = order;
    if (start_date) plan.start_date = new Date(start_date);
    if (end_date) plan.end_date = new Date(end_date);

    await this.planRepository.save(plan);
    return { message: PlanMessage.Updated };
  }

  async remove(id: number) {
    const { data: plan } = await this.findOne(id);

    await this.planRepository.remove(plan);
    return { message: PlanMessage.Deleted };
  }
}
