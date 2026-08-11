import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/common/Pagination';
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { JobForm } from '@/components/jobs/JobForm';
import { fetchAdminJobs, createJob, updateJob, deleteJob, updateJobStatus } from '@/services/jobService';
import { fetchCompanies } from '@/services/companyService';
import { JOB_STATUS_OPTIONS } from '@/constants/jobOptions';
import { formatSalaryRange } from '@/utils/format';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type { Job, JobPayload, JobStatus } from '@/types/job.types';

const statusVariant: Record<string, 'primary' | 'neutral' | 'success'> = {
  draft: 'neutral',
  published: 'success',
  closed: 'neutral',
};

export function AdminJobsPage() {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'jobs', { keyword, status, page }],
    queryFn: () => fetchAdminJobs({ keyword: keyword || undefined, status: status || undefined, page }),
  });

  const { data: companiesData } = useQuery({
    queryKey: ['companies', 'all-for-select'],
    queryFn: () => fetchCompanies({ limit: 100 }),
  });

  const companyOptions = (companiesData?.data ?? []).map((company) => ({
    label: company.name,
    value: company.id,
  }));

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'jobs'] });

  const createMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast.success('Job created successfully');
      setIsFormOpen(false);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not create job')),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<JobPayload> }) => updateJob(id, payload),
    onSuccess: () => {
      toast.success('Job updated successfully');
      setIsFormOpen(false);
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

  const openCreate = () => {
    setEditingJob(null);
    setIsFormOpen(true);
  };

  const openEdit = (job: Job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleSubmit = (payload: JobPayload) => {
    if (editingJob) {
      updateMutation.mutate({ id: editingJob.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const columns: DataTableColumn<Job>[] = [
    { header: 'Title', accessor: (job) => <span className="font-medium text-secondary">{job.title}</span> },
    { header: 'Company', accessor: (job) => job.companyName },
    { header: 'Location', accessor: (job) => job.location },
    { header: 'Salary', accessor: (job) => formatSalaryRange(job.salaryMin, job.salaryMax) },
    {
      header: 'Status',
      accessor: (job) => <Badge variant={statusVariant[job.status ?? 'draft']}>{job.status}</Badge>,
    },
    {
      header: 'Actions',
      accessor: (job) => (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => openEdit(job)} className="text-sm font-medium text-primary hover:underline">
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
          {job.status !== 'closed' && (
            <button
              type="button"
              onClick={() => statusMutation.mutate({ id: job.id, nextStatus: 'closed' })}
              className="text-sm font-medium text-muted hover:underline"
            >
              Close
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
          <h1 className="text-2xl font-bold text-secondary">Jobs</h1>
          <p className="text-muted">Create, publish, and manage every job listing.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={16} aria-hidden="true" />
          Add Job
        </Button>
      </div>

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Search"
            placeholder="Search by title, skill, or location"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
              setPage(1);
            }}
            endAdornment={<Search size={16} className="text-muted" aria-hidden="true" />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            label="Status"
            placeholder="All statuses"
            options={JOB_STATUS_OPTIONS}
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
          />
        </div>
      </Card>

      <DataTable columns={columns} rows={data?.data ?? []} keyField={(job) => job.id} isLoading={isLoading} isError={isError} emptyMessage="No jobs yet. Create your first job posting." />

      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />}

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingJob ? 'Edit Job' : 'Add Job'}
        size="xl"
      >
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <JobForm
            initialJob={editingJob ?? undefined}
            companies={companyOptions}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
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
