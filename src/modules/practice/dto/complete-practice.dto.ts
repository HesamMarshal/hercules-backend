// src/modules/practice/dto/complete-practice.dto.ts
import { IsNumber, IsInt, IsOptional, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SetType } from '../enums/setType.enum';

export class CompletePracticeDto {
  @ApiProperty({ description: 'Weight used in kg or lbs' })
  @IsNumber()
  current_weight: number;

  @ApiProperty({ description: 'Number of repetitions completed' })
  @IsInt()
  current_reps: number;

  @ApiProperty({ description: 'Time taken in seconds', required: false })
  @IsInt()
  @IsOptional()
  current_time?: number;

  @ApiProperty({ description: 'Rest time in seconds', required: false })
  @IsInt()
  @IsOptional()
  current_rest?: number;

  @ApiProperty({ enum: SetType, required: false })
  @IsEnum(SetType)
  @IsOptional()
  set_type?: SetType;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
