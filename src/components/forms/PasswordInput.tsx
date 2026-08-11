import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, id, ...rest }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <Input
        ref={ref}
        id={id}
        label={label}
        error={error}
        type={isVisible ? 'text' : 'password'}
        endAdornment={
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            className="text-muted hover:text-primary"
          >
            {isVisible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
          </button>
        }
        {...rest}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
