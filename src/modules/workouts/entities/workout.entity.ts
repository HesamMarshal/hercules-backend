import { EntityNames } from '../../../common/enum/entity-name.enum';
import { UserEntity } from '../../user/entities/user.entity';
import { PlanEntity } from '../../plan/entities/plan.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WeekDays } from '../enums/weekDays.enum';
import { PracticeEntity } from 'src/modules/practice/entities/practice.entity';
import { SessionEntity } from 'src/modules/session/entities/session.entity';

@Entity(EntityNames.Workout)
export class WorkoutEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  order: number;

  @Column({ type: 'enum', enum: WeekDays, nullable: true })
  day_of_week: string;

  // Relations;
  @ManyToOne(() => PlanEntity, (plan) => plan.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_id' })
  plan: PlanEntity;

  @ManyToOne(() => UserEntity, (user) => user.workouts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity; // The owner/client who this workout belongs to

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @OneToMany(() => PracticeEntity, (practice) => practice.id, {
    nullable: true,
  })
  @JoinColumn()
  practiceList: PracticeEntity[];

  @OneToMany(() => SessionEntity, (session) => session.workout)
  sessions: SessionEntity[];
}
