import { Quote } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export function TestimonialCard({ quote, name, role, avatarUrl }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col gap-5">
      <Quote size={28} className="text-primary/40" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-text">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-accent">
          {avatarUrl && <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />}
        </div>
        <div>
          <p className="text-sm font-semibold text-secondary">{name}</p>
          <p className="text-xs text-muted">{role}</p>
        </div>
      </div>
    </Card>
  );
}
