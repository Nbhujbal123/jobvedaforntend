import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Container } from '@/components/common/Container';
import { Reveal } from '@/components/common/Reveal';
import { useCountUp } from '@/hooks/useCountUp';
import { fetchJobs } from '@/services/jobService';
import { fetchCompanies } from '@/services/companyService';
import { fetchCourses } from '@/services/courseService';
import { fetchTestimonials } from '@/services/testimonialService';

interface StatItemProps {
  value: number;
  label: string;
  active: boolean;
  delay: number;
}

function StatItem({ value, label, active, delay }: StatItemProps) {
  const count = useCountUp(value, { start: active });

  return (
    <Reveal delay={delay} className="flex flex-col items-center gap-1 text-center">
      <span className="text-3xl font-bold text-primary md:text-4xl">{count.toLocaleString('en-IN')}+</span>
      <span className="text-sm text-white/70">{label}</span>
    </Reveal>
  );
}

/**
 * Live counts pulled from the API rather than fixed marketing numbers —
 * this page should never claim unverified business statistics.
 */
export function AboutStatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { data: jobs } = useQuery({ queryKey: ['stats', 'jobs'], queryFn: () => fetchJobs({ limit: 1 }) });
  const { data: companies } = useQuery({ queryKey: ['stats', 'companies'], queryFn: () => fetchCompanies({ limit: 1 }) });
  const { data: courses } = useQuery({ queryKey: ['stats', 'courses'], queryFn: () => fetchCourses({ limit: 1 }) });
  const { data: testimonials } = useQuery({ queryKey: ['stats', 'testimonials'], queryFn: () => fetchTestimonials(1, 1) });

  const stats = [
    { label: 'Career Opportunities', value: jobs?.totalResults ?? 0 },
    { label: 'Trusted Employers', value: companies?.totalResults ?? 0 },
    { label: 'Training Programs', value: courses?.totalResults ?? 0 },
    { label: 'Success Stories', value: testimonials?.totalResults ?? 0 },
  ];

  return (
    <section className="bg-secondary py-14 md:py-16">
      <Container ref={ref} className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <StatItem key={stat.label} value={stat.value} label={stat.label} active={isInView} delay={index * 0.1} />
        ))}
      </Container>
    </section>
  );
}
