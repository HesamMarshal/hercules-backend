// src/modules/practice/entities/practice.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { WorkoutEntity } from '../../workouts/entities/workout.entity';
import { ExerciseEntity } from '../../exercise/entities/exercise.entity';
import { EntityNames } from '../../../common/enum/entity-name.enum';
import { SetType } from '../enums/setType.enum';
import { PracticeStatus } from '../enums/practiceStatus.enum';
import { SessionPracticeEntity } from 'src/modules/session/entities/session-practice.entity';

@Entity(EntityNames.Practice)
export class PracticeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Order and Set Information
  @Column({ type: 'int', default: 1 })
  order: number; // Order within the workout

  @Column({ type: 'int', default: 1 })
  sets: number; // Set number (1st set, 2nd set, etc.)

  @Column({ type: 'int', default: 10 })
  reps: number; // Target repetitions

  @Column({ type: 'int', default: 3 })
  target_sets: number; // Renamed from 'sets'

  @Column({ type: 'int', default: 10 })
  target_reps: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  target_weight: number;

  @Column({ type: 'int', nullable: true })
  target_duration: number; // For time-based

  @Column({ type: 'int', nullable: true })
  target_rest: number; // in seconds

  @Column({ type: 'enum', enum: SetType, default: SetType.WORKING })
  set_type: SetType;

  @Column({ type: 'text', nullable: true })
  notes: string; // User/trainer notes

  // Timestamps
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  //   Relations
  @ManyToOne(() => WorkoutEntity, (workout) => workout.practiceList, {
    // onDelete: 'CASCADE',
    // nullable: false,
  })
  @JoinColumn({ name: 'workout_id' })
  workout: WorkoutEntity;

  @ManyToOne(() => ExerciseEntity)
  @JoinColumn({ name: 'exercise_id' })
  exercise: ExerciseEntity;

  @OneToMany(
    () => SessionPracticeEntity,
    (sessionPractice) => sessionPractice.practice,
  )
  sessionPractices: SessionPracticeEntity[];
}
