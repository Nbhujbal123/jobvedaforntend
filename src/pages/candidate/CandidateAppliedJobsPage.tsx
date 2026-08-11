import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/common/Pagination';
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable';
import { fetchMyApplications } from '@/services/applicationService';
import { ROUTES } from '@/constants/routes';
import type { Application, ApplicationStatus, PopulatedCompanyRef, PopulatedJobRef } from '@/types/application.types';

const statusVariant: Record<ApplicationStatus, 'primary' | 'neutral' | 'success'> = {
  applied: 'neutral',
  shortlisted: 'primary',
  interview: 'primary',
  selected: 'success',
  rejected: 'neutral',
};

export function CandidateAppliedJobsPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['applications', 'my', { page }],
    queryFn: () => fetchMyApplications({ page }),
  });

  const columns: DataTableColumn<Application>[] = [
    {
      header: 'Job',
      accessor: (application) => {
        const job = application.jobId as PopulatedJobRef;
        return (
          <Link to={ROUTES.JOB_DETAILS.replace(':id', job.id)} className="font-medium text-secondary hover:text-primary">
            {job.title}
          </Link>
        );
      },
    },
    { header: 'Company', accessor: (application) => (application.companyId as PopulatedCompanyRef).name },
    { header: 'Applied On', accessor: (application) => new Date(application.createdAt).toLocaleDateString() },
    {
      header: 'Status',
      accessor: (application) => <Badge variant={statusVariant[application.status]}>{application.status}</Badge>,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Applied Jobs</h1>
        <p className="text-muted">Track the status of every job you've applied to.</p>
      </div>

      <DataTable
        columns={columns}
        rows={data?.data ?? []}
        keyField={(application) => application.id}
        isLoading={isLoading}
        isError={isError}
        emptyMessage="You haven't applied to any jobs yet."
      />

      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />}
    </div>
  );
}
