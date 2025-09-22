import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WeekDays } from '../enums/weekDays.enum';
import { IsEnum } from 'class-validator';

export class CreateWorkoutDto {
  @ApiProperty()
  planId: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  order: number;

  @ApiPropertyOptional({ nullable: true })
  @IsEnum(WeekDays)
  day_of_week: string;
}
