import { prisma } from '@/lib/prisma';
import { getMockSession } from '@/lib/auth';
import {
  createErrorResponse,
  createSuccessResponse,
  ERROR_CODES,
} from '@/lib/errors';
import { calculateDaysBetween } from '@/lib/utils';
import { logger } from '@/lib/logger';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const scope = url.searchParams.get('scope');

    if (scope === 'mine') {
      const session = await getMockSession();
      if (!session) {
        return createErrorResponse(ERROR_CODES.UNAUTHORIZED, 'Authentication required');
      }

      const user = await resolveUser(session);
      if (!user) {
        return createErrorResponse(ERROR_CODES.INTERNAL_ERROR, 'User not found');
      }

      const requests = await prisma.leaveRequest.findMany({
        where: { userId: user.id, isDeleted: false },
        include: { leaveType: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
      });

      return createSuccessResponse(requests);
    }

    if (scope === 'team') {
      const session = await getMockSession();
      if (!session) {
        return createErrorResponse(ERROR_CODES.UNAUTHORIZED, 'Authentication required');
      }

      if (session.role !== 'manager' && session.role !== 'hr_admin') {
        return createErrorResponse(ERROR_CODES.FORBIDDEN, 'Only managers can view team requests');
      }

      const user = await resolveUser(session);
      if (!user) {
        return createErrorResponse(ERROR_CODES.INTERNAL_ERROR, 'User not found');
      }

      const requests = await prisma.leaveRequest.findMany({
        where: {
          user: { managerId: user.id },
          isDeleted: false,
        },
        include: {
          user: { select: { id: true, name: true, email: true } },
          leaveType: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      return createSuccessResponse(requests);
    }

    const leaveTypes = await prisma.leaveType.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
    return createSuccessResponse(leaveTypes);
  } catch (err) {
    logger.error('leave_requests.get_failed', { error: String(err) });
    return createErrorResponse(ERROR_CODES.DATABASE_ERROR, 'Failed to fetch leave requests');
  }
}

async function resolveUser(session: { userId: string; role: string }) {
  return prisma.user.findUnique({ where: { id: session.userId } });
}

export async function POST(request: Request) {
  try {
    const session = await getMockSession();
    if (!session) {
      return createErrorResponse(ERROR_CODES.UNAUTHORIZED, 'Authentication required');
    }

    if (session.role === 'hr_admin') {
      return createErrorResponse(
        ERROR_CODES.FORBIDDEN,
        'HR admins cannot submit leave requests'
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'Invalid request body');
    }

    if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
      return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'Request body must be an object');
    }

    const body = raw as Record<string, unknown>;
    const { leaveTypeId, startDate, endDate, reason } = body;

    if (typeof leaveTypeId !== 'string' || typeof startDate !== 'string' || typeof endDate !== 'string') {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'leaveTypeId, startDate, and endDate are required strings'
      );
    }

    if (reason !== undefined && reason !== null && typeof reason !== 'string') {
      return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'Reason must be a string');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'Invalid date format. Use YYYY-MM-DD'
      );
    }

    if (end < start) {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'End date cannot be before start date'
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today) {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'Start date cannot be in the past'
      );
    }

    if (typeof reason === 'string' && reason.length > 500) {
      return createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        'Reason must be 500 characters or less'
      );
    }

    let user;
    user = await prisma.user.findUnique({ where: { id: session.userId } });

    if (!user) {
      return createErrorResponse(ERROR_CODES.INTERNAL_ERROR, 'User not found');
    }

    let leaveType;
    try {
      leaveType = await prisma.leaveType.findUnique({ where: { id: leaveTypeId } });
    } catch {
      return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'Invalid leave type ID format');
    }

    if (!leaveType) {
      return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'Leave type not found');
    }

    const requestedDays = calculateDaysBetween(startDate, endDate);
    let warning: string | null = null;

    if (leaveType.tracksBalance) {
      const balance = await prisma.leaveBalance.findUnique({
        where: {
          userId_leaveTypeId: {
            userId: user.id,
            leaveTypeId,
          },
        },
      });

      const availableBalance = Number(balance?.balance ?? 0);

      if (requestedDays > availableBalance) {
        warning =
          `Requested ${requestedDays} day${requestedDays !== 1 ? 's' : ''} but only ` +
          `${availableBalance} day${availableBalance !== 1 ? 's' : ''} available in ` +
          `${leaveType.name} balance. Request will still be submitted.`;
      }
    }

    const newRequest = await prisma.$transaction(async (tx) => {
      const request = await tx.leaveRequest.create({
        data: {
          userId: user.id,
          leaveTypeId,
          startDate: start,
          endDate: end,
          reason: (typeof reason === 'string' && reason) || null,
          status: 'pending',
        },
      });

      await tx.auditLog.create({
        data: {
          leaveRequestId: request.id,
          actorId: user.id,
          action: 'requested',
        },
      });

      return request;
    });

    if (user.managerId) {
      const manager = await prisma.user.findUnique({ where: { id: user.managerId } });
      if (manager) {
        logger.info('leave_request.submitted', {
          managerId: manager.id,
          userId: user.id,
          days: requestedDays,
          leaveType: leaveType.name,
          startDate,
          endDate,
        });
      }
    }

    return createSuccessResponse({ request: newRequest, warning });
  } catch (err) {
    logger.error('leave_requests.post_failed', { error: String(err) });
    return createErrorResponse(ERROR_CODES.INTERNAL_ERROR, 'Failed to create leave request');
  }
}
