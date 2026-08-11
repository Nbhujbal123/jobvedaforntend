import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { SearchX } from 'lucide-react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Pagination } from '@/components/common/Pagination';
import { JobCard } from '@/components/jobs/JobCard';
import { Button } from '@/components/ui/Button';
import { fetchSavedJobs, unsaveJob } from '@/services/savedJobService';
import { getErrorMessage } from '@/utils/getErrorMessage';

export function CandidateSavedJobsPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['saved-jobs', 'my', { page }],
    queryFn: () => fetchSavedJobs(page),
  });

  const unsaveMutation = useMutation({
    mutationFn: unsaveJob,
    onSuccess: () => {
      toast.success('Removed from saved jobs');
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Saved Jobs</h1>
        <p className="text-muted">Jobs you've bookmarked for later.</p>
      </div>

      {isLoading && <LoadingSpinner className="py-20" size={28} />}

      {isError && <p className="text-muted">Could not load saved jobs.</p>}

      {!isLoading && !isError && data && (
        <>
          {data.data.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-20 text-center text-muted">
              <SearchX size={28} aria-hidden="true" />
              <p>You haven't saved any jobs yet.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.data.map((entry) => (
                  <div key={entry.id} className="flex flex-col gap-2">
                    <JobCard job={entry.jobId} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => unsaveMutation.mutate(entry.jobId.id)}
                      disabled={unsaveMutation.isPending}
                    >
                      Remove from Saved
                    </Button>
                  </div>
                ))}
              </div>
              <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
            </>
          )}
        </>
      )}
    </div>
  );
}
