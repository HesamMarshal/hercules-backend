import { EntityNames } from '../../../common/enum/entity-name.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MeasurementEntity } from '../../measurement/entities/measurement.entity';
import { OTPEntity } from './otp.entity';
import { Roles } from '../../../common/enum/role.enum';
import { WorkoutEntity } from '../../../modules/workouts/entities/workout.entity';
import { PlanEntity } from 'src/modules/plan/entities/plan.entity';

@Entity(EntityNames.User)
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  // TODO: It should be only unique true
  @Column({ unique: true, nullable: true })
  mobile: string;
  @Column({ nullable: true, default: false })
  mobile_verify: boolean;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  invite_code: string;

  @Column({ nullable: true })
  agentId: number;

  @Column({ nullable: true })
  birth_date: Date;

  @Column({ type: 'enum', enum: Roles })
  role: string;

  @Column({ default: 0 })
  score: number; // each action in the app give score

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @OneToMany(() => MeasurementEntity, (measure) => measure.user)
  measureList: MeasurementEntity[];

  @Column({ nullable: true })
  otpId: number;

  @OneToOne(() => OTPEntity, (otp) => otp.user)
  @JoinColumn()
  otp: OTPEntity;

  @OneToMany(() => WorkoutEntity, (workout) => workout.createdBy)
  createdWorkouts: WorkoutEntity[];

  @OneToMany(() => WorkoutEntity, (workout) => workout.user)
  workouts: WorkoutEntity[];

  @OneToMany(() => PlanEntity, (plan) => plan.user)
  plans: PlanEntity[];
}
