import { Award, Compass, HeartHandshake, ShieldCheck, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';
import { Card } from '@/components/ui/Card';

interface ReasonItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const REASONS: ReasonItem[] = [
  { icon: ShieldCheck, title: 'Trusted Opportunities', description: 'Every hiring partner is reviewed before jobs go live on Jobveda.' },
  { icon: Compass, title: 'Professional Guidance', description: 'Personalized advice to help you make confident career decisions.' },
  { icon: Award, title: 'Industry-Focused Recruitment', description: 'Recruiters who understand the skills and demands of each sector.' },
  { icon: Users, title: 'Candidate Support', description: 'Support through resume building, interviews, and profile guidance.' },
  { icon: HeartHandshake, title: 'Employer Support', description: 'Hiring assistance that helps you find and manage the right candidates.' },
  { icon: TrendingUp, title: 'Career Development', description: 'Training programs designed to help you grow beyond your first role.' },
];

export function WhyChooseSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow="Why Jobveda" title="Why Choose Jobveda?" description="What makes our approach to recruitment different." />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={(index % 3) * 0.08}>
              <Card hoverable className="flex h-full flex-col gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                  <reason.icon size={22} aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-secondary">{reason.title}</h3>
                <p className="text-sm text-muted">{reason.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
