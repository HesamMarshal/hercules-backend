// src/common/dto/api-error.dto.ts
export class ApiErrorDto {
  success: false;
  message: string;
  error: {
    statusCode: number;
    name?: string;
    details?: any;
  };
  timestamp: string;
  path?: string;
  stack?: string;
}
