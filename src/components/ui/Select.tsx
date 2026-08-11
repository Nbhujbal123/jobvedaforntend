import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { SelectOption } from '@/types/common.types';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              'h-11 w-full appearance-none rounded-xl border border-secondary/15 bg-white px-4 pr-10 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
              error && 'border-red-400 focus:border-red-400 focus:ring-red-100',
              className,
            )}
            aria-invalid={Boolean(error)}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

Select.displayName = 'Select';
