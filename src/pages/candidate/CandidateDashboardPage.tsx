import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Briefcase, Bookmark, CalendarClock, UserCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { StatCard } from '@/components/admin/StatCard';
import { fetchCandidateDashboard } from '@/services/candidateService';
import { fetchMyApplications } from '@/services/applicationService';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import type { PopulatedCompanyRef, PopulatedJobRef } from '@/types/application.types';

export function CandidateDashboardPage() {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['candidate', 'dashboard'],
    queryFn: fetchCandidateDashboard,
  });

  const { data: recentApplications } = useQuery({
    queryKey: ['applications', 'my', { page: 1, recent: true }],
    queryFn: () => fetchMyApplications({ page: 1, limit: 5 }),
  });

  if (isLoading || !stats) {
    return <LoadingSpinner className="min-h-[50vh]" size={28} />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Welcome back, {user?.firstName}!</h1>
        <p className="text-muted">Here's an overview of your job search.</p>
      </div>

      <Card>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-secondary">Profile Completion</span>
          <span className="text-sm font-semibold text-primary">{stats.profileCompletion}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-accent">
          <div className="h-full rounded-full bg-primary" style={{ width: `${stats.profileCompletion}%` }} />
        </div>
        {stats.profileCompletion < 100 && (
          <Link to={ROUTES.CANDIDATE_PROFILE} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
            Complete your profile →
          </Link>
        )}
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applied Jobs" value={stats.appliedJobsCount} icon={Briefcase} />
        <StatCard label="Saved Jobs" value={stats.savedJobsCount} icon={Bookmark} />
        <StatCard label="Upcoming Interviews" value={stats.upcomingInterviewsCount} icon={CalendarClock} />
        <StatCard label="Shortlisted" value={stats.applicationsByStatus.shortlisted ?? 0} icon={UserCheck} />
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-secondary">Recent Applications</h2>
          <Link to={ROUTES.CANDIDATE_APPLIED_JOBS} className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        {!recentApplications || recentApplications.data.length === 0 ? (
          <p className="text-sm text-muted">You haven't applied to any jobs yet.</p>
        ) : (
          <div className="flex flex-col divide-y divide-secondary/10">
            {recentApplications.data.map((application) => {
              const job = application.jobId as PopulatedJobRef;
              const company = application.companyId as PopulatedCompanyRef;
              return (
                <div key={application.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-secondary">{job.title}</p>
                    <p className="text-muted">{company?.name}</p>
                  </div>
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold capitalize text-primary">
                    {application.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
