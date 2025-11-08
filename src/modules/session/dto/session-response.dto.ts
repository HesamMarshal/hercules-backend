// src/modules/session/dto/session-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { SessionStatus } from '../enum/session-status.enum';

export class SessionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty({ required: false })
  workoutId?: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty({ required: false })
  endTime?: Date;

  @ApiProperty({ enum: SessionStatus })
  status: SessionStatus;

  @ApiProperty({ required: false })
  notes?: string;

  @ApiProperty({ required: false })
  totalVolume?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
