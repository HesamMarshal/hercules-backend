import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  order: number;
}
