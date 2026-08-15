import { type FormEvent, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, SearchX, X } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { JobCard } from '@/components/jobs/JobCard';
import { Pagination } from '@/components/common/Pagination';
import { fetchJobs } from '@/services/jobService';
import { fetchCompanyById } from '@/services/companyService';
import { ROUTES } from '@/constants/routes';
import {
  EXPERIENCE_OPTIONS,
  EXPERIENCE_RANGES,
  JOB_CATEGORY_OPTIONS,
  JOB_TYPE_OPTIONS,
  WORK_MODE_OPTIONS,
} from '@/constants/jobOptions';
import type { ExperienceLevel } from '@/types/job.types';

export function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') ?? '');
  const [location, setLocation] = useState(searchParams.get('location') ?? '');

  const experience = searchParams.get('experience') ?? '';
  const jobType = searchParams.get('type') ?? '';
  const workMode = searchParams.get('mode') ?? '';
  const category = searchParams.get('category') ?? '';
  const companyId = searchParams.get('companyId') ?? '';
  const page = Number(searchParams.get('page') ?? '1');

  const experienceRange = experience
    ? EXPERIENCE_RANGES[experience as ExperienceLevel]
    : undefined;

  const queryParams = useMemo(
    () => ({
      page,
      keyword: searchParams.get('keyword') || undefined,
      location: searchParams.get('location') || undefined,
      jobType: jobType || undefined,
      workMode: workMode || undefined,
      category: category || undefined,
      companyId: companyId || undefined,
      minExperience: experienceRange?.min,
      maxExperience: experienceRange?.max,
    }),
    [page, searchParams, jobType, workMode, category, companyId, experienceRange],
  );

  const { data: filteredCompany } = useQuery({
    queryKey: ['companies', 'detail', companyId],
    queryFn: () => fetchCompanyById(companyId),
    enabled: Boolean(companyId),
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs', 'list', queryParams],
    queryFn: () => fetchJobs(queryParams),
  });

  console.log("jobs data" , data);
  const updateParam = (key: string, value: string) => {

    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page');
    setSearchParams(next);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (keyword) next.set('keyword', keyword);
    else next.delete('keyword');
    if (location) next.set('location', location);
    else next.delete('location');
    next.delete('page');
    setSearchParams(next);
  };

  const setPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  return (
    <section className="bg-accent/20 py-12 md:py-16">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          align="left"
          eyebrow="Careers"
          title="Browse Jobs"
          description="Search and filter open roles from verified employers."
        />

        {companyId && filteredCompany && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">Showing jobs at</span>
            <Badge variant="primary">{filteredCompany.name}</Badge>
            <Link
              to={ROUTES.JOBS}
              className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-primary"
            >
              <X size={14} aria-hidden="true" />
              Clear
            </Link>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-3 rounded-[16px] border border-secondary/10 bg-white p-4 shadow-[var(--shadow-card)] sm:p-5 md:grid-cols-[1.3fr_1fr_auto]"
        >
          <Input
            label="Keyword"
            placeholder="Job title, skill, or company"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <Input
            label="Location"
            placeholder="City or remote"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <Button type="submit" className="w-full md:w-auto md:self-end">
            <Search size={16} aria-hidden="true" />
            Search
          </Button>
        </form>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Select
            placeholder="Any category"
            options={JOB_CATEGORY_OPTIONS}
            value={category}
            onChange={(event) => updateParam('category', event.target.value)}
          />
          <Select
            placeholder="Any experience"
            options={EXPERIENCE_OPTIONS}
            value={experience}
            onChange={(event) => updateParam('experience', event.target.value)}
          />
          <Select
            placeholder="Any job type"
            options={JOB_TYPE_OPTIONS}
            value={jobType}
            onChange={(event) => updateParam('type', event.target.value)}
          />
          <Select
            placeholder="Any work mode"
            options={WORK_MODE_OPTIONS}
            value={workMode}
            onChange={(event) => updateParam('mode', event.target.value)}
          />
        </div>

        {isLoading && <LoadingSpinner className="py-20" size={28} label="Loading jobs" />}

        {isError && (
          <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
            <SearchX size={28} aria-hidden="true" />
            <p>Could not load jobs right now. Please try again shortly.</p>
          </div>
        )}

        {!isLoading && !isError && data && (
          <>
            {data.data.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
                <SearchX size={28} aria-hidden="true" />
                <p>No jobs match your filters yet. Try broadening your search.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted">{data.totalResults} jobs found</p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.data.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
              </>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
