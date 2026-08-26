import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import type { UserRole } from '@/types';

const MOCK_ROLE_COOKIE = 'mock-role';

const mockUsers: Record<UserRole, { name: string }> = {
  employee: { name: 'John Employee' },
  manager: { name: 'Team Manager' },
  hr_admin: { name: 'HR Admin' },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const role = cookieStore.get(MOCK_ROLE_COOKIE)?.value as UserRole | undefined;

  if (!role || !['employee', 'manager', 'hr_admin'].includes(role)) {
    redirect('/login');
  }

  const userName = mockUsers[role]?.name || 'User';

  return (
    <DashboardShell role={role} userName={userName}>
      {children}
    </DashboardShell>
  );
}
