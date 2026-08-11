import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

export function Card({ children, hoverable = false, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[16px] border border-secondary/10 bg-white p-6 shadow-[var(--shadow-soft)] transition-shadow duration-200',
        hoverable && 'hover:shadow-[var(--shadow-card)]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
