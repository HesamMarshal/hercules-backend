// src/modules/session/dto/create-session.dto.ts
import { IsOptional, IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({ description: 'Workout template ID (optional)' })
  @IsOptional()
  // @IsInt()
  workoutId?: number;
}
