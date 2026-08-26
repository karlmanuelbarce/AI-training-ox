'use client';

import { Menu, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getRoleDisplayName } from '@/lib/utils';
import type { UserRole } from '@/types';

interface HeaderProps {
  role: UserRole;
  userName: string;
  onMenuClick?: () => void;
}

export function Header({ role, userName, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-neutral-200 bg-white px-4 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuClick}
        className="lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-1 items-center justify-end gap-4">
        <Button variant="ghost" size="sm" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-error-500 text-[10px] font-medium text-white">
            3
          </span>
        </Button>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-neutral-900">{userName}</p>
            <p className="text-xs text-neutral-500">{getRoleDisplayName(role)}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100">
            <span className="text-sm font-medium text-primary-700">
              {userName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
