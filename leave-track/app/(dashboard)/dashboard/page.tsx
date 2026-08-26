import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Requests',
    value: '12',
    change: '+2 this month',
    icon: CalendarDays,
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    label: 'Pending',
    value: '3',
    change: 'Awaiting approval',
    icon: Clock,
    color: 'text-warning-500',
    bgColor: 'bg-warning-100',
  },
  {
    label: 'Approved',
    value: '8',
    change: '+1 this week',
    icon: CheckCircle,
    color: 'text-success-600',
    bgColor: 'bg-success-100',
  },
  {
    label: 'Rejected',
    value: '1',
    change: 'Last month',
    icon: XCircle,
    color: 'text-error-600',
    bgColor: 'bg-error-100',
  },
];

const recentRequests = [
  {
    id: '1',
    type: 'Vacation',
    dates: 'Sep 15 - Sep 19, 2026',
    status: 'pending' as const,
  },
  {
    id: '2',
    type: 'Sick',
    dates: 'Aug 1 - Aug 2, 2026',
    status: 'approved' as const,
  },
  {
    id: '3',
    type: 'Vacation',
    dates: 'Jul 1 - Jul 5, 2026',
    status: 'approved' as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Welcome back! Here&apos;s an overview of your leave requests.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                <p className="text-xs text-neutral-400">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-neutral-900">Recent Requests</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 p-4"
                >
                  <div>
                    <p className="font-medium text-neutral-900">{request.type}</p>
                    <p className="text-sm text-neutral-500">{request.dates}</p>
                  </div>
                  <Badge variant={request.status === 'approved' ? 'success' : request.status === 'pending' ? 'warning' : 'error'}>
                    {request.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-neutral-900">Leave Balances</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Vacation</p>
                    <p className="text-sm text-neutral-500">12.5 days available</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-neutral-900">12.5</p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-100">
                    <TrendingUp className="h-5 w-5 text-success-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Sick</p>
                    <p className="text-sm text-neutral-500">8.0 days available</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-neutral-900">8.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
