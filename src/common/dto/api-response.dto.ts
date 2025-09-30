// src/common/dto/api-response.dto.ts
export class ApiResponseDto<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: Record<string, any>;
}
