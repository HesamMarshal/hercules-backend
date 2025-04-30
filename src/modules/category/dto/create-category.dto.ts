import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ nullable: true })
  slug: string;

  @ApiProperty({ format: 'binary' })
  image: string;
}
