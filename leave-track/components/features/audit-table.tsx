import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import type { AuditLogWithDetails } from '@/types';

interface AuditTableProps {
  logs: AuditLogWithDetails[];
}

export function AuditTable({ logs }: AuditTableProps) {
  if (logs.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-neutral-500">No audit logs found.</p>
      </div>
    );
  }

  return (
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
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-neutral-50">
              <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-neutral-900">
                {log.leaveRequest.user.name}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500">
                {log.leaveRequest.leaveType.name}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500">
                {formatDate(log.leaveRequest.startDate)} -{' '}
                {formatDate(log.leaveRequest.endDate)}
              </td>
              <td className="whitespace-nowrap px-4 py-4">
                <Badge
                  variant={
                    log.leaveRequest.status === 'approved'
                      ? 'success'
                      : log.leaveRequest.status === 'pending'
                      ? 'warning'
                      : 'error'
                  }
                >
                  {log.leaveRequest.status}
                </Badge>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500">
                {log.actor.name}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-neutral-500">
                {formatDate(log.occurredAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
