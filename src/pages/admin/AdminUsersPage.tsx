import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/common/Pagination';
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { activateUser, deactivateUser, deleteUser, fetchAdminUsers } from '@/services/adminService';
import { useAuth } from '@/hooks/useAuth';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type { AuthUser, UserRole } from '@/types/auth.types';

const ROLE_OPTIONS = [
  { label: 'Candidate', value: 'candidate' },
  { label: 'Employer', value: 'employer' },
  { label: 'Admin', value: 'admin' },
];

export function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);
  const [deletingUser, setDeletingUser] = useState<AuthUser | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'users', { search, role, page }],
    queryFn: () =>
      fetchAdminUsers({ search: search || undefined, role: (role as UserRole) || undefined, page }),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });

  const activateMutation = useMutation({
    mutationFn: activateUser,
    onSuccess: () => {
      toast.success('User activated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deactivateMutation = useMutation({
    mutationFn: deactivateUser,
    onSuccess: () => {
      toast.success('User deactivated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('User deleted');
      setDeletingUser(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not delete user')),
  });

  const columns: DataTableColumn<AuthUser>[] = [
    {
      header: 'Name',
      accessor: (user) => (
        <div>
          <p className="font-medium text-secondary">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-muted">{user.email}</p>
        </div>
      ),
    },
    { header: 'Role', accessor: (user) => <Badge variant="neutral">{user.role}</Badge> },
    { header: 'Phone', accessor: (user) => user.phone },
    {
      header: 'Status',
      accessor: (user) => (
        <Badge variant={user.isActive ? 'success' : 'neutral'}>{user.isActive ? 'Active' : 'Inactive'}</Badge>
      ),
    },
    { header: 'Joined', accessor: (user) => new Date(user.createdAt).toLocaleDateString() },
    {
      header: 'Actions',
      accessor: (user) => {
        const isSelf = user.id === currentUser?.id;
        return (
          <div className="flex flex-wrap gap-2">
            {user.isActive ? (
              <button
                type="button"
                onClick={() => deactivateMutation.mutate(user.id)}
                className="text-sm font-medium text-muted hover:underline"
              >
                Deactivate
              </button>
            ) : (
              <button
                type="button"
                onClick={() => activateMutation.mutate(user.id)}
                className="text-sm font-medium text-emerald-600 hover:underline"
              >
                Activate
              </button>
            )}
            {!isSelf && (
              <button
                type="button"
                onClick={() => setDeletingUser(user)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Users</h1>
        <p className="text-muted">Manage candidates, employers, and admin accounts.</p>
      </div>

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Search"
            placeholder="Search by name or email"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            endAdornment={<Search size={16} className="text-muted" aria-hidden="true" />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            label="Role"
            placeholder="All roles"
            options={ROLE_OPTIONS}
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
              setPage(1);
            }}
          />
        </div>
      </Card>

      <DataTable columns={columns} rows={data?.data ?? []} keyField={(user) => user.id} isLoading={isLoading} isError={isError} emptyMessage="No users found." />

      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />}

      <ConfirmDialog
        isOpen={Boolean(deletingUser)}
        title="Delete User"
        description={`Are you sure you want to delete ${deletingUser?.firstName} ${deletingUser?.lastName}? This cannot be undone.`}
        isLoading={deleteMutation.isPending}
        onConfirm={() => deletingUser && deleteMutation.mutate(deletingUser.id)}
        onClose={() => setDeletingUser(null)}
      />
    </div>
  );
}
