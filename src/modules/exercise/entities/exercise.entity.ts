import { EntityNames } from '../../../common/enum/entity-name.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MuscleGroup } from '../enums/muscleGroup.enum';
import { PracticeEntity } from 'src/modules/practice/entities/practice.entity';
import { DifficultyLevel } from '../enums/difficulty.enum';
import { EquipmentType } from '../enums/equipment.enum';
import { MetricType } from '../enums/metric.enum';

@Entity(EntityNames.Exercise)
export class ExerciseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name_en: string;

  @Column({ nullable: true })
  name_fa: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  instruction_en: string;

  @Column({ nullable: true })
  instruction_fa: string;

  @Column({ type: 'enum', enum: EquipmentType, nullable: true })
  equipment: EquipmentType; // e.g. Dumbbell, Barbell, Machine, Bodyweight

  @Column({ type: 'enum', enum: MuscleGroup, nullable: true })
  muscle_group: MuscleGroup; // e.g. Chest, Back, Legs, Biceps, Core

  @Column({ type: 'enum', enum: MetricType, nullable: true })
  metric_type: MetricType;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
    default: DifficultyLevel.BEGINNER,
  })
  difficulty: DifficultyLevel; // e.g. Beginner, Intermediate, Advanced

  @Column({ nullable: true })
  video_link: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  image_key: string;

  // TODO: I think we can remove this
  @OneToMany(() => PracticeEntity, (practice) => practice.exercise)
  practices: PracticeEntity[];
}
