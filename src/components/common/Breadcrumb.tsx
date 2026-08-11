import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
      <Link to={ROUTES.HOME} className="hover:text-primary">
        Home
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight size={14} aria-hidden="true" />
          {item.path ? (
            <Link to={item.path} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-secondary" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
