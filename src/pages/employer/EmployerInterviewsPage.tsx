import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CalendarClock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Pagination } from '@/components/common/Pagination';
import { fetchInterviews, updateInterview } from '@/services/interviewService';
import { getErrorMessage } from '@/utils/getErrorMessage';
import type { InterviewStatus } from '@/types/interview.types';

const STATUS_OPTIONS = [
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Rescheduled', value: 'rescheduled' },
];

const statusVariant: Record<InterviewStatus, 'primary' | 'neutral' | 'success'> = {
  scheduled: 'primary',
  completed: 'success',
  cancelled: 'neutral',
  rescheduled: 'neutral',
};

export function EmployerInterviewsPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['interviews', 'employer', { page }],
    queryFn: () => fetchInterviews(page),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: InterviewStatus }) => updateInterview(id, { status }),
    onSuccess: () => {
      toast.success('Interview updated');
      queryClient.invalidateQueries({ queryKey: ['interviews', 'employer'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Interviews</h1>
        <p className="text-muted">All interviews scheduled for your job listings.</p>
      </div>

      {isLoading && <LoadingSpinner className="py-20" size={28} />}

      {!isLoading && data && (
        <>
          {data.data.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
              <CalendarClock size={28} aria-hidden="true" />
              <p>No interviews scheduled yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {data.data.map((interview) => (
                <Card key={interview.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-secondary">
                      {typeof interview.jobId === 'string' ? 'Interview' : interview.jobId.title}
                    </p>
                    <p className="text-sm text-muted">
                      {typeof interview.candidateId === 'string'
                        ? ''
                        : `${interview.candidateId.firstName} ${interview.candidateId.lastName}`}
                    </p>
                    <p className="mt-1 text-sm text-muted">{new Date(interview.scheduledAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant[interview.status]}>{interview.status}</Badge>
                    <Select
                      className="h-8 w-40 text-xs"
                      options={STATUS_OPTIONS}
                      value={interview.status}
                      onChange={(event) =>
                        statusMutation.mutate({ id: interview.id, status: event.target.value as InterviewStatus })
                      }
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
