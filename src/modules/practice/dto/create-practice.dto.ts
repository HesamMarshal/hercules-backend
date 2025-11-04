// src/modules/practice/dto/create-practice.dto.ts
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PracticeStatus } from '../enums/practiceStatus.enum';
import { SetType } from '../enums/setType.enum';

export class CreatePracticeDto {
  @ApiProperty({ description: 'Workout ID that this practice belongs to' })
  // @IsInt()
  // @Min(1)
  workoutId: number;

  @ApiProperty({ description: 'Exercise ID for this practice' })
  // @IsInt()
  // @Min(1)
  exerciseId: number;

  @ApiProperty({ description: 'Order within the workout', default: 1 })
  // @IsInt()
  // @Min(1)
  @IsOptional()
  order?: number;

  @ApiProperty({ description: 'Set number', default: 1 })
  // @IsInt()
  // @Min(1)
  @IsOptional()
  sets?: number;

  @ApiProperty({ description: 'Reps', default: 10 })
  // @IsInt()
  // @Min(1)
  @IsOptional()
  reps?: number;

  @ApiProperty({ enum: SetType, default: SetType.WORKING })
  // @IsEnum(SetType)
  // @IsOptional()
  set_type?: SetType;

  @ApiProperty({ enum: PracticeStatus, default: PracticeStatus.PLANNED })
  // @IsEnum(PracticeStatus)
  // @IsOptional()
  status?: PracticeStatus;

  @ApiProperty({ required: false })
  // @IsNumber()
  // @IsOptional()
  previous_weight?: number;

  @ApiProperty({ required: false })
  // @IsInt()
  // @IsOptional()
  previous_reps?: number;

  @ApiProperty({ required: false })
  // @IsInt()
  // @IsOptional()
  previous_time?: number;

  @ApiProperty({ required: false })
  // @IsInt()
  // @IsOptional()
  previous_rest?: number;

  @ApiProperty({ required: false })
  // @IsString()
  // @IsOptional()
  notes?: string;
}
