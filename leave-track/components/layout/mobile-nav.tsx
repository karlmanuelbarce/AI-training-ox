'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import {
  LayoutDashboard,
  CalendarPlus,
  CalendarDays,
  Wallet,
  Users,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

interface MobileNavProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
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

export function MobileNav({ role, isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/25" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
            <span className="text-lg font-semibold text-neutral-900">Menu</span>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close menu">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-1">
              {filteredItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
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
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
