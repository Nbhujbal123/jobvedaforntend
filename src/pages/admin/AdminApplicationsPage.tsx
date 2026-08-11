import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/common/Pagination';
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable';
import { fetchAdminApplications, updateApplicationStatus } from '@/services/applicationService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type { Application, ApplicationStatus, PopulatedCandidateRef, PopulatedCompanyRef, PopulatedJobRef } from '@/types/application.types';

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

export function AdminApplicationsPage() {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'applications', { status, page }],
    queryFn: () => fetchAdminApplications({ status: status || undefined, page }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: ApplicationStatus }) =>
      updateApplicationStatus(id, nextStatus),
    onSuccess: () => {
      toast.success('Application status updated');
      queryClient.invalidateQueries({ queryKey: ['admin', 'applications'] });
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update status')),
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
    { header: 'Company', accessor: (application) => (application.companyId as PopulatedCompanyRef).name },
    {
      header: 'Resume',
      accessor: (application) =>
        application.resumeUrl ? (
          <a
            href={application.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
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
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Applications</h1>
        <p className="text-muted">Review candidate applications across every job.</p>
      </div>

      <Card className="max-w-xs">
        <Select
          label="Status"
          placeholder="All statuses"
          options={STATUS_OPTIONS}
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
        />
      </Card>

      <DataTable
        columns={columns}
        rows={data?.data ?? []}
        keyField={(application) => application.id}
        isLoading={isLoading}
        isError={isError}
        emptyMessage="No applications yet."
      />

      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />}
    </div>
  );
}
