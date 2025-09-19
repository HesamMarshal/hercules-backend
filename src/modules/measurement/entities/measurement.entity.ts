import { EntityNames } from 'src/common/enum/entity-name.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TakeTypes } from '../enums/takeType.enum';

@Entity(EntityNames.Measurement)
export class MeasurementEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  body_fat_percentage: number;

  @Column({ nullable: true })
  neck: number;

  @Column({ nullable: true })
  shoulders: number;

  @Column({ nullable: true })
  chest: number;

  @Column({ nullable: true })
  left_bicep: number;

  @Column({ nullable: true })
  right_bicep: number;

  @Column({ nullable: true })
  left_forearm: number;

  @Column({ nullable: true })
  right_forearm: number;

  @Column({ nullable: true })
  upper_abs: number;

  @Column({ nullable: true })
  waist: number;

  @Column({ nullable: true })
  lower_abs: number;

  @Column({ nullable: true })
  hips: number;

  @Column({ nullable: true })
  left_thigh: number;

  @Column({ nullable: true })
  right_thigh: number;

  @Column({ nullable: true })
  left_calf: number;

  @Column({ nullable: true })
  right_calf: number;

  @Column({ type: 'enum', enum: TakeTypes, default: 'take' })
  type_f_take: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.measureList, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
