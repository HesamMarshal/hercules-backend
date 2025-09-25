// src/modules/practice/entities/practice.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkoutEntity } from '../../workouts/entities/workout.entity';
import { ExerciseEntity } from '../../exercise/entities/exercise.entity';
import { EntityNames } from '../../../common/enum/entity-name.enum';
import { SetType } from '../enums/setType.enum';
import { PracticeStatus } from '../enums/practiceStatus.enum';

@Entity(EntityNames.Practice)
export class PracticeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Order and Set Information
  @Column({ type: 'int', default: 1 })
  order: number; // Order within the workout

  @Column({ type: 'int', default: 1 })
  set_number: number; // Set number (1st set, 2nd set, etc.)

  // Previous Performance (for progressive overload)
  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  previous_weight: number; // kg or lbs

  @Column({ type: 'int', nullable: true })
  previous_reps: number;

  @Column({ type: 'int', nullable: true })
  previous_time: number; // seconds

  @Column({ type: 'int', nullable: true })
  previous_rest: number; // seconds

  // Current Performance (filled when completed)
  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  current_weight: number;

  @Column({ type: 'int', nullable: true })
  current_reps: number;

  @Column({ type: 'int', nullable: true })
  current_time: number;

  @Column({ type: 'int', nullable: true })
  current_rest: number;

  @Column({ type: 'enum', enum: SetType, default: SetType.WORKING })
  set_type: SetType;

  @Column({
    type: 'enum',
    enum: PracticeStatus,
    default: PracticeStatus.PLANNED,
  })
  status: PracticeStatus;

  @Column({ type: 'text', nullable: true })
  notes: string; // User/trainer notes

  // Timestamps
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date; // When the set was actually completed

  //   Relations
  @ManyToOne(() => WorkoutEntity, (workout) => workout.practiceList, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'workout_id' })
  workout: WorkoutEntity;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'exercise_id' })
  exercise: ExerciseEntity;

  // Current Set Targets
  // @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  // target_weight: number;

  // @Column({ type: 'int', nullable: true })
  // target_reps: number;

  // @Column({ type: 'int', nullable: true })
  // target_time: number; // For timed exercises (planks, cardio)

  // @Column({ type: 'int', nullable: true })
  // target_rest: number; // Rest time between sets

  // RPE (Rate of Perceived Exertion) - Useful for tracking intensity
  //   @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  //   rpe: number; // Scale 1-10

  //   // Additional Metrics
  //   @Column({ type: 'int', nullable: true })
  //   distance: number; // meters - for cardio exercises

  //   @Column({ type: 'int', nullable: true })
  //   calories: number; // estimated calories burned
}
