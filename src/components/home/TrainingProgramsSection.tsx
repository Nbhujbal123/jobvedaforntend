import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { CourseCard } from '@/components/training/CourseCard';
import { buttonVariants } from '@/components/ui/button-variants';
import { TRAINING_PROGRAMS } from '@/constants/homeData';
import { ROUTES } from '@/constants/routes';

export function TrainingProgramsSection() {
  return (
    <section className="bg-accent/40 py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Upskill With Us"
            title="Training Programs"
            description="Industry-aligned courses designed to make you job-ready, faster."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINING_PROGRAMS.map((course, index) => (
            <Reveal key={course.id} delay={(index % 4) * 0.08}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center">
          <Link to={ROUTES.TRAINING} className={buttonVariants('primary', 'md')}>
            Explore All Programs
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
