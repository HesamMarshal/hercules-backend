// src/modules/session/dto/record-set.dto.ts
import {
  IsInt,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RecordSetDto {
  @ApiProperty({ description: 'Set number (1, 2, 3, ...)' })
  @IsInt()
  @Min(1)
  setNumber: number;

  @ApiProperty({ required: false, description: 'Weight in kg' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @ApiProperty({ required: false, description: 'Number of repetitions' })
  @IsOptional()
  @IsInt()
  @Min(0)
  reps?: number;

  @ApiProperty({
    required: false,
    description: 'Duration in seconds for time-based exercises',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  durationSeconds?: number;

  @ApiProperty({
    required: false,
    description: 'Rest taken after set in seconds',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  restTakenSeconds?: number;

  @ApiProperty({
    required: false,
    description: 'Rate of Perceived Exertion (1-10)',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  rpe?: number;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
