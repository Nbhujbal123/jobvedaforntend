import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Briefcase, CalendarClock, ClipboardList, UserCheck, Zap } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { StatCard } from '@/components/admin/StatCard';
import { fetchMyJobs } from '@/services/jobService';
import { fetchApplications } from '@/services/applicationService';
import { fetchInterviews } from '@/services/interviewService';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import type { ApplicationStatus, PopulatedCandidateRef, PopulatedJobRef } from '@/types/application.types';

const statusVariant: Record<ApplicationStatus, 'primary' | 'neutral' | 'success'> = {
  applied: 'neutral',
  shortlisted: 'primary',
  interview: 'primary',
  selected: 'success',
  rejected: 'neutral',
};

export function EmployerDashboardPage() {
  const { user } = useAuth();

  const { data: allJobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['jobs', 'mine', 'stats'],
    queryFn: () => fetchMyJobs({ limit: 100 }),
  });

  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ['applications', 'employer', 'stats'],
    queryFn: () => fetchApplications({ limit: 5 }),
  });

  const { data: interviews } = useQuery({
    queryKey: ['interviews', 'employer', 'stats'],
    queryFn: () => fetchInterviews(1, 5),
  });

  if (jobsLoading || applicationsLoading) {
    return <LoadingSpinner className="min-h-[50vh]" size={28} />;
  }

  const activeJobs = allJobs?.data.filter((job) => job.status === 'published').length ?? 0;
  const shortlistedCount = applications?.data.filter((a) => a.status === 'shortlisted').length ?? 0;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Welcome back, {user?.firstName}!</h1>
        <p className="text-muted">Here's how your job postings are performing.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Jobs" value={allJobs?.totalResults ?? 0} icon={Briefcase} />
        <StatCard label="Active Jobs" value={activeJobs} icon={Zap} />
        <StatCard label="Applications" value={applications?.totalResults ?? 0} icon={ClipboardList} />
        <StatCard label="Shortlisted" value={shortlistedCount} icon={UserCheck} />
        <StatCard label="Interviews" value={interviews?.totalResults ?? 0} icon={CalendarClock} />
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-secondary">Recent Applicants</h2>
          <Link to={ROUTES.EMPLOYER_APPLICANTS} className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        {!applications || applications.data.length === 0 ? (
          <p className="text-sm text-muted">No applicants yet.</p>
        ) : (
          <div className="flex flex-col divide-y divide-secondary/10">
            {applications.data.map((application) => {
              const candidate = application.candidateId as PopulatedCandidateRef;
              const job = application.jobId as PopulatedJobRef;
              return (
                <div key={application.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-secondary">
                      {candidate.firstName} {candidate.lastName}
                    </p>
                    <p className="text-muted">{job.title}</p>
                  </div>
                  <Badge variant={statusVariant[application.status]}>{application.status}</Badge>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
