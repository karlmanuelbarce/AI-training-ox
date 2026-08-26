import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

const mockAuditLogs = [
  {
    id: '1',
    employeeName: 'Emily Johnson',
    leaveType: 'Vacation',
    startDate: '2026-08-01',
    endDate: '2026-08-02',
    status: 'approved',
    decidedBy: 'Michael Rodriguez',
    decidedAt: '2026-08-01T14:20:00Z',
  },
  {
    id: '2',
    employeeName: 'David Kim',
    leaveType: 'Vacation',
    startDate: '2026-09-01',
    endDate: '2026-09-05',
    status: 'approved',
    decidedBy: 'Michael Rodriguez',
    decidedAt: '2026-08-25T11:15:00Z',
  },
  {
    id: '3',
    employeeName: 'Jessica Williams',
    leaveType: 'Vacation',
    startDate: '2026-08-15',
    endDate: '2026-08-16',
    status: 'rejected',
    decidedBy: 'Michael Rodriguez',
    decidedAt: '2026-08-14T10:00:00Z',
  },
];

export default function AuditReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Audit Report</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Complete decision history for all employees.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-neutral-900">Decision History</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Employee
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Leave Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Dates
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Decided By
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                    Decision Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {mockAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-50">
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-neutral-900">
                      {log.employeeName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500">
                      {log.leaveType}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500">
                      {formatDate(log.startDate)} - {formatDate(log.endDate)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <Badge
                        variant={
                          log.status === 'approved'
                            ? 'success'
                            : log.status === 'pending'
                            ? 'warning'
                            : 'error'
                        }
                      >
                        {log.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500">
                      {log.decidedBy}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500">
                      {formatDate(log.decidedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
