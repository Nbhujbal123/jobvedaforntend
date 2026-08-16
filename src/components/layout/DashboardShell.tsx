import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LogOut, Menu, X, type LucideIcon } from 'lucide-react';
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

/** Lives at the bottom of the sidebar (desktop: always-visible sidebar, mobile: drawer). */
function UserMenu() {
  const { user } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, { onSuccess: () => toast.success('Logged out successfully') });
  };

  return (
    <div className="flex flex-col items-stretch gap-3 border-t border-secondary/10 p-3">
      {user && (
        <div className="min-w-0 px-1">
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
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-secondary/15 px-3 py-2 text-sm font-medium text-secondary/80 hover:border-primary hover:text-primary disabled:opacity-50"
      >
        <LogOut size={16} aria-hidden="true" />
        {logoutMutation.isPending ? 'Logging out…' : 'Logout'}
      </button>
    </div>
  );
}

export function DashboardShell({ navItems, roleLabel }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-accent/30">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-secondary/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="dashboard-sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-screen w-64 max-w-[85vw] shrink-0 flex-col border-r border-secondary/10 bg-white transition-transform duration-200 ease-out lg:static lg:z-auto lg:max-w-none lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-18 shrink-0 items-center justify-between gap-2 px-4 sm:px-6">
          <Logo />
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-secondary hover:bg-accent lg:hidden"
            aria-label="Close sidebar"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <span className="shrink-0 px-6 pb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          {roleLabel} Panel
        </span>
        <nav aria-label="Dashboard" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
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
          <UserMenu />
        </div>
      </aside>

      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-18 shrink-0 items-center border-b border-secondary/10 bg-white lg:hidden">
          <Container className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1 sm:gap-3">
              <button
                type="button"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-secondary hover:bg-accent"
                aria-label="Open sidebar"
                aria-expanded={isSidebarOpen}
                aria-controls="dashboard-sidebar"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={22} aria-hidden="true" />
              </button>
              <div className="min-w-0">
                <Logo />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <NotificationBell />
            </div>
          </Container>
        </header>
        <header className="hidden h-18 shrink-0 items-center justify-end gap-3 border-b border-secondary/10 bg-white px-6 lg:flex xl:px-10">
          <NotificationBell />
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
