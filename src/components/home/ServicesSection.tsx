import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { ServiceCard } from '@/components/services/ServiceCard';
import { SERVICES } from '@/constants/homeData';

export function ServicesSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="What We Offer"
            title="Our Services"
            description="End-to-end recruitment, staffing, and career support built around your goals."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={(index % 4) * 0.08}>
              <ServiceCard icon={service.icon} title={service.title} description={service.description} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
