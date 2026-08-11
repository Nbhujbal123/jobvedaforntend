import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Reveal } from '@/components/common/Reveal';
import { useCountUp } from '@/hooks/useCountUp';
import { DEMO_STATS } from '@/constants/site';

function parseTarget(value: string) {
  return Number(value.replace(/[^0-9]/g, ''));
}

function formatValue(value: number, original: string) {
  const suffix = original.replace(/[0-9,]/g, '');
  return `${value.toLocaleString('en-IN')}${suffix}`;
}

interface StatItemProps {
  value: string;
  label: string;
  active: boolean;
  delay: number;
}

function StatItem({ value, label, active, delay }: StatItemProps) {
  const count = useCountUp(parseTarget(value), { start: active });

  return (
    <Reveal delay={delay} className="flex flex-col items-center gap-1 text-center">
      <span className="text-3xl font-bold text-primary md:text-4xl">{formatValue(count, value)}</span>
      <span className="text-sm text-white/70">{label}</span>
    </Reveal>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-secondary py-14 md:py-16">
      <Container ref={ref} className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {DEMO_STATS.map((stat, index) => (
          <StatItem key={stat.label} value={stat.value} label={stat.label} active={isInView} delay={index * 0.1} />
        ))}
      </Container>
    </section>
  );
}
