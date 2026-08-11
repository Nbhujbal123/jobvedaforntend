import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/common/Pagination';
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { BlogForm } from '@/components/blogs/BlogForm';
import {
  fetchAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  updateBlogStatus,
  type BlogPayload,
} from '@/services/blogService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type { Blog } from '@/types/blog.types';

const STATUS_OPTIONS = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Unpublished', value: 'unpublished' },
];

const statusVariant: Record<string, 'primary' | 'neutral' | 'success'> = {
  draft: 'neutral',
  published: 'success',
  unpublished: 'neutral',
};

export function AdminBlogsPage() {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'blogs', { status, page }],
    queryFn: () => fetchAdminBlogs({ status: status || undefined, page }),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'blogs'] });

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      toast.success('Blog post created successfully');
      setIsFormOpen(false);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not create blog post')),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<BlogPayload> }) => updateBlog(id, payload),
    onSuccess: () => {
      toast.success('Blog post updated successfully');
      setIsFormOpen(false);
      setEditingBlog(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update blog post')),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      toast.success('Blog post deleted successfully');
      setDeletingBlog(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not delete blog post')),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: string }) => updateBlogStatus(id, nextStatus),
    onSuccess: () => {
      toast.success('Blog status updated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update status')),
  });

  const handleSubmit = (payload: BlogPayload) => {
    if (editingBlog) {
      updateMutation.mutate({ id: editingBlog.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const columns: DataTableColumn<Blog>[] = [
    { header: 'Title', accessor: (blog) => <span className="font-medium text-secondary">{blog.title}</span> },
    { header: 'Category', accessor: (blog) => blog.category },
    { header: 'Author', accessor: (blog) => blog.author },
    { header: 'Status', accessor: (blog) => <Badge variant={statusVariant[blog.status]}>{blog.status}</Badge> },
    {
      header: 'Actions',
      accessor: (blog) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setEditingBlog(blog);
              setIsFormOpen(true);
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Edit
          </button>
          {blog.status !== 'published' && (
            <button
              type="button"
              onClick={() => statusMutation.mutate({ id: blog.id, nextStatus: 'published' })}
              className="text-sm font-medium text-emerald-600 hover:underline"
            >
              Publish
            </button>
          )}
          {blog.status === 'published' && (
            <button
              type="button"
              onClick={() => statusMutation.mutate({ id: blog.id, nextStatus: 'unpublished' })}
              className="text-sm font-medium text-muted hover:underline"
            >
              Unpublish
            </button>
          )}
          <button type="button" onClick={() => setDeletingBlog(blog)} className="text-sm font-medium text-red-600 hover:underline">
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
          <h1 className="text-2xl font-bold text-secondary">Blogs</h1>
          <p className="text-muted">Publish articles shown on the Jobveda blog.</p>
        </div>
        <Button
          onClick={() => {
            setEditingBlog(null);
            setIsFormOpen(true);
          }}
        >
          <Plus size={16} aria-hidden="true" />
          Add Blog Post
        </Button>
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

      <DataTable columns={columns} rows={data?.data ?? []} keyField={(blog) => blog.id} isLoading={isLoading} isError={isError} emptyMessage="No blog posts yet." />

      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />}

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingBlog ? 'Edit Blog Post' : 'Add Blog Post'} size="xl">
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <BlogForm
            initialBlog={editingBlog ?? undefined}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingBlog)}
        title="Delete Blog Post"
        description={`Are you sure you want to delete "${deletingBlog?.title}"? This cannot be undone.`}
        isLoading={deleteMutation.isPending}
        onConfirm={() => deletingBlog && deleteMutation.mutate(deletingBlog.id)}
        onClose={() => setDeletingBlog(null)}
      />
    </div>
  );
}
