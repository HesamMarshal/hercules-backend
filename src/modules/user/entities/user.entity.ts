import { EntityNames } from 'src/common/enum/entity-name.enum';
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
import { MeasurementEntity } from './measurement.entity';
import { OTPEntity } from './otp.entity';

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

  @Column({ unique: true })
  mobile: string;
  @Column({ nullable: true, default: false })
  mobile_verify: boolean;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  invite_code: string;

  @Column({ nullable: true })
  agentId: number;

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
}
