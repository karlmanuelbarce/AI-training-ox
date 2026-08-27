import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LeaveBalanceCard } from '@/components/features/leave-balance-card';
import { TrendingDown } from 'lucide-react';
import { getMockSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculateDaysBetween } from '@/lib/utils';

async function getCurrentUser() {
  const session = await getMockSession();
  if (!session) return null;

  if (process.env.MOCK_AUTH_ENABLED === 'true') {
    return prisma.user.findFirst({
      where: { role: session.role },
    });
  }
  return prisma.user.findUnique({ where: { id: session.userId } });
}

const LEAVE_TYPE_COLORS: Record<string, string> = {
  Vacation: 'bg-primary-100',
  Sick: 'bg-success-100',
  Unpaid: 'bg-neutral-100',
};

export default async function BalancesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Leave Balances</h1>
          <p className="mt-1 text-sm text-neutral-500">
            View your current leave balances and pending requests.
          </p>
        </div>
        <Card>
          <CardContent>
            <div className="py-12 text-center">
              <p className="text-sm text-neutral-500">
                Sign in to view your leave balances.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [balances, pendingRequests, policies, leaveTypes] = await Promise.all([
    prisma.leaveBalance.findMany({
      where: { userId: user.id },
      include: { leaveType: true },
    }),
    prisma.leaveRequest.findMany({
      where: { userId: user.id, status: 'pending', isDeleted: false },
      include: { leaveType: true },
    }),
    prisma.leavePolicy.findMany({
      where: { userId: user.id },
    }),
    prisma.leaveType.findMany({ orderBy: { name: 'asc' } }),
  ]);

  const accrualByType = new Map(policies.map((p) => [p.leaveTypeId, p.accrualPerMonth]));

  const pendingByType = new Map<string, number>();
  for (const request of pendingRequests) {
    const days = calculateDaysBetween(
      request.startDate.toISOString(),
      request.endDate.toISOString()
    );
    pendingByType.set(
      request.leaveTypeId,
      (pendingByType.get(request.leaveTypeId) ?? 0) + days
    );
  }

  const balanceByType = new Map(
    balances.map((b) => [b.leaveTypeId, Number(b.balance)])
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Leave Balances</h1>
        <p className="mt-1 text-sm text-neutral-500">
          View your current leave balances and pending requests.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leaveTypes.map((leaveType) => {
          const tracksBalance = leaveType.tracksBalance;
          const balance = tracksBalance ? (balanceByType.get(leaveType.id) ?? 0) : null;
          const pending = pendingByType.get(leaveType.id) ?? 0;
          const accrualRate = accrualByType.get(leaveType.id) ?? null;

          return (
            <LeaveBalanceCard
              key={leaveType.id}
              leaveType={leaveType.name}
              balance={balance}
              pending={pending}
              accrualRate={tracksBalance ? Number(accrualRate) : null}
              color={LEAVE_TYPE_COLORS[leaveType.name] ?? 'bg-primary-100'}
            />
          );
        })}
      </div>

      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-warning-500" />
              <h2 className="text-lg font-semibold text-neutral-900">
                Pending requests
              </h2>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-neutral-200">
              {pendingRequests.map((request) => (
                <li
                  key={request.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="font-medium text-neutral-900">
                    {request.leaveType.name}
                  </span>
                  <span className="text-neutral-500">
                    {calculateDaysBetween(
                      request.startDate.toISOString(),
                      request.endDate.toISOString()
                    )}{' '}
                    day(s) pending approval
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
