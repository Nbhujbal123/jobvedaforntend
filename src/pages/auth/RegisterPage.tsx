import { Link, Navigate } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { Reveal } from '@/components/common/Reveal';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardPath, ROUTES } from '@/constants/routes';

export function RegisterPage() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return (
    <section className="bg-accent/30 py-16 md:py-24">
      <Container className="flex justify-center">
        <Reveal className="w-full max-w-xl rounded-[16px] bg-white p-8 shadow-[var(--shadow-card)] sm:p-10">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">Get Started</span>
            <h1 className="text-2xl font-bold text-secondary md:text-3xl">Create your Jobveda account</h1>
            <p className="text-sm text-muted">Join as a candidate to find jobs or an employer to hire talent.</p>
          </div>

          <RegisterForm />

          <p className="mt-8 text-center text-sm text-muted">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
