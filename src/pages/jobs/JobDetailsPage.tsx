import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Briefcase, Calendar, Heart, MapPin, Wallet, Building2 } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { fetchJobById } from '@/services/jobService';
import { applyToJob } from '@/services/applicationService';
import { fetchSavedJobs, saveJob, unsaveJob } from '@/services/savedJobService';
import { useAuth } from '@/hooks/useAuth';
import { formatExperienceRange, formatSalaryRange } from '@/utils/format';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { ROUTES } from '@/constants/routes';

export function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data: job, isLoading } = useQuery({
    queryKey: ['jobs', 'detail', id],
    queryFn: () => fetchJobById(id as string),
    enabled: Boolean(id),
  });

  const { data: savedJobs } = useQuery({
    queryKey: ['saved-jobs', 'all'],
    queryFn: () => fetchSavedJobs(1, 200),
    enabled: isAuthenticated && user?.role === 'candidate',
  });

  const isSaved = savedJobs?.data.some((entry) => entry.jobId.id === id) ?? false;

  const applyMutation = useMutation({
    mutationFn: () => applyToJob(id as string),
    onSuccess: () => {
      toast.success('Application submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not submit your application')),
  });

  const saveMutation = useMutation({
    mutationFn: () => (isSaved ? unsaveJob(id as string) : saveJob(id as string)),
    onSuccess: () => {
      toast.success(isSaved ? 'Removed from saved jobs' : 'Job saved');
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] });
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Something went wrong')),
  });

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { state: { from: { pathname: `/jobs/${id}` } } });
      return;
    }
    if (user?.role !== 'candidate') {
      toast.error('Only candidate accounts can apply to jobs');
      return;
    }
    applyMutation.mutate();
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { state: { from: { pathname: `/jobs/${id}` } } });
      return;
    }
    saveMutation.mutate();
  };

  if (isLoading) {
    return <LoadingSpinner className="min-h-[50vh]" size={28} />;
  }

  if (!job) {
    return (
      <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-3 py-20 text-center">
        <h1 className="text-2xl font-bold text-secondary">Job not found</h1>
        <p className="text-muted">This role may have been closed or removed.</p>
      </Container>
    );
  }

  return (
    <section className="bg-accent/20 py-12 md:py-16">
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-8">
          <Card className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-accent">
                  {job.companyLogoUrl ? (
                    <img
                      src={job.companyLogoUrl}
                      alt={`${job.companyName} logo`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Briefcase size={28} className="text-primary" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-secondary md:text-3xl">{job.title}</h1>
                  <p className="text-muted">{job.companyName}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} aria-hidden="true" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Wallet size={16} aria-hidden="true" />
                {formatSalaryRange(job.salaryMin, job.salaryMax)}
              </span>
              {formatExperienceRange(job.experienceMin, job.experienceMax) && (
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase size={16} aria-hidden="true" />
                  {formatExperienceRange(job.experienceMin, job.experienceMax)}
                </span>
              )}
              {job.applicationDeadline && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={16} aria-hidden="true" />
                  Apply by {new Date(job.applicationDeadline).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">{job.jobType}</Badge>
              {job.workMode && <Badge variant="neutral">{job.workMode}</Badge>}
              <Badge variant="neutral">{job.category}</Badge>
            </div>

            {job.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="neutral">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </Card>

          <Card className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-secondary">Job Description</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-text">{job.description}</p>
          </Card>

          {job.responsibilities.length > 0 && (
            <Card className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-secondary">Responsibilities</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-text">
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          )}

          {job.requirements.length > 0 && (
            <Card className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-secondary">Requirements</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-text">
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-4">
            <Button
              size="lg"
              onClick={handleApply}
              disabled={applyMutation.isPending || (isAuthenticated && user?.role !== 'candidate')}
            >
              {applyMutation.isPending ? 'Submitting…' : 'Apply Now'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleSave}
              disabled={saveMutation.isPending || (isAuthenticated && user?.role !== 'candidate')}
            >
              <Heart size={16} className={isSaved ? 'fill-primary text-primary' : ''} aria-hidden="true" />
              {isSaved ? 'Saved' : 'Save Job'}
            </Button>
          </Card>

          {job.companyId && (
            <Card className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-secondary">
                <Building2 size={18} aria-hidden="true" />
                <h3 className="font-semibold">About the Company</h3>
              </div>
              <p className="text-sm text-muted">{job.companyName}</p>
              <Link
                to={`${ROUTES.COMPANIES}/${job.companyId}`}
                className="text-sm font-semibold text-primary hover:underline"
              >
                View company profile
              </Link>
            </Card>
          )}
        </div>
      </Container>
    </section>
  );
}
