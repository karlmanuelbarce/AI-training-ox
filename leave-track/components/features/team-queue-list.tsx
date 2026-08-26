'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateRange } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';
import type { LeaveRequestWithDetails } from '@/types';

interface TeamQueueListProps {
  requests: LeaveRequestWithDetails[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function TeamQueueList({
  requests,
  onApprove,
  onReject,
}: TeamQueueListProps) {
  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const completedRequests = requests.filter((r) => r.status !== 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          Pending Requests ({pendingRequests.length})
        </h2>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-neutral-500">No pending requests.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-lg border border-neutral-200 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-neutral-900">
                    {request.user.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {request.leaveType.name} -{' '}
                    {formatDateRange(request.startDate, request.endDate)}
                  </p>
                  {request.reason && (
                    <p className="mt-1 text-sm text-neutral-500">
                      Reason: {request.reason}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onReject(request.id)}
                    className="text-error-600 hover:bg-error-50 hover:text-error-700"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onApprove(request.id)}
                    className="bg-success-600 hover:bg-success-500"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {completedRequests.length > 0 && (
        <>
          <div className="pt-4">
            <h2 className="text-lg font-semibold text-neutral-900">
              Completed ({completedRequests.length})
            </h2>
          </div>
          <div className="space-y-3">
            {completedRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 opacity-75"
              >
                <div>
                  <p className="font-medium text-neutral-900">
                    {request.user.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {request.leaveType.name} -{' '}
                    {formatDateRange(request.startDate, request.endDate)}
                  </p>
                </div>
                <Badge
                  variant={request.status === 'approved' ? 'success' : 'error'}
                >
                  {request.status}
                </Badge>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
