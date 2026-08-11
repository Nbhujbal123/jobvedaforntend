import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  /** Icon/button rendered inside the field, aligned to the right (e.g. a password visibility toggle). */
  endAdornment?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, endAdornment, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            className={cn(
              'h-11 w-full rounded-xl border border-secondary/15 bg-white px-4 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
              endAdornment ? 'pr-11' : undefined,
              error && 'border-red-400 focus:border-red-400 focus:ring-red-100',
              className,
            )}
            aria-invalid={Boolean(error)}
            {...rest}
          />
          {endAdornment && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{endAdornment}</div>
          )}
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
