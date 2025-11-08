// src/modules/session/entities/session.entity.ts
import { EntityNames } from 'src/common/enum/entity-name.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WorkoutEntity } from 'src/modules/workouts/entities/workout.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SessionPracticeEntity } from './session-practice.entity';
import { SessionStatus } from '../enum/session-status.enum';

@Entity(EntityNames.Session)
export class SessionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  start_time: Date;

  @Column({ nullable: true })
  end_time: Date;

  @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.ACTIVE })
  status: SessionStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total_volume: number; // Calculated

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @OneToMany(
    () => SessionPracticeEntity,
    (sessionPractice) => sessionPractice.session,
  )
  sessionPractices: SessionPracticeEntity[];

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => WorkoutEntity, { nullable: true })
  @JoinColumn({ name: 'workout_id' })
  workout: WorkoutEntity; // Reference to the template
}
