import { Container } from '@/components/common/Container';

interface PagePlaceholderProps {
  title: string;
  description?: string;
}

/**
 * Temporary scaffold for routes that are wired up but not yet designed.
 * Each page file renders this until its real content is built.
 */
export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-3 py-20 text-center">
      <span className="text-sm font-semibold uppercase tracking-wide text-primary">Jobveda</span>
      <h1 className="text-3xl font-bold text-secondary md:text-4xl">{title}</h1>
      {description && <p className="max-w-lg text-muted">{description}</p>}
    </Container>
  );
}
