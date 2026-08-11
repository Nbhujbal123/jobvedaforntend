import { type LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
}

export function EmptyState({ icon: Icon = Inbox, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[16px] border border-dashed border-secondary/15 bg-accent/40 px-6 py-16 text-center">
      <Icon size={32} className="text-primary" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
    </div>
  );
}
