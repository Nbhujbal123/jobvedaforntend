import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Overlay = 'subtle' | 'brand';

interface SectionBackgroundProps extends HTMLAttributes<HTMLElement> {
  image: string;
  overlay?: Overlay;
  position?: string;
  /** Classes for the content wrapper (sits above the overlay) — use this for flex/gap/text-align layout, not `className`. */
  contentClassName?: string;
  children: ReactNode;
}

const overlayClasses: Record<Overlay, string> = {
  // Light, on-brand tint — keeps existing dark text readable, image shows through faintly.
  subtle: 'bg-accent/75',
  // Strong brand-orange tint for CTA banners — pairs with the existing white CTA text.
  brand: 'bg-primary/88',
};

/**
 * Wraps a page section with a `background-image` layer plus a color overlay,
 * so text contrast never depends on the image having loaded. If the image
 * fails to load, the overlay color alone still matches the section's
 * existing look.
 */
export function SectionBackground({
  image,
  overlay = 'subtle',
  position = 'center',
  className,
  contentClassName,
  children,
  ...rest
}: SectionBackgroundProps) {
  return (
    <section
      className={cn('relative bg-cover bg-no-repeat', className)}
      style={{ backgroundImage: `url(${image})`, backgroundPosition: position }}
      {...rest}
    >
      <div className={cn('absolute inset-0', overlayClasses[overlay])} aria-hidden="true" />
      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </section>
  );
}
