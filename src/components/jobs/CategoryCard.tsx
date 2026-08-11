import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface CategoryCardProps {
  icon: LucideIcon;
  name: string;
  openRoles: number;
  onClick?: () => void;
}

export function CategoryCard({ icon: Icon, name, openRoles, onClick }: CategoryCardProps) {
  return (
    <Card
      hoverable
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className="flex flex-col items-center gap-3 py-6 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
        <Icon size={22} aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-semibold text-secondary">{name}</p>
        <p className="text-xs text-muted">{openRoles} open roles</p>
      </div>
    </Card>
  );
}
