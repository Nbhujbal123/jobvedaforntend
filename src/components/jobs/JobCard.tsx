import { Briefcase, MapPin, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/button-variants';
import { formatExperienceRange, formatSalaryRange } from '@/utils/format';
import { ROUTES } from '@/constants/routes';
import type { Job } from '@/types/job.types';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const detailsPath = ROUTES.JOB_DETAILS.replace(':id', job.id);

  return (
    <Card hoverable className="flex flex-col gap-4">
      <Link to={detailsPath} className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-accent">
          {job.companyLogoUrl ? (
            <img
              src={job.companyLogoUrl}
              alt={`${job.companyName} logo`}
              className="h-full w-full object-cover"
            />
          ) : (
            <Briefcase size={20} className="text-primary" aria-hidden="true" />
          )}
        </div>
        <div>
          <h3 className="text-base font-semibold text-secondary">{job.title}</h3>
          <p className="text-sm text-muted">{job.companyName}</p>
        </div>
      </Link>

      <div className="flex flex-wrap gap-2 text-sm text-muted">
        <span className="inline-flex items-center gap-1">
          <MapPin size={14} aria-hidden="true" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Wallet size={14} aria-hidden="true" />
          {formatSalaryRange(job.salaryMin, job.salaryMax)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="primary">{job.jobType}</Badge>
        <Badge variant="neutral">
          {formatExperienceRange(job.experienceMin, job.experienceMax) ?? job.experienceLevel}
        </Badge>
      </div>

      <Link to={detailsPath} className={buttonVariants('primary', 'sm', 'mt-2 w-full justify-center')}>
        View Details
      </Link>
    </Card>
  );
}
