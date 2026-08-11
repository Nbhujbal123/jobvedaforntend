import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface FloatingBadge {
  icon: LucideIcon;
  value: string;
  label: string;
  position: 'top-left' | 'bottom-right';
  delay?: number;
}

interface HeroVisualCardProps {
  icon: LucideIcon;
  caption: string;
  badges?: FloatingBadge[];
}

const positionClasses: Record<FloatingBadge['position'], string> = {
  'top-left': '-left-6 top-10',
  'bottom-right': '-right-4 bottom-10',
};

/**
 * Decorative hero visual used where no real photography asset exists yet —
 * mirrors HeroSection's composition so every page hero feels consistent.
 */
export function HeroVisualCard({ icon: Icon, caption, badges = [] }: HeroVisualCardProps) {
  return (
    <div className="relative mx-auto aspect-square max-w-md rounded-[16px] bg-white p-8 shadow-[var(--shadow-card)]">
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-accent">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-[var(--shadow-card)]">
          <Icon size={34} aria-hidden="true" />
        </div>
        <p className="px-8 text-center text-sm font-medium text-secondary/70">{caption}</p>
      </div>

      {badges.map((badge) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: badge.position === 'top-left' ? 12 : -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: badge.delay ?? 0.5 }}
          className={`absolute ${positionClasses[badge.position]} flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[var(--shadow-card)]`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
            <badge.icon size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-secondary">{badge.value}</p>
            <p className="text-xs text-muted">{badge.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
