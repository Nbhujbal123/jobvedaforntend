import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/common/Pagination';
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { JobForm } from '@/components/jobs/JobForm';
import { fetchMyJobs, updateJob, deleteJob, updateJobStatus } from '@/services/jobService';
import { fetchMyCompany } from '@/services/companyService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { formatSalaryRange } from '@/utils/format';
import { ROUTES } from '@/constants/routes';
import type { Job, JobPayload, JobStatus } from '@/types/job.types';

const statusVariant: Record<string, 'primary' | 'neutral' | 'success'> = {
  draft: 'neutral',
  published: 'success',
  closed: 'neutral',
};

export function EmployerJobsPage() {
  const [page, setPage] = useState(1);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs', 'mine', { page }],
    queryFn: () => fetchMyJobs({ page }),
  });

  const { data: company } = useQuery({ queryKey: ['companies', 'mine'], queryFn: fetchMyCompany });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['jobs', 'mine'] });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<JobPayload> }) => updateJob(id, payload),
    onSuccess: () => {
      toast.success('Job updated successfully');
      setEditingJob(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update job')),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success('Job deleted successfully');
      setDeletingJob(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not delete job')),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: JobStatus }) => updateJobStatus(id, nextStatus),
    onSuccess: () => {
      toast.success('Job status updated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update status')),
  });

  const columns: DataTableColumn<Job>[] = [
    { header: 'Title', accessor: (job) => <span className="font-medium text-secondary">{job.title}</span> },
    { header: 'Location', accessor: (job) => job.location },
    { header: 'Salary', accessor: (job) => formatSalaryRange(job.salaryMin, job.salaryMax) },
    { header: 'Status', accessor: (job) => <Badge variant={statusVariant[job.status ?? 'draft']}>{job.status}</Badge> },
    {
      header: 'Actions',
      accessor: (job) => (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setEditingJob(job)} className="text-sm font-medium text-primary hover:underline">
            Edit
          </button>
          {job.status !== 'published' && (
            <button
              type="button"
              onClick={() => statusMutation.mutate({ id: job.id, nextStatus: 'published' })}
              className="text-sm font-medium text-emerald-600 hover:underline"
            >
              Publish
            </button>
          )}
          {job.status === 'published' && (
            <button
              type="button"
              onClick={() => statusMutation.mutate({ id: job.id, nextStatus: 'draft' })}
              className="text-sm font-medium text-muted hover:underline"
            >
              Unpublish
            </button>
          )}
          <button type="button" onClick={() => setDeletingJob(job)} className="text-sm font-medium text-red-600 hover:underline">
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Manage Jobs</h1>
          <p className="text-muted">Every job you've posted.</p>
        </div>
        <Link to={ROUTES.EMPLOYER_POST_JOB}>
          <Button>
            <Plus size={16} aria-hidden="true" />
            Post a Job
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} rows={data?.data ?? []} keyField={(job) => job.id} isLoading={isLoading} isError={isError} emptyMessage="You haven't posted any jobs yet." />

      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />}

      <Modal isOpen={Boolean(editingJob)} onClose={() => setEditingJob(null)} title="Edit Job" size="xl">
        {editingJob && company && (
          <div className="max-h-[70vh] overflow-y-auto pr-1">
            <JobForm
              initialJob={editingJob}
              companies={[{ label: company.name, value: company.id }]}
              lockCompanyId={company.id}
              isSubmitting={updateMutation.isPending}
              onSubmit={(payload) => updateMutation.mutate({ id: editingJob.id, payload })}
              onCancel={() => setEditingJob(null)}
            />
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingJob)}
        title="Delete Job"
        description={`Are you sure you want to delete "${deletingJob?.title}"? This cannot be undone.`}
        isLoading={deleteMutation.isPending}
        onConfirm={() => deletingJob && deleteMutation.mutate(deletingJob.id)}
        onClose={() => setDeletingJob(null)}
      />
    </div>
  );
}
