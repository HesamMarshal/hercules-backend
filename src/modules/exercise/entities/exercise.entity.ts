import { EntityNames } from '../../../common/enum/entity-name.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BodyPart } from '../enums/bodyPart.enum';
import { CategoryExercise } from '../enums/category.enum';
import { ExerciseType } from '../enums/exerciseType.enum';
import { PracticeEntity } from 'src/modules/practice/entities/practice.entity';

@Entity(EntityNames.Exercise)
export class ExerciseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  //  TODO: remove nullable
  @Column()
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

  // TODO: I think we can remove this
  @OneToMany(() => PracticeEntity, (practice) => practice.exercise)
  practices: PracticeEntity[];
}
