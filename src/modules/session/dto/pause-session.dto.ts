import { IsOptional, IsString } from 'class-validator';

export class PauseSessionDto {
  @IsOptional()
  @IsString()
  reason?: string; // optional field to store why paused
}
