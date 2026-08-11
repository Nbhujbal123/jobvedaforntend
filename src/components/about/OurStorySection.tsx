import { Compass, Eye, Sparkles } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Reveal } from '@/components/common/Reveal';
import { Card } from '@/components/ui/Card';

export function OurStorySection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal className="flex flex-col gap-5">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">Our Story</span>
          <h2 className="text-3xl font-bold text-secondary md:text-4xl">Who We Are</h2>
          <p className="max-w-3xl text-base leading-relaxed text-muted">
            Jobveda is a recruitment consultancy focused on connecting candidates with employers. We work
            closely with both sides of the hiring process — helping candidates discover the right
            opportunities, improve their careers, prepare for interviews, and build professional
            profiles, while helping employers find qualified candidates, reduce hiring time, build
            strong teams, and manage recruitment efficiently.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Card className="flex h-full flex-col gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                <Compass size={22} aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-secondary">Our Mission</h3>
              <p className="text-sm leading-relaxed text-muted">
                To make career opportunities more accessible and recruitment more effective by
                connecting the right talent with the right organizations.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="flex h-full flex-col gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                <Eye size={22} aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-secondary">Our Vision</h3>
              <p className="text-sm leading-relaxed text-muted">
                To become a trusted career and recruitment platform connecting talented professionals
                and growing businesses across industries.
              </p>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <Card className="flex flex-col gap-3 border-primary/20 bg-accent/40 sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <Sparkles size={22} aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-secondary/80">
              Whether you're a candidate looking for your next role or an employer looking to build
              your team, Jobveda is built to support that journey end-to-end.
            </p>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
