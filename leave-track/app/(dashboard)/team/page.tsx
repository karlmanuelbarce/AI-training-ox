'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateRange } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

type TeamRequestStatus = 'pending' | 'approved' | 'rejected';

interface TeamRequest {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: TeamRequestStatus;
}

const mockTeamRequests: TeamRequest[] = [
  {
    id: '1',
    employeeName: 'Emily Johnson',
    type: 'Vacation',
    startDate: '2026-09-15',
    endDate: '2026-09-19',
    reason: 'Family vacation',
    status: 'pending',
  },
  {
    id: '2',
    employeeName: 'David Kim',
    type: 'Unpaid',
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    reason: 'Moving to new apartment',
    status: 'pending',
  },
  {
    id: '3',
    employeeName: 'Jessica Williams',
    type: 'Vacation',
    startDate: '2026-08-15',
    endDate: '2026-08-16',
    reason: 'Doctor appointment',
    status: 'rejected',
  },
];

export default function TeamQueuePage() {
  const [requests, setRequests] = useState(mockTeamRequests);

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: 'approved' as const } : r))
    );
  };

  const handleReject = (id: string) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: 'rejected' as const } : r))
    );
  };

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const completedRequests = requests.filter((r) => r.status !== 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Team Queue</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Review and approve leave requests from your team.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-neutral-900">
            Pending Requests ({pendingRequests.length})
          </h2>
        </CardHeader>
        <CardContent>
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
                        {request.employeeName}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {request.type} - {formatDateRange(request.startDate, request.endDate)}
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
                        onClick={() => handleReject(request.id)}
                        className="text-error-600 hover:bg-error-50 hover:text-error-700"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(request.id)}
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
        </CardContent>
      </Card>

      {completedRequests.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-neutral-900">
              Completed ({completedRequests.length})
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 opacity-75"
                >
                  <div>
                    <p className="font-medium text-neutral-900">
                      {request.employeeName}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {request.type} - {formatDateRange(request.startDate, request.endDate)}
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
