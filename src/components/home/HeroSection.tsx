import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, TrendingUp, UploadCloud, Users } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Reveal } from '@/components/common/Reveal';
import { buttonVariants } from '@/components/ui/button-variants';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';

export function HeroSection() {
  const [firstLine, secondLine] = SITE.tagline.split('. ');

  return (
    <section className="relative overflow-hidden bg-accent/50 pt-14 pb-24 md:pt-20 md:pb-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-[var(--shadow-soft)]">
            Recruitment · Placement · Training
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-secondary sm:text-5xl md:text-6xl">
            {firstLine}.
            <br />
            <span className="text-primary">{secondLine}</span>
          </h1>

          <p className="mt-5 max-w-lg text-base text-muted md:text-lg">{SITE.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to={ROUTES.JOBS} className={buttonVariants('primary', 'lg')}>
              Find Jobs
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to={ROUTES.CANDIDATE_RESUME} className={buttonVariants('outline', 'lg')}>
              <UploadCloud size={18} aria-hidden="true" />
              Upload Resume
            </Link>
            <Link to={ROUTES.REGISTER} className={buttonVariants('ghost', 'lg')}>
              Hire Talent
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          {/* Placeholder visual composition — swap for real recruitment photography when available */}
          <div className="relative mx-auto aspect-square max-w-md rounded-[16px] bg-white p-8 shadow-[var(--shadow-card)]">
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-accent">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-[var(--shadow-card)]">
                <Briefcase size={34} aria-hidden="true" />
              </div>
              <p className="px-8 text-center text-sm font-medium text-secondary/70">
                Matching great talent with the right opportunities
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -left-6 top-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[var(--shadow-card)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
                <Users size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-secondary">500+</p>
                <p className="text-xs text-muted">Companies</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="absolute -right-4 bottom-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[var(--shadow-card)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
                <TrendingUp size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-secondary">8,000+</p>
                <p className="text-xs text-muted">Placements</p>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
