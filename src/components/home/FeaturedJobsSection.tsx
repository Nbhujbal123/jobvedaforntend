import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { JobCard } from '@/components/jobs/JobCard';
import { buttonVariants } from '@/components/ui/button-variants';
import { fetchJobs } from '@/services/jobService';
import { ROUTES } from '@/constants/routes';

export function FeaturedJobsSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs', 'featured'],
    queryFn: () => fetchJobs({ limit: 6, sort: '-postedAt' }),
  });

  return (
    <section className="bg-background py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <SectionHeading
            align="left"
            eyebrow="Latest Openings"
            title="Featured Jobs"
            description="A snapshot of active roles from verified hiring partners."
            className="items-center text-center sm:items-start sm:text-left"
          />
          <Link to={ROUTES.JOBS} className={buttonVariants('outline', 'md')}>
            View All Jobs
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>

        {isLoading && <LoadingSpinner className="py-10" size={28} label="Loading jobs" />}

        {isError && (
          <p className="py-10 text-center text-muted">Could not load jobs right now. Please try again shortly.</p>
        )}

        {!isLoading && !isError && data && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((job, index) => (
              <Reveal key={job.id} delay={(index % 3) * 0.08}>
                <JobCard job={job} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
