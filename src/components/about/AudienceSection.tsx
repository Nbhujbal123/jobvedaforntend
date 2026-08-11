import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Reveal } from '@/components/common/Reveal';
import { Card } from '@/components/ui/Card';
import { buttonVariants } from '@/components/ui/button-variants';
import { ROUTES } from '@/constants/routes';

const CANDIDATE_POINTS = [
  'Find relevant jobs',
  'Create your professional profile',
  'Upload your resume',
  'Apply to opportunities',
  'Track applications',
  'Prepare for interviews',
];

const EMPLOYER_POINTS = [
  'Post jobs',
  'Reach qualified candidates',
  'Manage applicants',
  'Shortlist candidates',
  'Build your team',
];

export function AudienceSection() {
  return (
    <section className="bg-accent/30 py-16 md:py-24">
      <Container className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal>
          <Card className="flex h-full flex-col gap-5">
            <h2 className="text-2xl font-bold text-secondary">Build Your Career With Jobveda</h2>
            <ul className="flex flex-col gap-3">
              {CANDIDATE_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-text">
                  <Check size={16} className="shrink-0 text-primary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <Link to={ROUTES.JOBS} className={`${buttonVariants('primary', 'md')} mt-2 w-fit`}>
              Find Jobs
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="flex h-full flex-col gap-5">
            <h2 className="text-2xl font-bold text-secondary">Find The Right Talent</h2>
            <ul className="flex flex-col gap-3">
              {EMPLOYER_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-text">
                  <Check size={16} className="shrink-0 text-primary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <Link to={ROUTES.REGISTER} className={`${buttonVariants('outline', 'md')} mt-2 w-fit`}>
              Hire Talent
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
