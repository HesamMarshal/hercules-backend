// src/modules/session/dto/update-session.dto.ts
import { IsOptional, IsEnum, IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SessionStatus } from '../enum/session-status.enum';

export class UpdateSessionDto {
  @ApiProperty({ enum: SessionStatus, required: false })
  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  endTime?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
