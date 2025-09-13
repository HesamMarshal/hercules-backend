import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  first_name: string;

  @ApiPropertyOptional({ nullable: true })
  last_name: string;

  @ApiPropertyOptional({ nullable: true })
  email: string;
}
