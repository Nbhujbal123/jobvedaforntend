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
import { CourseForm } from '@/components/training/CourseForm';
import {
  fetchAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  updateCourseStatus,
  type CoursePayload,
} from '@/services/courseService';
import { COURSE_STATUS_OPTIONS } from '@/constants/courseOptions';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type { Course } from '@/types/course.types';

const statusVariant: Record<string, 'primary' | 'neutral' | 'success'> = {
  draft: 'neutral',
  published: 'success',
  unpublished: 'neutral',
};

export function AdminCoursesPage() {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'courses', { keyword, status, page }],
    queryFn: () => fetchAdminCourses({ keyword: keyword || undefined, status: status || undefined, page }),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'courses'] });

  const createMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success('Course created successfully');
      setIsFormOpen(false);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not create course')),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CoursePayload> }) => updateCourse(id, payload),
    onSuccess: () => {
      toast.success('Course updated successfully');
      setIsFormOpen(false);
      setEditingCourse(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update course')),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast.success('Course deleted successfully');
      setDeletingCourse(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not delete course')),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: string }) => updateCourseStatus(id, nextStatus),
    onSuccess: () => {
      toast.success('Course status updated');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update status')),
  });

  const handleSubmit = (payload: CoursePayload) => {
    if (editingCourse) {
      updateMutation.mutate({ id: editingCourse.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const columns: DataTableColumn<Course>[] = [
    { header: 'Title', accessor: (course) => <span className="font-medium text-secondary">{course.title}</span> },
    { header: 'Category', accessor: (course) => course.category },
    { header: 'Duration', accessor: (course) => course.duration },
    { header: 'Mode', accessor: (course) => course.mode },
    {
      header: 'Status',
      accessor: (course) => <Badge variant={statusVariant[course.status ?? 'draft']}>{course.status}</Badge>,
    },
    {
      header: 'Actions',
      accessor: (course) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setEditingCourse(course);
              setIsFormOpen(true);
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Edit
          </button>
          {course.status !== 'published' && (
            <button
              type="button"
              onClick={() => statusMutation.mutate({ id: course.id, nextStatus: 'published' })}
              className="text-sm font-medium text-emerald-600 hover:underline"
            >
              Publish
            </button>
          )}
          {course.status === 'published' && (
            <button
              type="button"
              onClick={() => statusMutation.mutate({ id: course.id, nextStatus: 'unpublished' })}
              className="text-sm font-medium text-muted hover:underline"
            >
              Unpublish
            </button>
          )}
          <button type="button" onClick={() => setDeletingCourse(course)} className="text-sm font-medium text-red-600 hover:underline">
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
          <h1 className="text-2xl font-bold text-secondary">Courses</h1>
          <p className="text-muted">Manage training programs shown on the Training page.</p>
        </div>
        <Button
          onClick={() => {
            setEditingCourse(null);
            setIsFormOpen(true);
          }}
        >
          <Plus size={16} aria-hidden="true" />
          Add Course
        </Button>
      </div>

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Search"
            placeholder="Search by title"
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
            options={COURSE_STATUS_OPTIONS}
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
          />
        </div>
      </Card>

      <DataTable columns={columns} rows={data?.data ?? []} keyField={(course) => course.id} isLoading={isLoading} isError={isError} emptyMessage="No courses yet." />

      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />}

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingCourse ? 'Edit Course' : 'Add Course'} size="lg">
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <CourseForm
            initialCourse={editingCourse ?? undefined}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingCourse)}
        title="Delete Course"
        description={`Are you sure you want to delete "${deletingCourse?.title}"? This cannot be undone.`}
        isLoading={deleteMutation.isPending}
        onConfirm={() => deletingCourse && deleteMutation.mutate(deletingCourse.id)}
        onClose={() => setDeletingCourse(null)}
      />
    </div>
  );
}
