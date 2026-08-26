import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDateRange } from '@/lib/utils';

const mockRequests = [
  {
    id: '1',
    type: 'Vacation',
    startDate: '2026-09-15',
    endDate: '2026-09-19',
    status: 'pending' as const,
    reason: 'Family vacation',
  },
  {
    id: '2',
    type: 'Sick',
    startDate: '2026-08-01',
    endDate: '2026-08-02',
    status: 'approved' as const,
    reason: 'Feeling unwell',
  },
  {
    id: '3',
    type: 'Vacation',
    startDate: '2026-07-01',
    endDate: '2026-07-05',
    status: 'approved' as const,
    reason: 'Summer break',
  },
  {
    id: '4',
    type: 'Sick',
    startDate: '2026-06-15',
    endDate: '2026-06-15',
    status: 'rejected' as const,
    reason: 'Personal day',
  },
];

export default function MyRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">My Requests</h1>
        <p className="mt-1 text-sm text-neutral-500">
          View and track all your leave requests.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-neutral-900">Request History</h2>
        </CardHeader>
        <CardContent>
          {mockRequests.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-neutral-500">No leave requests found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Dates
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Reason
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {mockRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-neutral-50">
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-neutral-900">
                        {request.type}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500">
                        {formatDateRange(request.startDate, request.endDate)}
                      </td>
                      <td className="px-4 py-4 text-sm text-neutral-500">
                        {request.reason}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <Badge
                          variant={
                            request.status === 'approved'
                              ? 'success'
                              : request.status === 'pending'
                              ? 'warning'
                              : 'error'
                          }
                        >
                          {request.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
