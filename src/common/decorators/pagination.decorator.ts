import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function Pagination(page: number = 1, limit: number = 10) {
  return applyDecorators(
    ApiQuery({ name: 'page', type: Number, example: page, required: false }),
    ApiQuery({
      name: 'limit',
      type: Number,
      example: limit,
      required: false,
    }),
  );
}
