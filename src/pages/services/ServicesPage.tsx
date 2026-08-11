import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { HeroVisualCard } from '@/components/common/HeroVisualCard';
import { buttonVariants } from '@/components/ui/button-variants';
import { ServiceOfferingCard } from '@/components/services/ServiceOfferingCard';
import { SERVICES } from '@/data/services';
import { ROUTES } from '@/constants/routes';
import { usePageMeta } from '@/hooks/usePageMeta';

export function ServicesPage() {
  usePageMeta(
    'Services',
    'Recruitment and career services from Jobveda — job placement, staffing, corporate recruitment, career counselling, and training.',
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-accent/50 pt-10 pb-20 md:pt-14 md:pb-24">
        <Container className="flex flex-col gap-8">
          <Breadcrumb items={[{ label: 'Services' }]} />

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-[var(--shadow-soft)]">
                Our Services
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-secondary sm:text-5xl">
                Solutions That Help Careers &amp; Businesses Grow
              </h1>
              <p className="mt-5 max-w-lg text-base text-muted md:text-lg">
                From finding the right opportunity to building the right team, Jobveda provides
                recruitment and career support for candidates and employers.
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
                icon={Sparkles}
                caption="Recruitment and career support, end to end"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Services grid */}
      <section className="bg-background py-16 md:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="Our Services"
              title="What We Offer"
              description="Explore how Jobveda supports candidates and employers at every stage."
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.07 }}
              >
                <ServiceOfferingCard service={service} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-accent/30 py-16 md:py-20">
        <Container>
          <Reveal className="flex flex-col items-center gap-6 rounded-[16px] bg-primary px-6 py-14 text-center text-white sm:px-16">
            <h2 className="max-w-xl text-3xl font-bold md:text-4xl">
              Not sure which service is right for you?
            </h2>
            <p className="max-w-lg text-white/85">
              Talk to our team and we'll help you find the right starting point.
            </p>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-base font-semibold text-primary transition-colors duration-200 hover:bg-white/90"
            >
              Contact Us
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
