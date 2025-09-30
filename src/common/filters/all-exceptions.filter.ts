// src/common/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorDetails: any = undefined;
    let name: string | undefined = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const excResp = exception.getResponse();
      // HttpException may return string or object
      if (typeof excResp === 'string') {
        message = excResp;
      } else if (typeof excResp === 'object' && excResp !== null) {
        // common pattern: { message, error, statusCode, ... }
        const asObj = excResp as any;
        message = asObj.message ?? asObj.error ?? message;
        errorDetails = asObj;
      }
      name = exception.name;
    } else if (exception instanceof Error) {
      message = exception.message;
      name = exception.name;
      // Keep stack for non-prod
    }

    // log server-side
    this.logger.error(
      `${message}`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );

    const payload: any = {
      success: false,
      message: message || 'Unexpected error',
      error: {
        statusCode: status,
        name: name,
        details: errorDetails,
      },
      timestamp: new Date().toISOString(),
      path: req.url,
    };

    if (process.env.NODE_ENV !== 'production' && exception instanceof Error) {
      payload.stack = exception.stack;
    }

    res.status(status).json(payload);
  }
}
