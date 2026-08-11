import { Link } from 'react-router-dom';
import { Briefcase, Building2, MapPin, ShieldCheck, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/button-variants';
import { ROUTES } from '@/constants/routes';
import type { Company } from '@/types/company.types';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const detailsPath = ROUTES.COMPANY_DETAILS.replace(':id', company.id);

  return (
    <Card hoverable className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-accent">
          {company.logoUrl ? (
            <img src={company.logoUrl} alt={`${company.name} logo`} className="h-full w-full object-cover" />
          ) : (
            <Building2 size={22} className="text-primary" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-base font-semibold text-secondary">{company.name}</h3>
            {company.isVerified && (
              <ShieldCheck size={16} className="shrink-0 text-emerald-500" aria-hidden="true" />
            )}
          </div>
          {company.industry && <p className="truncate text-sm text-muted">{company.industry}</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
        {company.location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} aria-hidden="true" />
            {company.location}
          </span>
        )}
        {company.companySize && (
          <span className="inline-flex items-center gap-1.5">
            <Users size={14} aria-hidden="true" />
            {company.companySize}
          </span>
        )}
      </div>

      {company.description && <p className="line-clamp-2 text-sm text-muted">{company.description}</p>}

      <div className="mt-auto flex items-center justify-between pt-2">
        <Badge variant="primary">
          <Briefcase size={12} className="mr-1" aria-hidden="true" />
          {company.openJobsCount ?? 0} open job{company.openJobsCount === 1 ? '' : 's'}
        </Badge>
      </div>

      <div className="flex gap-2">
        <Link to={detailsPath} className={buttonVariants('outline', 'sm', 'flex-1 justify-center')}>
          View Company
        </Link>
        <Link
          to={`${ROUTES.JOBS}?companyId=${company.id}`}
          className={buttonVariants('primary', 'sm', 'flex-1 justify-center')}
        >
          View Jobs
        </Link>
      </div>
    </Card>
  );
}
