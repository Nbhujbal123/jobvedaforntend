import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button-variants';
import { Container } from '@/components/common/Container';
import { ROUTES } from '@/constants/routes';

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="text-sm font-semibold uppercase tracking-wide text-primary">404</span>
      <h1 className="text-3xl font-bold text-secondary md:text-4xl">Page not found</h1>
      <p className="max-w-md text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to={ROUTES.HOME} className={buttonVariants('primary', 'md')}>
        Back to Home
      </Link>
    </Container>
  );
}
