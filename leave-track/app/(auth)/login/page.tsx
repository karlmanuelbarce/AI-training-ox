'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Loading } from '@/components/ui/loading';
import type { UserRole } from '@/types';

const roleOptions = [
  { value: 'employee', label: 'Employee' },
  { value: 'manager', label: 'Manager' },
  { value: 'hr_admin', label: 'HR Admin' },
];

function isValidRedirect(url: string): boolean {
  if (!url.startsWith('/') || url.startsWith('//') || url.includes('://')) {
    return false;
  }
  return true;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get('redirect') || '/dashboard';
  const redirectTo = isValidRedirect(rawRedirect) ? rawRedirect : '/dashboard';

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/mock-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600">
        <CalendarDays className="h-7 w-7 text-white" />
      </div>
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900">
        LeaveTrack
      </h2>
      <p className="mt-2 text-sm text-neutral-600">
        Employee Leave Management System
      </p>

      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email address"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Select
            label="Sign in as"
            options={roleOptions}
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
          />

          {error && (
            <p className="text-sm text-error-600">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            Sign in
          </Button>
        </form>

        <p className="mt-4 text-xs text-neutral-500">
          This is a demo login. No real authentication is performed.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading fullPage text="Loading..." />}>
      <LoginForm />
    </Suspense>
  );
}
