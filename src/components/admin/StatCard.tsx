import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
        <Icon size={22} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-secondary">{value}</p>
        <p className="truncate text-sm text-muted">{label}</p>
      </div>
    </Card>
  );
}
