import { useQuery } from '@tanstack/react-query';
import { SearchX } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { fetchTestimonials } from '@/services/testimonialService';

export function TestimonialsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['testimonials', 'list'],
    queryFn: () => fetchTestimonials(1, 50),
  });

  return (
    <section className="bg-accent/20 py-12 md:py-16">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          align="left"
          eyebrow="Success Stories"
          title="What People Say About Us"
          description="Feedback from candidates and employers who have worked with Jobveda."
        />

        {isLoading && <LoadingSpinner className="py-20" size={28} label="Loading testimonials" />}

        {isError && (
          <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
            <SearchX size={28} aria-hidden="true" />
            <p>Could not load testimonials right now. Please try again shortly.</p>
          </div>
        )}

        {!isLoading && !isError && data && (
          <>
            {data.data.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
                <SearchX size={28} aria-hidden="true" />
                <p>No testimonials published yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {data.data.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    quote={testimonial.message}
                    name={testimonial.name}
                    role={[testimonial.role, testimonial.company].filter(Boolean).join(', ')}
                    avatarUrl={testimonial.imageUrl}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
