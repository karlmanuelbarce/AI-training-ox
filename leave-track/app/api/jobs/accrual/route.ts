import { prisma } from '@/lib/prisma';
import { createErrorResponse, createSuccessResponse, ERROR_CODES } from '@/lib/errors';
import { logger } from '@/lib/logger';

function currentPeriod(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

export async function POST() {
  const period = currentPeriod(new Date());

  try {
    const result = await prisma.$transaction(async (tx) => {
      let run;
      try {
        run = await tx.accrualRun.create({ data: { period } });
      } catch (err) {
        if (err instanceof Error && 'code' in err && (err as { code?: string }).code === 'P2002') {
          return { alreadyRan: true, period };
        }
        throw err;
      }

      const policies = await tx.leavePolicy.findMany();

      const updatedBalances = await Promise.all(
        policies.map((policy) =>
          tx.leaveBalance.upsert({
            where: {
              userId_leaveTypeId: {
                userId: policy.userId,
                leaveTypeId: policy.leaveTypeId,
              },
            },
            update: { balance: { increment: policy.accrualPerMonth } },
            create: {
              userId: policy.userId,
              leaveTypeId: policy.leaveTypeId,
              balance: policy.accrualPerMonth,
            },
          })
        )
      );

      return {
        alreadyRan: false,
        period,
        runId: run.id,
        policiesProcessed: policies.length,
        balancesUpdated: updatedBalances.length,
      };
    });

    if (result.alreadyRan) {
      logger.info('accrual.job.skipped', { period: result.period });
      return createSuccessResponse({
        period,
        ran: false,
        message: 'Already accrued for this period',
      });
    }

    logger.info('accrual.job.completed', {
      period: result.period,
      policiesProcessed: result.policiesProcessed,
      balancesUpdated: result.balancesUpdated,
    });

    return createSuccessResponse({
      period: result.period,
      ran: true,
      policiesProcessed: result.policiesProcessed,
      balancesUpdated: result.balancesUpdated,
    });
  } catch (err) {
    logger.error('accrual.job.failed', { error: String(err), period });
    return createErrorResponse(ERROR_CODES.INTERNAL_ERROR, 'Failed to run accrual job');
  }
}
