import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Clock, IndianRupee, MonitorPlay, User } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/button-variants';
import { fetchCourseById } from '@/services/courseService';
import { ROUTES } from '@/constants/routes';

export function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: course, isLoading } = useQuery({
    queryKey: ['courses', 'detail', id],
    queryFn: () => fetchCourseById(id as string),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return <LoadingSpinner className="min-h-[50vh]" size={28} />;
  }

  if (!course) {
    return (
      <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-3 py-20 text-center">
        <h1 className="text-2xl font-bold text-secondary">Course not found</h1>
        <p className="text-muted">This program may have been removed or unpublished.</p>
      </Container>
    );
  }

  return (
    <section className="bg-accent/20 py-12 md:py-16">
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-8">
          <Card className="flex flex-col gap-4">
            <Badge variant="neutral" className="w-fit">
              {course.category}
            </Badge>
            <h1 className="text-2xl font-bold text-secondary md:text-3xl">{course.title}</h1>
            {course.shortDescription && <p className="text-muted">{course.shortDescription}</p>}

            <div className="flex flex-wrap gap-4 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={16} aria-hidden="true" />
                {course.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MonitorPlay size={16} aria-hidden="true" />
                {course.mode}
              </span>
              {course.instructor && (
                <span className="inline-flex items-center gap-1.5">
                  <User size={16} aria-hidden="true" />
                  {course.instructor}
                </span>
              )}
              {typeof course.price === 'number' && (
                <span className="inline-flex items-center gap-1.5">
                  <IndianRupee size={16} aria-hidden="true" />
                  {course.price > 0 ? course.price.toLocaleString('en-IN') : 'Free'}
                </span>
              )}
            </div>

            {course.skills && course.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill) => (
                  <Badge key={skill} variant="primary">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </Card>

          {course.description && (
            <Card className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-secondary">About This Program</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-text">{course.description}</p>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-4 text-center">
            <h3 className="font-semibold text-secondary">Interested in this program?</h3>
            <p className="text-sm text-muted">Reach out to our team to know about batch timings and fees.</p>
            <Link to={ROUTES.CONTACT} className={buttonVariants('primary', 'lg')}>
              Enquire Now
            </Link>
          </Card>
        </div>
      </Container>
    </section>
  );
}
