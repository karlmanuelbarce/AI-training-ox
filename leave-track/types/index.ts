export type UserRole = 'employee' | 'manager' | 'hr_admin';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  managerId: string | null;
}

export interface LeaveType {
  id: string;
  name: string;
  tracksBalance: boolean;
}

export interface LeavePolicy {
  id: string;
  userId: string;
  leaveTypeId: string;
  accrualPerMonth: number;
}

export interface LeaveBalance {
  id: string;
  userId: string;
  leaveTypeId: string;
  balance: number;
  updatedAt: string;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  reason: string | null;
  status: LeaveStatus;
  decidedBy: string | null;
  decidedAt: string | null;
  isDeleted: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  leaveRequestId: string;
  actorId: string;
  action: string;
  occurredAt: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface Session {
  userId: string;
  role: UserRole;
}

export interface LeaveRequestWithDetails extends LeaveRequest {
  user: Pick<User, 'id' | 'name' | 'email'>;
  leaveType: LeaveType;
  decidedByUser: Pick<User, 'id' | 'name'> | null;
}

export interface LeaveBalanceWithDetails extends LeaveBalance {
  leaveType: LeaveType;
  pendingBalance: number;
}

export interface AuditLogWithDetails extends AuditLog {
  leaveRequest: LeaveRequest;
  actor: Pick<User, 'id' | 'name'>;
}
