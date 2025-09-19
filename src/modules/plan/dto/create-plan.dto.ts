import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  order: number;

  @ApiPropertyOptional({ nullable: true })
  start_date: Date;

  @ApiPropertyOptional({ nullable: true })
  end_date: Date;
}
