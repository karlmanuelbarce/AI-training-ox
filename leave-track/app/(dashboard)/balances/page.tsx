import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const balances = [
  {
    type: 'Vacation',
    balance: 12.5,
    pending: 5.0,
    used: 7.5,
    accrualRate: 1.5,
    color: 'bg-primary-100',
    textColor: 'text-primary-600',
  },
  {
    type: 'Sick',
    balance: 8.0,
    pending: 0,
    used: 4.0,
    accrualRate: 1.0,
    color: 'bg-success-100',
    textColor: 'text-success-600',
  },
  {
    type: 'Unpaid',
    balance: null,
    pending: 3.0,
    used: 0,
    accrualRate: null,
    color: 'bg-neutral-100',
    textColor: 'text-neutral-600',
  },
];

export default function BalancesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Leave Balances</h1>
        <p className="mt-1 text-sm text-neutral-500">
          View your current leave balances and pending requests.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {balances.map((balance) => (
          <Card key={balance.type}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${balance.color}`}>
                  <TrendingUp className={`h-6 w-6 ${balance.textColor}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {balance.type}
                  </h3>
                  {balance.accrualRate && (
                    <p className="text-sm text-neutral-500">
                      +{balance.accrualRate} days/month
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Available</span>
                  <span className="text-2xl font-bold text-neutral-900">
                    {balance.balance !== null ? balance.balance : 'N/A'}
                  </span>
                </div>

                {balance.pending > 0 && (
                  <div className="flex items-center justify-between rounded-lg bg-warning-50 p-3">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-warning-500" />
                      <span className="text-sm text-warning-500">Pending</span>
                    </div>
                    <span className="font-medium text-warning-500">
                      -{balance.pending}
                    </span>
                  </div>
                )}

                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Used this year</span>
                    <span className="font-medium text-neutral-900">
                      {balance.used}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
