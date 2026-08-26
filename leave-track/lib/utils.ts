import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start.toDateString() === end.toDateString()) {
    return formatDate(startDate);
  }

  const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = end.toLocaleDateString('en-US', { month: 'short' });

  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export function calculateDaysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'approved':
      return 'badge-success';
    case 'rejected':
      return 'badge-error';
    case 'pending':
      return 'badge-warning';
    default:
      return 'badge-neutral';
  }
}

export function getRoleDisplayName(role: string): string {
  switch (role) {
    case 'employee':
      return 'Employee';
    case 'manager':
      return 'Manager';
    case 'hr_admin':
      return 'HR Admin';
    default:
      return role;
  }
}
