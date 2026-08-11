import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-[var(--shadow-card)]',
  secondary: 'bg-secondary text-white hover:bg-black',
  outline: 'border border-secondary/15 text-secondary hover:border-primary hover:text-primary',
  ghost: 'text-secondary hover:bg-accent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-base',
};

/**
 * Shared style resolver so links (NavLink/Link) can look like a Button
 * without nesting an <a> inside a <button>.
 */
export function buttonVariants(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}
