import { prisma } from '@/lib/prisma';
import { getMockSession } from '@/lib/auth';
import {
  createErrorResponse,
  createSuccessResponse,
  ERROR_CODES,
} from '@/lib/errors';
import { logger } from '@/lib/logger';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await getMockSession();
    if (!session) {
      return createErrorResponse(ERROR_CODES.UNAUTHORIZED, 'Authentication required');
    }

    if (session.role !== 'hr_admin') {
      return createErrorResponse(ERROR_CODES.FORBIDDEN, 'Only HR admins can view audit reports');
    }

    const { userId } = await params;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return createErrorResponse(ERROR_CODES.NOT_FOUND, 'User not found');
    }

    const requests = await prisma.leaveRequest.findMany({
      where: { userId, isDeleted: false },
      include: {
        leaveType: { select: { id: true, name: true } },
        decidedUser: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    logger.info('audit.report_fetched', {
      requestedUserId: userId,
      actorId: session.userId,
      count: requests.length,
    });

    return createSuccessResponse(requests);
  } catch (err) {
    logger.error('audit.report_failed', { error: String(err) });
    return createErrorResponse(ERROR_CODES.INTERNAL_ERROR, 'Failed to fetch audit report');
  }
}
