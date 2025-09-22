import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CategoryExercise } from '../enums/category.enum';
import { BodyPart } from '../enums/bodyPart.enum';
import { ExerciseType } from '../enums/exerciseType.enum';

export class CreateExerciseDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  slug: string;

  @ApiPropertyOptional({ nullable: true })
  @IsEnum(CategoryExercise)
  category: string;

  @ApiPropertyOptional({ nullable: true })
  @IsEnum(BodyPart)
  body_part: string;

  @ApiPropertyOptional({ nullable: true })
  @IsEnum(ExerciseType)
  exercise_type: string;

  @ApiPropertyOptional({ nullable: true })
  video_link: string;

  @ApiPropertyOptional({ nullable: true })
  instruction: string;

  @ApiPropertyOptional({ nullable: true })
  image: string;

  @ApiPropertyOptional({ nullable: true })
  image_key: string;
}
