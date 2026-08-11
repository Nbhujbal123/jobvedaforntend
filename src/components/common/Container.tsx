import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn('mx-auto w-full max-w-[1280px] px-5 md:px-8', className)} {...rest}>
        {children}
      </div>
    );
  },
);

Container.displayName = 'Container';
