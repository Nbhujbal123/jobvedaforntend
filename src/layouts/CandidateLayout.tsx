import { LayoutDashboard, User, FileText, Briefcase, Bookmark, CalendarClock } from 'lucide-react';
import { DashboardShell, type DashboardNavItem } from '@/components/layout/DashboardShell';
import { ROUTES } from '@/constants/routes';

const navItems: DashboardNavItem[] = [
  { label: 'Dashboard', path: ROUTES.CANDIDATE_DASHBOARD, icon: LayoutDashboard },
  { label: 'Profile', path: ROUTES.CANDIDATE_PROFILE, icon: User },
  { label: 'Resume', path: ROUTES.CANDIDATE_RESUME, icon: FileText },
  { label: 'Applied Jobs', path: ROUTES.CANDIDATE_APPLIED_JOBS, icon: Briefcase },
  { label: 'Saved Jobs', path: ROUTES.CANDIDATE_SAVED_JOBS, icon: Bookmark },
  { label: 'Interviews', path: ROUTES.CANDIDATE_INTERVIEWS, icon: CalendarClock },
];

export function CandidateLayout() {
  return <DashboardShell navItems={navItems} roleLabel="Candidate" />;
}
