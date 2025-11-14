// src/modules/session/sto/session-query.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SessionStatus } from '../enum/session-status.enum';

export class SessionQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: SessionStatus })
  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus;

  @ApiPropertyOptional({
    description: 'Filter from this start date (YYYY-MM-DD)',
    type: String,
    example: '2025-01-01',
  })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({
    description: 'Filter until this date (YYYY-MM-DD)',
    type: String,
    example: '2025-01-31',
  })
  @IsOptional()
  @IsDateString()
  toDate?: string;
}
