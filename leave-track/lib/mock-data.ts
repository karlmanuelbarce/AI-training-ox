import type {
  User,
  LeaveType,
  LeavePolicy,
  LeaveBalance,
  LeaveRequest,
  AuditLog,
} from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@leavetrack.com',
    role: 'hr_admin',
    managerId: null,
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@leavetrack.com',
    role: 'manager',
    managerId: '1',
  },
  {
    id: '3',
    name: 'Emily Johnson',
    email: 'emily.johnson@leavetrack.com',
    role: 'employee',
    managerId: '2',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@leavetrack.com',
    role: 'employee',
    managerId: '2',
  },
  {
    id: '5',
    name: 'Jessica Williams',
    email: 'jessica.williams@leavetrack.com',
    role: 'employee',
    managerId: '2',
  },
];

export const mockLeaveTypes: LeaveType[] = [
  { id: 'lt-1', name: 'Vacation', tracksBalance: true },
  { id: 'lt-2', name: 'Sick', tracksBalance: true },
  { id: 'lt-3', name: 'Unpaid', tracksBalance: false },
];

export const mockLeavePolicies: LeavePolicy[] = [
  { id: 'lp-1', userId: '3', leaveTypeId: 'lt-1', accrualPerMonth: 1.5 },
  { id: 'lp-2', userId: '3', leaveTypeId: 'lt-2', accrualPerMonth: 1.0 },
  { id: 'lp-3', userId: '4', leaveTypeId: 'lt-1', accrualPerMonth: 1.5 },
  { id: 'lp-4', userId: '4', leaveTypeId: 'lt-2', accrualPerMonth: 1.0 },
  { id: 'lp-5', userId: '5', leaveTypeId: 'lt-1', accrualPerMonth: 1.5 },
  { id: 'lp-6', userId: '5', leaveTypeId: 'lt-2', accrualPerMonth: 1.0 },
];

export const mockLeaveBalances: LeaveBalance[] = [
  {
    id: 'lb-1',
    userId: '3',
    leaveTypeId: 'lt-1',
    balance: 12.5,
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'lb-2',
    userId: '3',
    leaveTypeId: 'lt-2',
    balance: 8.0,
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'lb-3',
    userId: '4',
    leaveTypeId: 'lt-1',
    balance: 15.0,
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'lb-4',
    userId: '4',
    leaveTypeId: 'lt-2',
    balance: 10.0,
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'lb-5',
    userId: '5',
    leaveTypeId: 'lt-1',
    balance: 20.0,
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'lb-6',
    userId: '5',
    leaveTypeId: 'lt-2',
    balance: 5.0,
    updatedAt: '2026-08-01T00:00:00Z',
  },
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'lr-1',
    userId: '3',
    leaveTypeId: 'lt-1',
    startDate: '2026-09-15',
    endDate: '2026-09-19',
    reason: 'Family vacation to Hawaii',
    status: 'pending',
    decidedBy: null,
    decidedAt: null,
    isDeleted: false,
    createdAt: '2026-08-20T10:30:00Z',
  },
  {
    id: 'lr-2',
    userId: '3',
    leaveTypeId: 'lt-2',
    startDate: '2026-08-01',
    endDate: '2026-08-02',
    reason: 'Feeling unwell',
    status: 'approved',
    decidedBy: '2',
    decidedAt: '2026-08-01T14:20:00Z',
    isDeleted: false,
    createdAt: '2026-08-01T08:00:00Z',
  },
  {
    id: 'lr-3',
    userId: '4',
    leaveTypeId: 'lt-1',
    startDate: '2026-09-01',
    endDate: '2026-09-05',
    reason: 'Personal matters',
    status: 'approved',
    decidedBy: '2',
    decidedAt: '2026-08-25T11:15:00Z',
    isDeleted: false,
    createdAt: '2026-08-24T09:00:00Z',
  },
  {
    id: 'lr-4',
    userId: '4',
    leaveTypeId: 'lt-3',
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    reason: 'Moving to new apartment',
    status: 'pending',
    decidedBy: null,
    decidedAt: null,
    isDeleted: false,
    createdAt: '2026-08-26T16:45:00Z',
  },
  {
    id: 'lr-5',
    userId: '5',
    leaveTypeId: 'lt-1',
    startDate: '2026-08-15',
    endDate: '2026-08-16',
    reason: 'Doctor appointment',
    status: 'rejected',
    decidedBy: '2',
    decidedAt: '2026-08-14T10:00:00Z',
    isDeleted: false,
    createdAt: '2026-08-13T14:30:00Z',
  },
  {
    id: 'lr-6',
    userId: '3',
    leaveTypeId: 'lt-1',
    startDate: '2026-07-01',
    endDate: '2026-07-05',
    reason: 'Summer break',
    status: 'approved',
    decidedBy: '2',
    decidedAt: '2026-06-28T09:30:00Z',
    isDeleted: false,
    createdAt: '2026-06-27T11:00:00Z',
  },
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'al-1',
    leaveRequestId: 'lr-2',
    actorId: '2',
    action: 'approved',
    occurredAt: '2026-08-01T14:20:00Z',
  },
  {
    id: 'al-2',
    leaveRequestId: 'lr-3',
    actorId: '2',
    action: 'approved',
    occurredAt: '2026-08-25T11:15:00Z',
  },
  {
    id: 'al-3',
    leaveRequestId: 'lr-5',
    actorId: '2',
    action: 'rejected',
    occurredAt: '2026-08-14T10:00:00Z',
  },
  {
    id: 'al-4',
    leaveRequestId: 'lr-6',
    actorId: '2',
    action: 'approved',
    occurredAt: '2026-06-28T09:30:00Z',
  },
];

export function getMockUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
}

export function getMockUserByEmail(email: string): User | undefined {
  return mockUsers.find((user) => user.email === email);
}

export function getMockLeaveTypeById(id: string): LeaveType | undefined {
  return mockLeaveTypes.find((lt) => lt.id === id);
}

export function getMockBalancesByUserId(
  userId: string
): LeaveBalance[] {
  return mockLeaveBalances.filter((lb) => lb.userId === userId);
}

export function getMockRequestsByUserId(
  userId: string
): LeaveRequest[] {
  return mockLeaveRequests.filter(
    (lr) => lr.userId === userId && !lr.isDeleted
  );
}

export function getMockTeamRequestsByManagerId(
  managerId: string
): LeaveRequest[] {
  const teamMembers = mockUsers
    .filter((u) => u.managerId === managerId)
    .map((u) => u.id);
  return mockLeaveRequests.filter(
    (lr) => teamMembers.includes(lr.userId) && !lr.isDeleted
  );
}

export function getMockAuditLogsByUserId(
  userId: string
): AuditLog[] {
  const userRequests = getMockRequestsByUserId(userId).map((lr) => lr.id);
  return mockAuditLogs.filter((al) => userRequests.includes(al.leaveRequestId));
}
