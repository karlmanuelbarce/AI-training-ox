import { prisma } from '@/lib/prisma';
import { getMockSession } from '@/lib/auth';
import {
  createErrorResponse,
  createSuccessResponse,
  ERROR_CODES,
} from '@/lib/errors';
import { calculateDaysBetween } from '@/lib/utils';
import { logger } from '@/lib/logger';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getMockSession();
    if (!session) {
      return createErrorResponse(ERROR_CODES.UNAUTHORIZED, 'Authentication required');
    }

    if (session.role !== 'manager') {
      return createErrorResponse(ERROR_CODES.FORBIDDEN, 'Only managers can approve or reject requests');
    }

    const { id } = await params;

    const leaveRequest = await prisma.leaveRequest.findFirst({
      where: { id, isDeleted: false },
      include: {
        user: { select: { id: true, managerId: true } },
        leaveType: { select: { id: true, name: true, tracksBalance: true } },
      },
    });

    if (!leaveRequest) {
      return createErrorResponse(ERROR_CODES.NOT_FOUND, 'Leave request not found');
    }

    if (leaveRequest.status !== 'pending') {
      return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'Leave request has already been decided');
    }

    if (leaveRequest.user.managerId !== session.userId) {
      return createErrorResponse(ERROR_CODES.FORBIDDEN, 'You can only act on requests from your direct reports');
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
    const { decision, reason } = body;

    if (decision !== 'approved' && decision !== 'rejected') {
      return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'Decision must be "approved" or "rejected"');
    }

    if (decision === 'rejected') {
      if (typeof reason !== 'string' || reason.trim().length === 0) {
        return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'Rejection requires a reason');
      }
      if (reason.length > 500) {
        return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'Reason must be 500 characters or less');
      }
    }

    const requestedDays = calculateDaysBetween(
      leaveRequest.startDate.toISOString().split('T')[0],
      leaveRequest.endDate.toISOString().split('T')[0]
    );

    const result = await prisma.$transaction(async (tx) => {
      if (decision === 'approved' && leaveRequest.leaveType.tracksBalance) {
        const balance = await tx.leaveBalance.findUnique({
          where: {
            userId_leaveTypeId: {
              userId: leaveRequest.userId,
              leaveTypeId: leaveRequest.leaveTypeId,
            },
          },
        });

        if (!balance) {
          return createErrorResponse(ERROR_CODES.VALIDATION_ERROR, 'No balance record found for this leave type');
        }

        const currentBalance = Number(balance.balance);

        if (currentBalance < requestedDays) {
          return createErrorResponse(
            ERROR_CODES.VALIDATION_ERROR,
            `Insufficient balance. ${currentBalance} day${currentBalance !== 1 ? 's' : ''} available, ${requestedDays} day${requestedDays !== 1 ? 's' : ''} requested`
          );
        }

        await tx.leaveBalance.update({
          where: { id: balance.id },
          data: { balance: currentBalance - requestedDays },
        });
      }

      const updated = await tx.leaveRequest.update({
        where: { id },
        data: {
          status: decision,
          decidedBy: session.userId,
          decidedAt: new Date(),
        },
      });

      await tx.auditLog.create({
        data: {
          leaveRequestId: id,
          actorId: session.userId,
          action: decision,
        },
      });

      return updated;
    });

    logger.info('leave_request.decided', {
      requestId: id,
      decision,
      actorId: session.userId,
      userId: leaveRequest.userId,
      days: requestedDays,
    });

    return createSuccessResponse({ request: result });
  } catch (err) {
    logger.error('leave_request.decision_failed', { error: String(err) });
    return createErrorResponse(ERROR_CODES.INTERNAL_ERROR, 'Failed to process decision');
  }
}
