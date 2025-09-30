// src/common/interceptors/response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stream } from 'stream';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<any>();

    return next.handle().pipe(
      map((data) => {
        // If response headers already sent (file/stream/redirect) => pass through
        if (response && response.headersSent) return data;

        // If controller already returned a canonical response (has success property) => pass through
        if (
          data &&
          typeof data === 'object' &&
          Object.prototype.hasOwnProperty.call(data, 'success')
        ) {
          return data;
        }

        // Handle "already shaped" controllers that return { data, meta, message }
        if (
          data &&
          typeof data === 'object' &&
          (Object.prototype.hasOwnProperty.call(data, 'data') ||
            Object.prototype.hasOwnProperty.call(data, 'meta') ||
            Object.prototype.hasOwnProperty.call(data, 'message'))
        ) {
          return {
            success: true,
            ...data,
          };
        }

        // Don't wrap binary/streams
        if (Buffer.isBuffer(data) || data instanceof Stream) {
          return data;
        }

        // Respect 204 No Content (no body)
        const statusCode = response?.statusCode ?? HttpStatus.OK;
        if (statusCode === HttpStatus.NO_CONTENT) {
          return data;
        }

        // Auth/token special-case: if controller returned (accessToken, refreshToken, message)
        if (
          data &&
          typeof data === 'object' &&
          (Object.prototype.hasOwnProperty.call(data, 'accessToken') ||
            Object.prototype.hasOwnProperty.call(data, 'refreshToken'))
        ) {
          const { accessToken, refreshToken, message, ...rest } = data;
          const result: any = {
            success: true,
            data: {
              accessToken,
              refreshToken,
              ...rest,
            },
          };
          if (message) result.message = message;
          return result;
        }

        // Default case: wrap raw payload into "data"
        return {
          success: true,
          data: data === undefined ? null : data,
        };
      }),
    );
  }
}
