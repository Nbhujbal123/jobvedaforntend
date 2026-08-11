import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { TESTIMONIALS } from '@/constants/homeData';

export function TestimonialsSection() {
  return (
    <section className="bg-accent/40 py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Success Stories"
            title="What People Say About Us"
            description="Feedback from candidates and employers who have worked with Jobveda."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.1}>
              <TestimonialCard quote={testimonial.quote} name={testimonial.name} role={testimonial.role} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
