import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { AuthMessage, PlanMessage } from 'src/common/messages/message.enum';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginationSolver } from 'src/common/utility/pagination.util';

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
    const { name, order } = createPlanDto;

    const plan = await this.planRepository.create({
      user,
      name,
      order,
    });
    await this.planRepository.save(plan);

    return {
      message: PlanMessage.Created,
    };
  }

  async findAll(paginationDto: PaginationDto) {
    const { user } = this?.request;
    if (!user) throw new UnauthorizedException(AuthMessage.LoginAgain);
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
    const { user } = this?.request;
    if (!user) throw new UnauthorizedException(AuthMessage.LoginAgain);
    const { id: userId } = user;

    const [plans, total] = await this.planRepository.findAndCount({
      relations: {
        user: true, // This loads the user relation
      },
      where: {
        user: {
          id: userId, //  filter by relation field
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
    });
    const plan = plans.filter((item) => item.id === id);

    return {
      data: plan,
    };
  }

  async update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  async remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
