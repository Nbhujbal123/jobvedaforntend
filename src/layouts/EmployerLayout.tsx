import { LayoutDashboard, Building2, PlusSquare, Briefcase, Users, CalendarClock } from 'lucide-react';
import { DashboardShell, type DashboardNavItem } from '@/components/layout/DashboardShell';
import { ROUTES } from '@/constants/routes';

const navItems: DashboardNavItem[] = [
  { label: 'Dashboard', path: ROUTES.EMPLOYER_DASHBOARD, icon: LayoutDashboard },
  { label: 'Company Profile', path: ROUTES.EMPLOYER_PROFILE, icon: Building2 },
  { label: 'Post a Job', path: ROUTES.EMPLOYER_POST_JOB, icon: PlusSquare },
  { label: 'Manage Jobs', path: ROUTES.EMPLOYER_JOBS, icon: Briefcase },
  { label: 'Applicants', path: ROUTES.EMPLOYER_APPLICANTS, icon: Users },
  { label: 'Interviews', path: ROUTES.EMPLOYER_INTERVIEWS, icon: CalendarClock },
];

export function EmployerLayout() {
  return <DashboardShell navItems={navItems} roleLabel="Employer" />;
}
