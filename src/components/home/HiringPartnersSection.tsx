import { Building2 } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { HIRING_PARTNERS } from '@/constants/homeData';

/**
 * Text-based partner marks — swap for real company logos once provided.
 */
export function HiringPartnersSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow="Trusted By" title="Our Hiring Partners" />
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {HIRING_PARTNERS.map((partner, index) => (
            <Reveal
              key={partner.id}
              delay={(index % 6) * 0.05}
              className="flex items-center justify-center gap-2 rounded-2xl border border-secondary/10 px-4 py-6 text-center text-sm font-medium text-secondary/70"
            >
              <Building2 size={16} className="text-primary/50" aria-hidden="true" />
              {partner.name}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
