import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { CategoryExercise } from '../enums/category.enum';
import { EquipmentType } from '../enums/equipment.enum';
import { MuscleGroup } from '../enums/muscleGroup.enum';
import { MetricType } from '../enums/metric.enum';
import { DifficultyLevel } from '../enums/difficulty.enum';

export class CreateExerciseDto {
  @ApiProperty({ example: 'Ab Wheel' })
  @IsString()
  name_en: string;

  @ApiPropertyOptional({ example: 'چرخ شکم' })
  @IsOptional()
  @IsString()
  name_fa?: string;

  @ApiProperty({ example: 'ab-wheel' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({
    example: 'Hold the ab wheel with both hands and kneel on the floor...',
  })
  @IsOptional()
  @IsString()
  instruction_en?: string;

  @ApiPropertyOptional({
    example: 'چرخ شکم را با هر دو دست گرفته و روی زانوها قرار بگیرید...',
  })
  @IsOptional()
  @IsString()
  instruction_fa?: string;

  @ApiPropertyOptional({
    enum: EquipmentType,
    example: EquipmentType.BODYWEIGHT,
  })
  @IsOptional()
  @IsEnum(EquipmentType)
  equipment?: EquipmentType;

  @ApiPropertyOptional({
    enum: MuscleGroup,
    example: MuscleGroup.CORE,
  })
  @IsOptional()
  @IsEnum(MuscleGroup)
  muscle_group?: MuscleGroup;

  @ApiPropertyOptional({
    enum: MetricType,
    example: MetricType.REPS,
  })
  @IsOptional()
  @IsEnum(MetricType)
  metric_type?: MetricType;

  @ApiPropertyOptional({
    enum: DifficultyLevel,
    example: DifficultyLevel.INTERMEDIATE,
  })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @ApiPropertyOptional({
    example: 'https://www.youtube.com/watch?v=example',
  })
  @IsOptional()
  @IsUrl()
  video_link?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Exercise image file upload',
  })
  @IsOptional()
  image?: string;
}
