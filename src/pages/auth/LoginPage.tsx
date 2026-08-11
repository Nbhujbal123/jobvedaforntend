import { Link, Navigate } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { Reveal } from '@/components/common/Reveal';
import { LoginForm } from '@/components/forms/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardPath, ROUTES } from '@/constants/routes';

export function LoginPage() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return (
    <section className="bg-accent/30 py-16 md:py-24">
      <Container className="flex justify-center">
        <Reveal className="w-full max-w-md rounded-[16px] bg-white p-8 shadow-[var(--shadow-card)] sm:p-10">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Welcome Back</span>
            <h1 className="text-2xl font-bold text-secondary md:text-3xl">Sign in to Jobveda</h1>
            <p className="text-sm text-muted">Continue your job search or manage your hiring pipeline.</p>
          </div>

          <LoginForm />

          <p className="mt-8 text-center text-sm text-muted">
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.REGISTER} className="font-semibold text-primary hover:underline">
              Create one
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
