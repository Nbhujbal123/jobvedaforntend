import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Briefcase,
  Building2,
  Globe,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { EmptyState } from '@/components/common/EmptyState';
import { Reveal } from '@/components/common/Reveal';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { buttonVariants } from '@/components/ui/button-variants';
import { fetchCompanyById } from '@/services/companyService';
import { fetchJobs } from '@/services/jobService';
import { formatExperienceRange, formatSalaryRange } from '@/utils/format';
import { ROUTES } from '@/constants/routes';
import { usePageMeta } from '@/hooks/usePageMeta';

function CompanyDetailsSkeleton() {
  return (
    <section className="bg-accent/20 py-12 md:py-16">
      <Container className="flex animate-pulse flex-col gap-8">
        <div className="h-4 w-48 rounded bg-secondary/10" />
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <div className="h-40 rounded-[16px] bg-white shadow-[var(--shadow-soft)]" />
            <div className="h-64 rounded-[16px] bg-white shadow-[var(--shadow-soft)]" />
          </div>
          <div className="h-72 rounded-[16px] bg-white shadow-[var(--shadow-soft)]" />
        </div>
      </Container>
    </section>
  );
}

export function CompanyDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: company,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['companies', 'detail', id],
    queryFn: () => fetchCompanyById(id as string),
    enabled: Boolean(id),
    retry: false,
  });

  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['jobs', 'by-company', id],
    queryFn: () => fetchJobs({ companyId: id, limit: 20 }),
    enabled: Boolean(id),
  });

  usePageMeta(
    company ? company.name : 'Company',
    company?.description ?? 'View company profile and open positions on Jobveda.',
  );

  if (isLoading) {
    return <CompanyDetailsSkeleton />;
  }

  if (isError || !company) {
    return (
      <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <Building2 size={32} className="text-primary" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-secondary">Company not found</h1>
        <p className="max-w-sm text-muted">
          This company profile may have been removed, or the link is incorrect.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => refetch()}>
            <RotateCcw size={14} aria-hidden="true" />
            Retry
          </Button>
          <Link to={ROUTES.COMPANIES} className={buttonVariants('primary', 'md')}>
            Back to Companies
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <section className="bg-accent/20 py-12 md:py-16">
      <Container className="flex flex-col gap-8">
        <Breadcrumb items={[{ label: 'Companies', path: ROUTES.COMPANIES }, { label: company.name }]} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-8">
            <Reveal>
              <Card className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-accent">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={`${company.name} logo`} className="h-full w-full object-cover" />
                    ) : (
                      <Building2 size={32} className="text-primary" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-bold text-secondary md:text-3xl">{company.name}</h1>
                      {company.isVerified && (
                        <Badge variant="success">
                          <ShieldCheck size={12} aria-hidden="true" className="mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    {company.industry && <p className="text-muted">{company.industry}</p>}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted">
                  {company.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={16} aria-hidden="true" />
                      {company.location}
                    </span>
                  )}
                  {company.companySize && (
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={16} aria-hidden="true" />
                      {company.companySize}
                    </span>
                  )}
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                    >
                      <Globe size={16} aria-hidden="true" />
                      Visit website
                    </a>
                  )}
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.05}>
              <Card className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-secondary">About {company.name}</h2>
                {company.description ? (
                  <p className="whitespace-pre-line text-sm leading-relaxed text-text">{company.description}</p>
                ) : (
                  <p className="text-sm text-muted">This company hasn't added a description yet.</p>
                )}
              </Card>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-secondary">
                Open Positions {jobs ? `(${jobs.totalResults})` : ''}
              </h2>

              {jobsLoading && (
                <div className="flex flex-col gap-3">
                  {[0, 1, 2].map((key) => (
                    <div key={key} className="h-20 animate-pulse rounded-[16px] bg-white shadow-[var(--shadow-soft)]" />
                  ))}
                </div>
              )}

              {!jobsLoading && (!jobs || jobs.data.length === 0) && (
                <EmptyState icon={Briefcase} title="No open positions available at this time." />
              )}

              {!jobsLoading && jobs && jobs.data.length > 0 && (
                <div className="flex flex-col gap-3">
                  {jobs.data.map((job) => (
                    <Card key={job.id} hoverable className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-secondary">{job.title}</h3>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={14} aria-hidden="true" />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Wallet size={14} aria-hidden="true" />
                            {formatSalaryRange(job.salaryMin, job.salaryMax)}
                          </span>
                          {formatExperienceRange(job.experienceMin, job.experienceMax) && (
                            <span className="inline-flex items-center gap-1.5">
                              <Briefcase size={14} aria-hidden="true" />
                              {formatExperienceRange(job.experienceMin, job.experienceMax)}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        to={ROUTES.JOB_DETAILS.replace(':id', job.id)}
                        className={buttonVariants('outline', 'sm', 'shrink-0 justify-center')}
                      >
                        View Job
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          {/* Sidebar */}
          <Reveal delay={0.1}>
            <Card className="flex h-fit flex-col gap-4 lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Company Information</h2>
              <dl className="flex flex-col divide-y divide-secondary/10">
                <InfoRow icon={Building2} label="Company" value={company.name} />
                {company.industry && <InfoRow icon={Briefcase} label="Industry" value={company.industry} />}
                {company.companySize && <InfoRow icon={Users} label="Company Size" value={company.companySize} />}
                {company.location && <InfoRow icon={MapPin} label="Location" value={company.location} />}
                {company.website && (
                  <InfoRow
                    icon={Globe}
                    label="Website"
                    value={
                      <a href={company.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                        {company.website.replace(/^https?:\/\//, '')}
                      </a>
                    }
                  />
                )}
                <InfoRow icon={Briefcase} label="Open Positions" value={String(company.openJobsCount ?? 0)} />
              </dl>

              <Link to={`${ROUTES.JOBS}?companyId=${company.id}`} className={buttonVariants('primary', 'md', 'w-full justify-center')}>
                View All Jobs
              </Link>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 py-3 text-sm">
      <dt className="inline-flex items-center gap-2 text-muted">
        <Icon size={15} aria-hidden="true" />
        {label}
      </dt>
      <dd className="text-right font-medium text-secondary">{value}</dd>
    </div>
  );
}
