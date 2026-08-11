import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchX } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Pagination } from '@/components/common/Pagination';
import { Select } from '@/components/ui/Select';
import { CourseCard } from '@/components/training/CourseCard';
import { fetchCourses } from '@/services/courseService';
import { JOB_CATEGORY_OPTIONS } from '@/constants/jobOptions';
import { ROUTES } from '@/constants/routes';

export function TrainingPage() {
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['courses', 'list', { category, page }],
    queryFn: () => fetchCourses({ category: category || undefined, page }),
  });

  return (
    <section className="bg-accent/20 py-12 md:py-16">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          align="left"
          eyebrow="Upskill With Us"
          title="Training Programs"
          description="Industry-aligned courses designed to make you job-ready, faster."
        />

        <div className="max-w-xs">
          <Select
            placeholder="All categories"
            options={JOB_CATEGORY_OPTIONS}
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
          />
        </div>

        {isLoading && <LoadingSpinner className="py-20" size={28} label="Loading courses" />}

        {isError && (
          <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
            <SearchX size={28} aria-hidden="true" />
            <p>Could not load training programs right now. Please try again shortly.</p>
          </div>
        )}

        {!isLoading && !isError && data && (
          <>
            {data.data.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
                <SearchX size={28} aria-hidden="true" />
                <p>No training programs are published yet. Check back soon.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {data.data.map((course) => (
                    <Link key={course.id} to={ROUTES.COURSE_DETAILS.replace(':id', course.id)}>
                      <CourseCard course={course} />
                    </Link>
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
