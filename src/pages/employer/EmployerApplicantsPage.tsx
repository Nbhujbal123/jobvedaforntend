import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FileText } from 'lucide-react';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/common/Pagination';
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable';
import { InterviewForm } from '@/components/interviews/InterviewForm';
import { fetchApplications, updateApplicationStatus } from '@/services/applicationService';
import { scheduleInterview, type InterviewPayload } from '@/services/interviewService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type {
  Application,
  ApplicationStatus,
  PopulatedCandidateRef,
  PopulatedJobRef,
} from '@/types/application.types';

const STATUS_OPTIONS = [
  { label: 'Applied', value: 'applied' },
  { label: 'Shortlisted', value: 'shortlisted' },
  { label: 'Interview', value: 'interview' },
  { label: 'Selected', value: 'selected' },
  { label: 'Rejected', value: 'rejected' },
];

const statusVariant: Record<ApplicationStatus, 'primary' | 'neutral' | 'success'> = {
  applied: 'neutral',
  shortlisted: 'primary',
  interview: 'primary',
  selected: 'success',
  rejected: 'neutral',
};

export function EmployerApplicantsPage() {
  const [searchParams] = useSearchParams();
  const jobIdFilter = searchParams.get('jobId') ?? undefined;
  const [page, setPage] = useState(1);
  const [schedulingFor, setSchedulingFor] = useState<Application | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['applications', 'employer', { jobIdFilter, page }],
    queryFn: () => fetchApplications({ jobId: jobIdFilter, page }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: ApplicationStatus }) =>
      updateApplicationStatus(id, nextStatus),
    onSuccess: () => {
      toast.success('Application status updated');
      queryClient.invalidateQueries({ queryKey: ['applications', 'employer'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const interviewMutation = useMutation({
    mutationFn: (payload: InterviewPayload) => scheduleInterview(payload),
    onSuccess: () => {
      toast.success('Interview scheduled successfully');
      setSchedulingFor(null);
      queryClient.invalidateQueries({ queryKey: ['applications', 'employer'] });
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not schedule interview')),
  });

  const columns: DataTableColumn<Application>[] = [
    {
      header: 'Candidate',
      accessor: (application) => {
        const candidate = application.candidateId as PopulatedCandidateRef;
        return (
          <div>
            <p className="font-medium text-secondary">
              {candidate.firstName} {candidate.lastName}
            </p>
            <p className="text-xs text-muted">{candidate.email}</p>
          </div>
        );
      },
    },
    { header: 'Job', accessor: (application) => (application.jobId as PopulatedJobRef).title },
    {
      header: 'Resume',
      accessor: (application) =>
        application.resumeUrl ? (
          <a href={application.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            <FileText size={14} aria-hidden="true" />
            View
          </a>
        ) : (
          '—'
        ),
    },
    { header: 'Applied', accessor: (application) => new Date(application.createdAt).toLocaleDateString() },
    {
      header: 'Status',
      accessor: (application) => (
        <div className="flex items-center gap-2">
          <Badge variant={statusVariant[application.status]}>{application.status}</Badge>
          <Select
            className="h-8 w-36 text-xs"
            options={STATUS_OPTIONS}
            value={application.status}
            onChange={(event) =>
              statusMutation.mutate({ id: application.id, nextStatus: event.target.value as ApplicationStatus })
            }
          />
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: (application) => (
        <button
          type="button"
          onClick={() => setSchedulingFor(application)}
          className="text-sm font-medium text-primary hover:underline"
        >
          Schedule Interview
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Applicants</h1>
        <p className="text-muted">Candidates who applied to your job listings.</p>
      </div>

      <DataTable
        columns={columns}
        rows={data?.data ?? []}
        keyField={(application) => application.id}
        isLoading={isLoading}
        isError={isError}
        emptyMessage="No applicants yet."
      />

      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />}

      <Modal isOpen={Boolean(schedulingFor)} onClose={() => setSchedulingFor(null)} title="Schedule Interview">
        {schedulingFor && (
          <InterviewForm
            applicationId={schedulingFor.id}
            isSubmitting={interviewMutation.isPending}
            onSubmit={(payload) => interviewMutation.mutate(payload)}
            onCancel={() => setSchedulingFor(null)}
          />
        )}
      </Modal>
    </div>
  );
}
