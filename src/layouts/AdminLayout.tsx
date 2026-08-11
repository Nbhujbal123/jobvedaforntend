import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  ClipboardList,
  GraduationCap,
  Newspaper,
  Quote,
  Mail,
  Settings,
} from 'lucide-react';
import { DashboardShell, type DashboardNavItem } from '@/components/layout/DashboardShell';
import { ROUTES } from '@/constants/routes';

const navItems: DashboardNavItem[] = [
  { label: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { label: 'Users', path: ROUTES.ADMIN_USERS, icon: Users },
  { label: 'Jobs', path: ROUTES.ADMIN_JOBS, icon: Briefcase },
  { label: 'Companies', path: ROUTES.ADMIN_COMPANIES, icon: Building2 },
  { label: 'Applications', path: ROUTES.ADMIN_APPLICATIONS, icon: ClipboardList },
  { label: 'Courses', path: ROUTES.ADMIN_COURSES, icon: GraduationCap },
  { label: 'Blogs', path: ROUTES.ADMIN_BLOGS, icon: Newspaper },
  { label: 'Testimonials', path: ROUTES.ADMIN_TESTIMONIALS, icon: Quote },
  { label: 'Contact Messages', path: ROUTES.ADMIN_MESSAGES, icon: Mail },
  { label: 'Settings', path: ROUTES.ADMIN_SETTINGS, icon: Settings },
];

export function AdminLayout() {
  return <DashboardShell navItems={navItems} roleLabel="Admin" />;
}
