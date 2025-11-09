import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';

/**
 * Custom reusable Validation Pipe.
 * Applies recommended defaults for:
 *  ✅ Auto transformation
 *  ✅ Remove unknown fields
 *  ✅ Block unallowed props
 *  ✅ Better conversion between types
 */
@Injectable()
export class AppValidationPipe extends ValidationPipe implements PipeTransform {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const formatted = errors.map((err) => ({
          field: err.property,
          errors: Object.values(err.constraints),
        }));
        return new BadRequestException({
          message: 'Validation failed',
          errors: formatted,
        });
      },
    });
  }

  transform(value: any, metadata: ArgumentMetadata) {
    return super.transform(value, metadata);
  }
}
