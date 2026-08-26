import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
  className?: string;
  text?: string;
}

export function Loading({
  size = 'md',
  fullPage = false,
  className,
  text,
}: LoadingProps) {
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin text-primary-600', sizeStyles[size])} />
      {text && <p className="text-sm text-neutral-500">{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  className,
}: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <Loader2
      className={cn('animate-spin text-primary-600', sizeStyles[size], className)}
    />
  );
}
