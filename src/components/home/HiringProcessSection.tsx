import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { HIRING_PROCESS_STEPS } from '@/constants/homeData';

export function HiringProcessSection() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="Our Hiring Process"
            description="A simple, transparent path from registration to your first day on the job."
            className="[&_h2]:text-white [&_p]:text-white/70"
          />
        </Reveal>

        <div className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-white/10 lg:block"
          />
          {HIRING_PROCESS_STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08} className="relative flex flex-col items-center gap-3 text-center">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-[var(--shadow-card)]">
                <step.icon size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  {index + 1}. {step.title}
                </p>
                <p className="mt-1 text-xs text-white/60">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
