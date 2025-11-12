// src/modules/session/entities/session-practice.entity.ts
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
import { SessionEntity } from './session.entity';
import { PracticeEntity } from 'src/modules/practice/entities/practice.entity';
import { PracticeSetEntity } from './practice-set.entity';
import { ExerciseEntity } from 'src/modules/exercise/entities/exercise.entity';

@Entity(EntityNames.SessionPractice)
export class SessionPracticeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => SessionEntity, (session) => session.sessionPractices)
  @JoinColumn({ name: 'session_id' })
  session: SessionEntity;

  @ManyToOne(() => PracticeEntity, (practice) => practice.sessionPractices)
  @JoinColumn({ name: 'practice_id' })
  practice: PracticeEntity; // Reference to the template practice

  @ManyToOne(() => ExerciseEntity)
  @JoinColumn({ name: 'exercise_id' })
  exercise: ExerciseEntity; // Direct reference for performance

  @Column({ type: 'int' })
  order_index: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Weight-based exercises
  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  weight: number;

  @Column({ type: 'int', nullable: true })
  reps: number;

  // Time-based exercises
  @Column({ type: 'int', nullable: true })
  duration_seconds: number;

  @Column({ type: 'int', nullable: true, default: 60 })
  rest_duration: number; // in seconds

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

  // Performance summary (calculated from sets)
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total_volume: number;

  @Column({ type: 'int', nullable: true })
  best_set_weight: number;

  @OneToMany(
    () => PracticeSetEntity,
    (practiceSet) => practiceSet.sessionPractice,
  )
  sets: PracticeSetEntity[];
}
