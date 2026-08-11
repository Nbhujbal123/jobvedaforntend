import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { WHY_CHOOSE_US } from '@/constants/homeData';

export function WhyChooseUsSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Why Jobveda"
            title="Why Choose Us"
            description="A recruitment partner invested in your long-term career and hiring success."
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 3) * 0.08}
              className="flex items-start gap-4 rounded-[16px] border border-secondary/10 p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <item.icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-secondary">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
