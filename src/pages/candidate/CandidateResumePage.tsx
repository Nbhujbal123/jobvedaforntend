import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FileText, Upload } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { fetchMyCandidateProfile, uploadResume } from '@/services/candidateService';
import { getErrorMessage } from '@/utils/getErrorMessage';

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export function CandidateResumePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['candidate', 'profile'],
    queryFn: fetchMyCandidateProfile,
  });

  const mutation = useMutation({
    mutationFn: uploadResume,
    onSuccess: (data) => {
      toast.success('Resume uploaded successfully');
      queryClient.setQueryData(['candidate', 'profile'], data);
      queryClient.invalidateQueries({ queryKey: ['candidate', 'dashboard'] });
      setSelectedFileName(null);
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not upload resume')),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Resume must be a PDF, DOC, or DOCX file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Resume must be smaller than 5MB');
      return;
    }

    setSelectedFileName(file.name);
    mutation.mutate(file);
  };

  if (isLoading) {
    return <LoadingSpinner className="min-h-[50vh]" size={28} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Resume</h1>
        <p className="text-muted">Upload your resume so employers can review it when you apply.</p>
      </div>

      <Card className="max-w-xl">
        {profile?.resumeUrl ? (
          <div className="flex items-center justify-between rounded-xl border border-secondary/10 bg-accent/40 p-4">
            <div className="flex items-center gap-3">
              <FileText size={24} className="text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-secondary">Resume uploaded</p>
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                  View current resume
                </a>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">You haven't uploaded a resume yet.</p>
        )}

        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-secondary/20 p-8 text-center">
          <Upload size={28} className="text-primary" aria-hidden="true" />
          <p className="text-sm text-muted">PDF, DOC, or DOCX up to 5MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button type="button" onClick={() => fileInputRef.current?.click()} disabled={mutation.isPending}>
            {mutation.isPending ? `Uploading ${selectedFileName ?? ''}…` : profile?.resumeUrl ? 'Replace Resume' : 'Upload Resume'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
