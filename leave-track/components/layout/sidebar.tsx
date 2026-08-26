'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarPlus,
  CalendarDays,
  Wallet,
  Users,
  Shield,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

interface SidebarProps {
  role: UserRole;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['employee', 'manager', 'hr_admin'],
  },
  {
    label: 'Submit Request',
    href: '/leave-requests/new',
    icon: CalendarPlus,
    roles: ['employee', 'manager', 'hr_admin'],
  },
  {
    label: 'My Requests',
    href: '/leave-requests',
    icon: CalendarDays,
    roles: ['employee', 'manager', 'hr_admin'],
  },
  {
    label: 'Balances',
    href: '/balances',
    icon: Wallet,
    roles: ['employee', 'manager', 'hr_admin'],
  },
  {
    label: 'Team Queue',
    href: '/team',
    icon: Users,
    roles: ['manager', 'hr_admin'],
  },
  {
    label: 'Audit Report',
    href: '/audit',
    icon: Shield,
    roles: ['hr_admin'],
  },
];

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  const handleLogout = async () => {
    try {
      await fetch('/api/mock-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-neutral-200 bg-white px-6 pb-4">
        <div className="flex h-16 items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <CalendarDays className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-900">LeaveTrack</span>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5',
                    isActive ? 'text-primary-600' : 'text-neutral-400'
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-neutral-200 pt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors duration-150 hover:bg-neutral-50 hover:text-neutral-900"
          >
            <LogOut className="h-5 w-5 text-neutral-400" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
