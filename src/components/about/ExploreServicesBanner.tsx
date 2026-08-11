import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Reveal } from '@/components/common/Reveal';
import { ROUTES } from '@/constants/routes';

/**
 * Small pointer to the dedicated Services page — About must not duplicate
 * the full services list, just link out to it.
 */
export function ExploreServicesBanner() {
  return (
    <section className="bg-background py-10 md:py-12">
      <Container>
        <Reveal className="flex flex-col items-center justify-between gap-4 rounded-[16px] border border-secondary/10 bg-accent/40 px-6 py-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-[var(--shadow-soft)]">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <p className="text-sm font-medium text-secondary">
              Want to see everything Jobveda offers, from staffing to training?
            </p>
          </div>
          <Link
            to={ROUTES.SERVICES}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Explore Our Services
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
