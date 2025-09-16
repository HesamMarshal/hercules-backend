import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanEntity } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { PlanMessage } from 'src/common/messages/message.enum';

@Injectable()
export class PlanService {
  constructor(
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

  async findAll() {
    return `This action returns all plan`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  async remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
