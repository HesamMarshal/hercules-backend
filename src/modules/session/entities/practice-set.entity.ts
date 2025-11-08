// src/modules/session/entities/practice-set.entity.ts
import { EntityNames } from 'src/common/enum/entity-name.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WorkoutEntity } from 'src/modules/workouts/entities/workout.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SessionPracticeEntity } from './session-practice.entity';

@Entity(EntityNames.PracticeSet)
export class PracticeSetEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    () => SessionPracticeEntity,
    (sessionPractice) => sessionPractice.sets,
  )
  @JoinColumn({ name: 'session_practice_id' })
  sessionPractice: SessionPracticeEntity;

  @Column({ type: 'int' })
  set_number: number;

  // Weight-based exercises
  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  weight: number;

  @Column({ type: 'int', nullable: true })
  reps: number;

  // Time-based exercises
  @Column({ type: 'int', nullable: true })
  duration_seconds: number;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

  @Column({ type: 'int', nullable: true })
  rest_taken_seconds: number;

  // Intensity metrics
  @Column({ type: 'int', nullable: true })
  rpe: number; // Rate of Perceived Exertion (1-10)

  // Calculated fields
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  volume: number; // weight * reps
}
