import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/common/Pagination';
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { TestimonialForm } from '@/components/testimonials/TestimonialForm';
import {
  fetchAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  type TestimonialPayload,
} from '@/services/testimonialService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type { ApiTestimonial } from '@/types/testimonial.types';

export function AdminTestimonialsPage() {
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<ApiTestimonial | null>(null);
  const [deleting, setDeleting] = useState<ApiTestimonial | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'testimonials', { page }],
    queryFn: () => fetchAdminTestimonials(page),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] });

  const createMutation = useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      toast.success('Testimonial created successfully');
      setIsFormOpen(false);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not create testimonial')),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<TestimonialPayload> }) =>
      updateTestimonial(id, payload),
    onSuccess: () => {
      toast.success('Testimonial updated successfully');
      setIsFormOpen(false);
      setEditing(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update testimonial')),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      toast.success('Testimonial deleted successfully');
      setDeleting(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not delete testimonial')),
  });

  const togglePublish = (testimonial: ApiTestimonial) =>
    updateMutation.mutate({ id: testimonial.id, payload: { isPublished: !testimonial.isPublished } });

  const handleSubmit = (payload: TestimonialPayload) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const columns: DataTableColumn<ApiTestimonial>[] = [
    { header: 'Name', accessor: (t) => <span className="font-medium text-secondary">{t.name}</span> },
    { header: 'Role / Company', accessor: (t) => [t.role, t.company].filter(Boolean).join(', ') || '—' },
    {
      header: 'Rating',
      accessor: (t) => (
        <span className="inline-flex items-center gap-1">
          <Star size={14} className="fill-primary text-primary" aria-hidden="true" />
          {t.rating}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (t) => <Badge variant={t.isPublished ? 'success' : 'neutral'}>{t.isPublished ? 'Published' : 'Draft'}</Badge>,
    },
    {
      header: 'Actions',
      accessor: (t) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setEditing(t);
              setIsFormOpen(true);
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Edit
          </button>
          <button type="button" onClick={() => togglePublish(t)} className="text-sm font-medium text-emerald-600 hover:underline">
            {t.isPublished ? 'Unpublish' : 'Publish'}
          </button>
          <button type="button" onClick={() => setDeleting(t)} className="text-sm font-medium text-red-600 hover:underline">
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
          <h1 className="text-2xl font-bold text-secondary">Testimonials</h1>
          <p className="text-muted">Manage success stories shown across the site.</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setIsFormOpen(true);
          }}
        >
          <Plus size={16} aria-hidden="true" />
          Add Testimonial
        </Button>
      </div>

      <DataTable columns={columns} rows={data?.data ?? []} keyField={(t) => t.id} isLoading={isLoading} isError={isError} emptyMessage="No testimonials yet." />

      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />}

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'} size="lg">
        <TestimonialForm
          initialTestimonial={editing ?? undefined}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleting)}
        title="Delete Testimonial"
        description={`Are you sure you want to delete this testimonial from "${deleting?.name}"?`}
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleting && deleteMutation.mutate(deleting.id)}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}
