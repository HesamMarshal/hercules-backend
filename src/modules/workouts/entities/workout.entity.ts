import { EntityNames } from '../../../common/enum/entity-name.enum';
import { UserEntity } from '../../user/entities/user.entity';
import { PlanEntity } from '../../plan/entities/plan.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WeekDays } from '../enums/weekDays.enum';

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

  // Relations;
  @ManyToOne(() => PlanEntity, (plan) => plan.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  plan: PlanEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;
}
