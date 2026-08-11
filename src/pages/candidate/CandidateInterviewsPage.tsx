import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CalendarClock, MapPin, Video } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Pagination } from '@/components/common/Pagination';
import { fetchMyInterviews } from '@/services/interviewService';
import type { InterviewStatus } from '@/types/interview.types';

const statusVariant: Record<InterviewStatus, 'primary' | 'neutral' | 'success'> = {
  scheduled: 'primary',
  completed: 'success',
  cancelled: 'neutral',
  rescheduled: 'neutral',
};

export function CandidateInterviewsPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['interviews', 'my', { page }],
    queryFn: () => fetchMyInterviews(page),
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Interviews</h1>
        <p className="text-muted">Your scheduled and past interviews.</p>
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
                      {typeof interview.companyId === 'string' ? '' : interview.companyId.name}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarClock size={14} aria-hidden="true" />
                        {new Date(interview.scheduledAt).toLocaleString()}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        {interview.mode === 'online' ? <Video size={14} aria-hidden="true" /> : <MapPin size={14} aria-hidden="true" />}
                        {interview.mode}
                      </span>
                    </div>
                    {interview.meetingLink && (
                      <a href={interview.meetingLink} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm text-primary hover:underline">
                        Join meeting
                      </a>
                    )}
                  </div>
                  <Badge variant={statusVariant[interview.status]}>{interview.status}</Badge>
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
