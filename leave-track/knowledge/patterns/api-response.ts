import type { ApiError, ApiResponse } from '@/types';

export function createSuccessResponse<T>(data: T): Response {
  return Response.json({ success: true, data } as ApiResponse<T>);
}

export function createErrorResponse(code: string, message: string): Response {
  const statusCode = getStatusCode(code);
  const error: ApiError = {
    success: false,
    error: { code, message },
  };
  return Response.json(error, { status: statusCode });
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
