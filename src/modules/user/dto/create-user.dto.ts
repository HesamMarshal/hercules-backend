import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional({ nullable: true })
  username: string;

  @ApiPropertyOptional({ nullable: true })
  first_name: string;

  @ApiPropertyOptional({ nullable: true })
  last_name: string;

  @ApiPropertyOptional({ nullable: true })
  email: string;

  @ApiPropertyOptional({ nullable: true })
  birth_date: Date;

  @ApiPropertyOptional({ nullable: true })
  score: number;
}
