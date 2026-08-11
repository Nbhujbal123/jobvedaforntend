import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { fetchMyCandidateProfile, updateMyCandidateProfile } from '@/services/candidateService';
import { getErrorMessage } from '@/utils/getErrorMessage';

const profileSchema = z.object({
  headline: z.string().trim().optional(),
  skills: z.string().optional(),
  experience: z.string().trim().optional(),
  education: z.string().trim().optional(),
  location: z.string().trim().optional(),
  expectedSalary: z.union([z.number(), z.nan()]).optional(),
  bio: z.string().trim().optional(),
  linkedinUrl: z.string().trim().optional(),
  portfolioUrl: z.string().trim().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const commaToArray = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export function CandidateProfilePage() {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['candidate', 'profile'],
    queryFn: fetchMyCandidateProfile,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: profile
      ? {
          headline: profile.headline ?? '',
          skills: profile.skills.join(', '),
          experience: profile.experience ?? '',
          education: profile.education ?? '',
          location: profile.location ?? '',
          expectedSalary: profile.expectedSalary,
          bio: profile.bio ?? '',
          linkedinUrl: profile.linkedinUrl ?? '',
          portfolioUrl: profile.portfolioUrl ?? '',
        }
      : undefined,
  });

  const mutation = useMutation({
    mutationFn: updateMyCandidateProfile,
    onSuccess: (data) => {
      toast.success('Profile updated successfully');
      queryClient.setQueryData(['candidate', 'profile'], data);
      queryClient.invalidateQueries({ queryKey: ['candidate', 'dashboard'] });
      reset();
    },
    onError: (error) => toast.error(getErrorMessage(error, 'Could not update profile')),
  });

  const onSubmit = (values: ProfileFormValues) => {
    mutation.mutate({
      headline: values.headline,
      skills: commaToArray(values.skills ?? ''),
      experience: values.experience,
      education: values.education,
      location: values.location,
      expectedSalary: Number.isNaN(values.expectedSalary) ? undefined : values.expectedSalary,
      bio: values.bio,
      linkedinUrl: values.linkedinUrl,
      portfolioUrl: values.portfolioUrl,
    });
  };

  if (isLoading) {
    return <LoadingSpinner className="min-h-[50vh]" size={28} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">My Profile</h1>
        <p className="text-muted">Keep your profile updated to improve your job matches.</p>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          <Input label="Headline" placeholder="Frontend Developer with 3 years of experience" {...register('headline')} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Experience" placeholder="3 years" {...register('experience')} />
            <Input label="Education" placeholder="B.Tech in Computer Science" {...register('education')} />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Location" placeholder="Pune, India" {...register('location')} />
            <Input
              label="Expected Salary (LPA)"
              type="number"
              step="0.5"
              {...register('expectedSalary', { valueAsNumber: true })}
            />
          </div>
          <Input label="Skills (comma separated)" placeholder="React, TypeScript, Node.js" {...register('skills')} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="LinkedIn URL" placeholder="https://linkedin.com/in/..." {...register('linkedinUrl')} />
            <Input label="Portfolio URL" placeholder="https://..." {...register('portfolioUrl')} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-secondary">Bio</label>
            <textarea
              rows={4}
              className="w-full rounded-xl border border-secondary/15 bg-white px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              {...register('bio')}
            />
          </div>
          {errors.expectedSalary && <span className="text-xs text-red-500">{errors.expectedSalary.message}</span>}
          <Button type="submit" disabled={mutation.isPending} className="w-fit">
            {mutation.isPending ? 'Saving…' : 'Save Profile'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
