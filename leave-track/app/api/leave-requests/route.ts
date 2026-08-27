import { prisma } from '@/lib/prisma';
import { getMockSession } from '@/lib/auth';
import {
  createErrorResponse,
  createSuccessResponse,
  ERROR_CODES,
} from '@/lib/errors';
import { calculateDaysBetween } from '@/lib/utils';
import type { CreateLeaveRequestInput } from '@/types';

export async function GET() {
  const leaveTypes = await prisma.leaveType.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });
  return createSuccessResponse(leaveTypes);
}

export async function POST(request: Request) {
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

  let body: CreateLeaveRequestInput;
  try {
    body = await request.json();
  } catch {
    return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'Invalid request body');
  }

  const { leaveTypeId, startDate, endDate, reason } = body;

  if (!leaveTypeId || !startDate || !endDate) {
    return createErrorResponse(
      ERROR_CODES.VALIDATION_ERROR,
      'leaveTypeId, startDate, and endDate are required'
    );
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

  if (reason && reason.length > 500) {
    return createErrorResponse(
      ERROR_CODES.VALIDATION_ERROR,
      'Reason must be 500 characters or less'
    );
  }

  let user;
  if (process.env.MOCK_AUTH_ENABLED === 'true') {
    user = await prisma.user.findFirst({ where: { role: session.role } });
  } else {
    user = await prisma.user.findUnique({ where: { id: session.userId } });
  }

  if (!user) {
    return createErrorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'User not found'
    );
  }

  let leaveType;
  try {
    leaveType = await prisma.leaveType.findUnique({
      where: { id: leaveTypeId },
    });
  } catch {
    return createErrorResponse(
      ERROR_CODES.VALIDATION_ERROR,
      'Invalid leave type ID format'
    );
  }

  if (!leaveType) {
    return createErrorResponse(
      ERROR_CODES.VALIDATION_ERROR,
      'Leave type not found'
    );
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
      warning = `Requested ${requestedDays} day${requestedDays !== 1 ? 's' : ''} but only ${availableBalance} day${availableBalance !== 1 ? 's' : ''} available in ${leaveType.name} balance. Request will still be submitted.`;
    }
  }

  const newRequest = await prisma.$transaction(async (tx) => {
    const request = await tx.leaveRequest.create({
      data: {
        userId: user.id,
        leaveTypeId,
        startDate: start,
        endDate: end,
        reason: reason || null,
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
    const manager = await prisma.user.findUnique({
      where: { id: user.managerId },
    });
    if (manager) {
      console.log(
        `[NOTIFICATION] Manager ${manager.name} (${manager.email}) notified: ` +
        `${user.name} requested ${requestedDays} day(s) of ${leaveType.name} ` +
        `(${startDate} to ${endDate})`
      );
    }
  }

  return createSuccessResponse({ request: newRequest, warning });
}
