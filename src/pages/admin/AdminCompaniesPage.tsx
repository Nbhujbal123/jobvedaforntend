import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Search, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/common/Pagination';
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { CompanyForm } from '@/components/companies/CompanyForm';
import {
  fetchAdminCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  verifyCompany,
} from '@/services/companyService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type { Company, CompanyPayload } from '@/types/company.types';

export function AdminCompaniesPage() {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [deletingCompany, setDeletingCompany] = useState<Company | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'companies', { keyword, page }],
    queryFn: () => fetchAdminCompanies({ keyword: keyword || undefined, page }),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'companies'] });

  const createMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      toast.success('Company created successfully');
      setIsFormOpen(false);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not create company')),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CompanyPayload> }) => updateCompany(id, payload),
    onSuccess: () => {
      toast.success('Company updated successfully');
      setIsFormOpen(false);
      setEditingCompany(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update company')),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      toast.success('Company deleted successfully');
      setDeletingCompany(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not delete company')),
  });

  const verifyMutation = useMutation({
    mutationFn: ({ id, isVerified }: { id: string; isVerified: boolean }) => verifyCompany(id, isVerified),
    onSuccess: () => {
      toast.success('Company verification updated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update verification')),
  });

  const openCreate = () => {
    setEditingCompany(null);
    setIsFormOpen(true);
  };

  const handleSubmit = (payload: CompanyPayload) => {
    if (editingCompany) {
      updateMutation.mutate({ id: editingCompany.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const columns: DataTableColumn<Company>[] = [
    {
      header: 'Company',
      accessor: (company) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-secondary">{company.name}</span>
          {company.isVerified && <ShieldCheck size={14} className="text-emerald-500" aria-hidden="true" />}
        </div>
      ),
    },
    { header: 'Industry', accessor: (company) => company.industry ?? '—' },
    { header: 'Location', accessor: (company) => company.location ?? '—' },
    { header: 'Open Jobs', accessor: (company) => company.openJobsCount ?? 0 },
    {
      header: 'Status',
      accessor: (company) => (
        <Badge variant={company.isVerified ? 'success' : 'neutral'}>
          {company.isVerified ? 'Verified' : 'Unverified'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      accessor: (company) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setEditingCompany(company);
              setIsFormOpen(true);
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => verifyMutation.mutate({ id: company.id, isVerified: !company.isVerified })}
            className="text-sm font-medium text-emerald-600 hover:underline"
          >
            {company.isVerified ? 'Unverify' : 'Verify'}
          </button>
          <button
            type="button"
            onClick={() => setDeletingCompany(company)}
            className="text-sm font-medium text-red-600 hover:underline"
          >
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
          <h1 className="text-2xl font-bold text-secondary">Companies</h1>
          <p className="text-muted">Manage hiring partners and verification status.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={16} aria-hidden="true" />
          Add Company
        </Button>
      </div>

      <Card>
        <Input
          label="Search"
          placeholder="Search by company name"
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
            setPage(1);
          }}
          endAdornment={<Search size={16} className="text-muted" aria-hidden="true" />}
        />
      </Card>

      <DataTable columns={columns} rows={data?.data ?? []} keyField={(company) => company.id} isLoading={isLoading} isError={isError} emptyMessage="No companies yet." />

      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />}

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingCompany ? 'Edit Company' : 'Add Company'} size="lg">
        <CompanyForm
          initialCompany={editingCompany ?? undefined}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingCompany)}
        title="Delete Company"
        description={`Are you sure you want to delete "${deletingCompany?.name}"? This cannot be undone.`}
        isLoading={deleteMutation.isPending}
        onConfirm={() => deletingCompany && deleteMutation.mutate(deletingCompany.id)}
        onClose={() => setDeletingCompany(null)}
      />
    </div>
  );
}
