import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WeekDays } from '../enums/weekDays.enum';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// TODO: Use Message enum
export class CreateWorkoutDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Plan ID is required' })
  @Type(() => Number)
  @IsInt({ message: 'Plan ID must be an integer' })
  planId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Workout name is required' })
  @IsString({ message: 'Workout name must be a string' })
  @MaxLength(100, {
    message: 'Workout name must be shorter than or equal to 100 characters',
  })
  name: string;

  @ApiPropertyOptional({ nullable: true })
  @Type(() => Number)
  @IsInt({ message: 'Order must be an integer' })
  @Min(1, { message: 'Order must be at least 1' })
  order: number;

  @ApiPropertyOptional({ nullable: true })
  @IsEnum(WeekDays, { message: 'Day of week must be a valid day' })
  day_of_week: string;
}
