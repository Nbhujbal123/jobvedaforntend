import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/constants/routes';
import type { ServiceDefinition } from '@/data/services';

interface ServiceOfferingCardProps {
  service: ServiceDefinition;
}

export function ServiceOfferingCard({ service }: ServiceOfferingCardProps) {
  const detailsPath = `${ROUTES.SERVICES}/${service.slug}`;

  return (
    <Card hoverable className="flex h-full flex-col gap-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
        <service.icon size={22} aria-hidden="true" />
      </span>

      <div>
        <h3 className="text-base font-semibold text-secondary">{service.title}</h3>
        <p className="mt-1.5 text-sm text-muted">{service.description}</p>
      </div>

      <ul className="flex flex-col gap-1.5">
        {service.features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-xs text-secondary/80">
            <Check size={13} className="shrink-0 text-primary" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        to={detailsPath}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        Learn More
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </Card>
  );
}
