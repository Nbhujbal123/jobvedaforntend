import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

type BadgeVariant = 'primary' | 'neutral' | 'success';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-accent text-primary',
  neutral: 'bg-secondary/5 text-secondary',
  success: 'bg-emerald-50 text-emerald-600',
};

export function Badge({ children, variant = 'primary', className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
