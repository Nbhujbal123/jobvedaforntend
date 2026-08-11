import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { JobForm } from '@/components/jobs/JobForm';
import { fetchMyCompany } from '@/services/companyService';
import { createJob } from '@/services/jobService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { ROUTES } from '@/constants/routes';
import type { JobPayload } from '@/types/job.types';

export function EmployerPostJobPage() {
  const navigate = useNavigate();

  const { data: company, isLoading } = useQuery({
    queryKey: ['companies', 'mine'],
    queryFn: fetchMyCompany,
  });

  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast.success('Job posted successfully');
      navigate(ROUTES.EMPLOYER_JOBS);
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not post job')),
  });

  if (isLoading) {
    return <LoadingSpinner className="min-h-[50vh]" size={28} />;
  }

  if (!company) {
    return (
      <Card className="flex max-w-lg flex-col items-center gap-3 text-center">
        <h1 className="text-xl font-bold text-secondary">Create your company profile first</h1>
        <p className="text-muted">You need a company profile before you can post a job.</p>
        <Link to={ROUTES.EMPLOYER_PROFILE} className="text-sm font-semibold text-primary hover:underline">
          Set up company profile →
        </Link>
      </Card>
    );
  }

  const handleSubmit = (payload: JobPayload) => mutation.mutate({ ...payload, companyId: company.id });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Post a Job</h1>
        <p className="text-muted">Fill in the details below to publish a new job listing.</p>
      </div>

      <Card className="max-w-3xl">
        <JobForm
          companies={[{ label: company.name, value: company.id }]}
          lockCompanyId={company.id}
          isSubmitting={mutation.isPending}
          onSubmit={handleSubmit}
          onCancel={() => navigate(ROUTES.EMPLOYER_JOBS)}
        />
      </Card>
    </div>
  );
}
