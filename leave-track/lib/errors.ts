import type { ApiError } from '@/types';

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(code: string, message: string, statusCode: number = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

export function createErrorResponse(code: string, message: string): Response {
  const statusCode = getStatusCode(code);
  const error: ApiError = {
    success: false,
    error: { code, message },
  };
  return Response.json(error, { status: statusCode });
}

export function createSuccessResponse<T>(data: T): Response {
  return Response.json({ success: true, data });
}

function getStatusCode(code: string): number {
  const statusMap: Record<string, number> = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
    DATABASE_ERROR: 500,
  };
  return statusMap[code] || 500;
}

export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
} as const;
