import { BookOpen, Eye, Handshake, ShieldCheck, Sparkles, UserCheck, type LucideIcon } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const VALUES: ValueItem[] = [
  { icon: ShieldCheck, title: 'Integrity', description: 'We act honestly and hold ourselves accountable in every interaction.' },
  { icon: Eye, title: 'Transparency', description: 'Clear communication with candidates and employers at every step.' },
  { icon: Sparkles, title: 'Professionalism', description: 'A consistent, high standard of service across every engagement.' },
  { icon: UserCheck, title: 'Candidate First', description: 'Candidate outcomes guide how we shape every placement.' },
  { icon: Handshake, title: 'Employer Partnership', description: 'We work as an extension of your team, not just a vendor.' },
  { icon: BookOpen, title: 'Continuous Learning', description: 'We invest in skill-building for the people we work with.' },
];

export function ValuesSection() {
  return (
    <section className="bg-accent/30 py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow="What Guides Us" title="Our Values" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={(index % 3) * 0.08} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-[var(--shadow-soft)]">
                <value.icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-secondary">{value.title}</h3>
                <p className="mt-1 text-sm text-muted">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
