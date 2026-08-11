import { Outlet, NavLink } from 'react-router-dom';
import { LogOut, type LucideIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Logo } from '@/components/common/Logo';
import { Container } from '@/components/common/Container';
import { NotificationBell } from '@/components/layout/NotificationBell';
import { cn } from '@/utils/cn';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';

export interface DashboardNavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface DashboardShellProps {
  navItems: DashboardNavItem[];
  roleLabel: string;
}

function UserMenu({ layout = 'row' }: { layout?: 'row' | 'stacked' }) {
  const { user } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, { onSuccess: () => toast.success('Logged out successfully') });
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3',
        layout === 'stacked' && 'flex-col items-stretch border-t border-secondary/10 p-3',
      )}
    >
      {user && (
        <div className={cn('min-w-0', layout === 'row' && 'hidden sm:block')}>
          <p className="truncate text-sm font-semibold text-secondary">
            {user.firstName} {user.lastName}
          </p>
          <p className="truncate text-xs text-muted">{user.email}</p>
        </div>
      )}
      <button
        type="button"
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-secondary/15 px-3 py-2 text-sm font-medium text-secondary/80 hover:border-primary hover:text-primary disabled:opacity-50"
      >
        <LogOut size={16} aria-hidden="true" />
        {logoutMutation.isPending ? 'Logging out…' : 'Logout'}
      </button>
    </div>
  );
}

export function DashboardShell({ navItems, roleLabel }: DashboardShellProps) {
  return (
    <div className="flex h-screen bg-accent/30">
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-secondary/10 bg-white lg:flex">
        <div className="flex h-18 shrink-0 items-center px-6">
          <Logo />
        </div>
        <span className="shrink-0 px-6 pb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          {roleLabel} Panel
        </span>
        <nav aria-label="Dashboard" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-secondary/70 hover:bg-accent hover:text-primary',
                  isActive && 'bg-accent text-primary',
                )
              }
            >
              <item.icon size={18} aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="shrink-0">
          <UserMenu layout="stacked" />
        </div>
      </aside>

      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <header className="flex h-18 shrink-0 items-center border-b border-secondary/10 bg-white lg:hidden">
          <Container className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <NotificationBell />
              <UserMenu />
            </div>
          </Container>
        </header>
        <header className="hidden h-18 shrink-0 items-center justify-end gap-3 border-b border-secondary/10 bg-white px-6 lg:flex xl:px-10">
          <NotificationBell />
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
