import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <Card hoverable className="flex h-full flex-col gap-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
        <Icon size={22} aria-hidden="true" />
      </span>
      <h3 className="text-base font-semibold text-secondary">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </Card>
  );
}
