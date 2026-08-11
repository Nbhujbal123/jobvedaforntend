import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

export function LoadingSpinner({ size = 24, className, label = 'Loading' }: LoadingSpinnerProps) {
  return (
    <div role="status" className={cn('flex items-center justify-center gap-2 text-primary', className)}>
      <Loader2 size={size} className="animate-spin" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
