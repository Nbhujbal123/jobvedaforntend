import {
  ClipboardCheck,
  FileSearch,
  Mic,
  Send,
  Trophy,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';

interface ProcessStep {
  step: string;
  icon: LucideIcon;
  title: string;
}

const STEPS: ProcessStep[] = [
  { step: '01', icon: UserPlus, title: 'Register' },
  { step: '02', icon: ClipboardCheck, title: 'Complete Your Profile' },
  { step: '03', icon: FileSearch, title: 'Explore Opportunities' },
  { step: '04', icon: Send, title: 'Apply' },
  { step: '05', icon: Mic, title: 'Interview' },
  { step: '06', icon: Trophy, title: 'Get Hired' },
];

export function ProcessSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow="How It Works" title="Our Process" description="A simple path from registration to getting hired." />
        </Reveal>

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
          <div className="absolute left-6 top-6 bottom-6 hidden w-px bg-secondary/10 lg:left-0 lg:right-0 lg:top-8 lg:h-px lg:w-auto lg:bg-secondary/10" />

          {STEPS.map((item, index) => (
            <Reveal
              key={item.step}
              delay={index * 0.08}
              className="relative flex flex-1 flex-row items-start gap-4 lg:flex-col lg:items-center lg:text-center"
            >
              <div className="relative z-10 flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-white text-primary shadow-[var(--shadow-card)]">
                <item.icon size={22} aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold text-primary">{item.step}</span>
                <h3 className="text-sm font-semibold text-secondary">{item.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
