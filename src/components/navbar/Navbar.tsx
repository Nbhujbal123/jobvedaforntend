import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Container } from '@/components/common/Container';
import { Logo } from '@/components/common/Logo';
import { buttonVariants } from '@/components/ui/button-variants';
import { getDashboardPath, NAV_LINKS, ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';

interface AuthActionsProps {
  fullWidth?: boolean;
  onNavigate?: () => void;
}

function AuthActions({ fullWidth = false, onNavigate }: AuthActionsProps) {
  const { isAuthenticated, user } = useAuth();
  const logoutMutation = useLogout();

  if (isAuthenticated && user) {
    const handleLogout = () => {
      logoutMutation.mutate(undefined, { onSuccess: () => toast.success('Logged out successfully') });
      onNavigate?.();
    };

    return (
      <>
        <NavLink
          to={getDashboardPath(user.role)}
          onClick={onNavigate}
          className={buttonVariants('outline', 'sm', fullWidth ? 'flex-1' : undefined)}
        >
          <LayoutDashboard size={16} aria-hidden="true" />
          {user.firstName}
        </NavLink>
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className={buttonVariants('ghost', 'sm', fullWidth ? 'flex-1' : undefined)}
        >
          <LogOut size={16} aria-hidden="true" />
          {logoutMutation.isPending ? 'Logging out…' : 'Logout'}
        </button>
      </>
    );
  }

  return (
    <>
      <NavLink
        to={ROUTES.LOGIN}
        onClick={onNavigate}
        className={buttonVariants('ghost', 'sm', fullWidth ? 'flex-1' : undefined)}
      >
        Login
      </NavLink>
      <NavLink
        to={ROUTES.REGISTER}
        onClick={onNavigate}
        className={buttonVariants('primary', 'sm', fullWidth ? 'flex-1' : undefined)}
      >
        Register
      </NavLink>
    </>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-secondary/5 bg-white/95 backdrop-blur">
      <Container className="flex h-18 items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium text-secondary/80 hover:text-primary',
                  isActive && 'text-primary',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <AuthActions />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 text-secondary lg:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {isOpen && (
        <nav aria-label="Mobile" className="border-t border-secondary/5 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-3 py-2.5 text-sm font-medium text-secondary/80 hover:bg-accent hover:text-primary',
                    isActive && 'bg-accent text-primary',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 flex gap-3 border-t border-secondary/5 pt-4">
              <AuthActions fullWidth onNavigate={() => setIsOpen(false)} />
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
