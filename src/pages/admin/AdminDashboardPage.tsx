import { useQuery } from '@tanstack/react-query';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Briefcase,
  Building2,
  ClipboardList,
  GraduationCap,
  Mail,
  Newspaper,
  UserCheck,
  Users,
  UserSquare2,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { StatCard } from '@/components/admin/StatCard';
import { fetchAdminDashboard } from '@/services/adminService';

const CHART_COLORS = ['#F05A28', '#1F1F1F', '#FF7A4D', '#6B7280', '#D6491D'];

export function AdminDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: fetchAdminDashboard,
  });

  if (isLoading || !data) {
    return <LoadingSpinner className="min-h-[50vh]" size={28} />;
  }

  const { totals, charts } = data;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Dashboard Overview</h1>
        <p className="text-muted">Platform-wide statistics pulled live from MongoDB.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={totals.totalUsers} icon={Users} />
        <StatCard label="Candidates" value={totals.totalCandidates} icon={UserSquare2} />
        <StatCard label="Employers" value={totals.totalEmployers} icon={UserCheck} />
        <StatCard label="Companies" value={totals.totalCompanies} icon={Building2} />
        <StatCard label="Total Jobs" value={totals.totalJobs} icon={Briefcase} />
        <StatCard label="Active Jobs" value={totals.activeJobs} icon={Zap} />
        <StatCard label="Total Applications" value={totals.totalApplications} icon={ClipboardList} />
        <StatCard label="Pending Applications" value={totals.pendingApplications} icon={ClipboardList} />
        <StatCard label="Total Courses" value={totals.totalCourses} icon={GraduationCap} />
        <StatCard label="Published Blogs" value={totals.publishedBlogs} icon={Newspaper} />
        <StatCard label="New Contact Messages" value={totals.contactMessages} icon={Mail} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-semibold text-secondary">Applications Over Time (30 days)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={charts.applicationsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#F05A28" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-semibold text-secondary">Jobs By Category</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={charts.jobsByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#F05A28" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-semibold text-secondary">Application Status Distribution</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={charts.applicationStatusDistribution}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {charts.applicationStatusDistribution.map((entry, index) => (
                  <Cell key={entry.status} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-semibold text-secondary">Candidates By Location</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={charts.candidatesByLocation} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="location" width={100} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#1F1F1F" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
