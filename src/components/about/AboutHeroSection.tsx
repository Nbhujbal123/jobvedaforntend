import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Target, Users2 } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Reveal } from '@/components/common/Reveal';
import { HeroVisualCard } from '@/components/common/HeroVisualCard';
import { buttonVariants } from '@/components/ui/button-variants';
import { ROUTES } from '@/constants/routes';

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-accent/50 pt-10 pb-20 md:pt-14 md:pb-24">
      <Container className="flex flex-col gap-8">
        <Breadcrumb items={[{ label: 'About' }]} />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-[var(--shadow-soft)]">
              About Jobveda
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-secondary sm:text-5xl">
              Connecting Talent With Opportunity
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted md:text-lg">
              At Jobveda, we help talented professionals build meaningful careers while helping
              businesses find the right people to grow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to={ROUTES.JOBS} className={buttonVariants('primary', 'lg')}>
                Explore Jobs
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to={ROUTES.CONTACT} className={buttonVariants('outline', 'lg')}>
                <MessageSquare size={18} aria-hidden="true" />
                Contact Us
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <HeroVisualCard
              icon={Users2}
              caption="A team dedicated to matching the right talent with the right opportunity"
              badges={[
                { icon: Target, value: 'Our Mission', label: 'Career-first recruitment', position: 'top-left' },
              ]}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
