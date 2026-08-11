import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Reveal } from '@/components/common/Reveal';
import { HeroVisualCard } from '@/components/common/HeroVisualCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/button-variants';
import { ServiceOfferingCard } from '@/components/services/ServiceOfferingCard';
import { getRelatedServices, getServiceBySlug } from '@/data/services';
import { ROUTES } from '@/constants/routes';
import { usePageMeta } from '@/hooks/usePageMeta';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);

  usePageMeta(service?.title ?? 'Services', service?.description);

  if (!service) {
    return <Navigate to={ROUTES.SERVICES} replace />;
  }

  const related = getRelatedServices(service.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-accent/50 pt-10 pb-20 md:pt-14 md:pb-24">
        <Container className="flex flex-col gap-8">
          <Breadcrumb items={[{ label: 'Services', path: ROUTES.SERVICES }, { label: service.title }]} />

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-[var(--shadow-soft)]">
                <service.icon size={14} aria-hidden="true" />
                {service.title}
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-secondary sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-lg text-base text-muted md:text-lg">{service.description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to={service.ctaTarget} className={buttonVariants('primary', 'lg')}>
                  {service.ctaLabel}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to={ROUTES.SERVICES} className={buttonVariants('outline', 'lg')}>
                  All Services
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <HeroVisualCard icon={service.icon} caption={service.title} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-background py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-8">
            <Reveal>
              <Card className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-secondary">What We Provide</h2>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-text">
                      <Check size={16} className="shrink-0 text-primary" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            <Reveal delay={0.05}>
              <Card className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-secondary">Benefits</h2>
                <ul className="flex flex-col gap-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2.5 text-sm text-text">
                      <Check size={16} className="shrink-0 text-primary" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            {service.programs && (
              <Reveal delay={0.1}>
                <Card className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold text-secondary">Example Training Programs</h2>
                  <div className="flex flex-wrap gap-2">
                    {service.programs.map((program) => (
                      <Badge key={program} variant="neutral">
                        {program}
                      </Badge>
                    ))}
                  </div>
                  <Link to={ROUTES.TRAINING} className="w-fit text-sm font-semibold text-primary hover:underline">
                    View all training programs →
                  </Link>
                </Card>
              </Reveal>
            )}

            <Reveal delay={0.15}>
              <Card className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold text-secondary">How It Works</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {service.howItWorks.map((step, index) => (
                    <div key={step.title} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-secondary">{step.title}</h3>
                        <p className="mt-1 text-sm text-muted">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Card className="flex h-fit flex-col gap-4 text-center lg:sticky lg:top-24">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
                <service.icon size={26} aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-secondary">Ready to get started?</h3>
              <p className="text-sm text-muted">Reach out and our team will guide you through the next step.</p>
              <Link to={service.ctaTarget} className={buttonVariants('primary', 'md', 'w-full justify-center')}>
                {service.ctaLabel}
              </Link>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* Related services */}
      <section className="bg-accent/30 py-16 md:py-20">
        <Container className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-secondary">Related Services</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedService) => (
              <ServiceOfferingCard key={relatedService.slug} service={relatedService} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
