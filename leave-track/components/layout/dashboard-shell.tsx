'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { MobileNav } from '@/components/layout/mobile-nav';
import type { UserRole } from '@/types';

interface DashboardShellProps {
  children: React.ReactNode;
  role: UserRole;
  userName: string;
}

export function DashboardShell({ children, role, userName }: DashboardShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar role={role} />

      <MobileNav
        role={role}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="lg:pl-64">
        <Header
          role={role}
          userName={userName}
          onMenuClick={() => setMobileNavOpen(true)}
        />

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
