import { EntityNames } from 'src/common/enum/entity-name.enum';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BodyPart } from '../enums/bodyPart.enum';
import { CategoryExercise } from '../enums/category.enum';
import { ExerciseType } from '../enums/exerciseType.enum';

@Entity(EntityNames.Exercise)
export class ExerciseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  //  TODO: remove nullable
  @Column({ nullable: true })
  slug: string;

  @Column({ type: 'enum', enum: CategoryExercise, nullable: true })
  category: string;

  @Column({ type: 'enum', enum: BodyPart, nullable: true })
  body_part: string;

  @Column({ type: 'enum', enum: ExerciseType, nullable: true })
  exercise_type: string;

  @Column({ nullable: true })
  video_link: string;

  @Column({ nullable: true })
  instruction: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  image_key: string;

  // Relations;
  //   @ManyToOne(() => PlanEntity, (plan) => plan.id, { onDelete: 'CASCADE' })
  //   @JoinColumn()
  //   plan: PlanEntity;

  //   @ManyToOne(() => UserEntity, (user) => user.id, {
  //     onDelete: 'SET NULL',
  //     nullable: true,
  //   })
  //   @JoinColumn({ name: 'created_by' })
  //   createdBy: UserEntity;
}
