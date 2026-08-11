import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { buttonVariants, type ButtonSize, type ButtonVariant } from '@/components/ui/button-variants';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonVariants(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
