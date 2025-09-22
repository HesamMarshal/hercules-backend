import { EntityNames } from 'src/common/enum/entity-name.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WeekDays } from '../enums/weekDays.enum';
import { PlanEntity } from 'src/modules/plan/entities/plan.entity';

@Entity(EntityNames.Workout)
export class WorkoutEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  order: number;

  @Column({ type: 'enum', enum: WeekDays, nullable: true })
  day_of_week: string;

  Relations;
  @ManyToOne(() => PlanEntity, (plan) => plan.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  plan: PlanEntity;
}
