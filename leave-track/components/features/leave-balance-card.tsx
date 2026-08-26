import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaveBalanceCardProps {
  leaveType: string;
  balance: number | null;
  pending: number;
  used: number;
  accrualRate: number | null;
  color?: string;
}

export function LeaveBalanceCard({
  leaveType,
  balance,
  pending,
  used,
  accrualRate,
  color = 'bg-primary-100',
}: LeaveBalanceCardProps) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', color)}>
            <TrendingUp className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">{leaveType}</h3>
            {accrualRate && (
              <p className="text-sm text-neutral-500">+{accrualRate} days/month</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">Available</span>
            <span className="text-2xl font-bold text-neutral-900">
              {balance !== null ? balance : 'N/A'}
            </span>
          </div>

          {pending > 0 && (
            <div className="flex items-center justify-between rounded-lg bg-warning-50 p-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-warning-500" />
                <span className="text-sm text-warning-500">Pending</span>
              </div>
              <span className="font-medium text-warning-500">-{pending}</span>
            </div>
          )}

          <div className="border-t border-neutral-200 pt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">Used this year</span>
              <span className="font-medium text-neutral-900">{used}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
