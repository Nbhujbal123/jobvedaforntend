import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Mail } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/common/Pagination';
import { DataTable, type DataTableColumn } from '@/components/admin/DataTable';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import {
  fetchContactMessages,
  updateContactStatus,
  deleteContactMessage,
} from '@/services/contactService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type { ContactMessage, ContactMessageStatus } from '@/types/contact.types';

const STATUS_OPTIONS = [
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Replied', value: 'replied' },
];

const statusVariant: Record<ContactMessageStatus, 'primary' | 'neutral' | 'success'> = {
  new: 'primary',
  read: 'neutral',
  replied: 'success',
};

export function AdminMessagesPage() {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState<ContactMessage | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'messages', { status, page }],
    queryFn: () => fetchContactMessages(page, 12, status || undefined),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'messages'] });

  const statusMutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: ContactMessageStatus }) =>
      updateContactStatus(id, nextStatus),
    onSuccess: invalidate,
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContactMessage,
    onSuccess: () => {
      toast.success('Message deleted');
      setDeleting(null);
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not delete message')),
  });

  const openMessage = (message: ContactMessage) => {
    setViewing(message);
    if (message.status === 'new') {
      statusMutation.mutate({ id: message.id, nextStatus: 'read' });
    }
  };

  const columns: DataTableColumn<ContactMessage>[] = [
    {
      header: 'From',
      accessor: (message) => (
        <div>
          <p className="font-medium text-secondary">{message.name}</p>
          <p className="text-xs text-muted">{message.email}</p>
        </div>
      ),
    },
    { header: 'Subject', accessor: (message) => message.subject },
    { header: 'Received', accessor: (message) => new Date(message.createdAt).toLocaleDateString() },
    { header: 'Status', accessor: (message) => <Badge variant={statusVariant[message.status]}>{message.status}</Badge> },
    {
      header: 'Actions',
      accessor: (message) => (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => openMessage(message)} className="text-sm font-medium text-primary hover:underline">
            View
          </button>
          {message.status !== 'replied' && (
            <button
              type="button"
              onClick={() => statusMutation.mutate({ id: message.id, nextStatus: 'replied' })}
              className="text-sm font-medium text-emerald-600 hover:underline"
            >
              Mark Replied
            </button>
          )}
          <button type="button" onClick={() => setDeleting(message)} className="text-sm font-medium text-red-600 hover:underline">
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Contact Messages</h1>
        <p className="text-muted">Enquiries submitted through the public contact form.</p>
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

      <DataTable columns={columns} rows={data?.data ?? []} keyField={(message) => message.id} isLoading={isLoading} isError={isError} emptyMessage="No messages yet." />

      {data && <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />}

      <Modal isOpen={Boolean(viewing)} onClose={() => setViewing(null)} title={viewing?.subject}>
        {viewing && (
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted">
              <Mail size={14} aria-hidden="true" />
              {viewing.name} · {viewing.email} {viewing.phone && `· ${viewing.phone}`}
            </div>
            <p className="whitespace-pre-line text-text">{viewing.message}</p>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleting)}
        title="Delete Message"
        description="Are you sure you want to delete this message? This cannot be undone."
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleting && deleteMutation.mutate(deleting.id)}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}
