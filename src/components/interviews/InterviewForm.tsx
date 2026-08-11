import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import type { InterviewPayload } from '@/services/interviewService';

const MODE_OPTIONS = [
  { label: 'Online', value: 'online' },
  { label: 'In Person', value: 'in-person' },
  { label: 'Phone', value: 'phone' },
];

const interviewFormSchema = z.object({
  scheduledAt: z.string().min(1, 'Pick a date and time'),
  mode: z.enum(['online', 'in-person', 'phone']),
  location: z.string().trim().optional(),
  meetingLink: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

type InterviewFormValues = z.infer<typeof interviewFormSchema>;

interface InterviewFormProps {
  applicationId: string;
  isSubmitting?: boolean;
  onSubmit: (payload: InterviewPayload) => void;
  onCancel: () => void;
}

export function InterviewForm({ applicationId, isSubmitting, onSubmit, onCancel }: InterviewFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewFormSchema),
    defaultValues: { scheduledAt: '', mode: 'online', location: '', meetingLink: '', notes: '' },
  });

  const submit = (values: InterviewFormValues) => {
    onSubmit({
      applicationId,
      scheduledAt: new Date(values.scheduledAt).toISOString(),
      mode: values.mode,
      location: values.location,
      meetingLink: values.meetingLink,
      notes: values.notes,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
      <Input label="Date & Time" type="datetime-local" error={errors.scheduledAt?.message} {...register('scheduledAt')} />
      <Select label="Mode" options={MODE_OPTIONS} {...register('mode')} />
      <Input label="Meeting Link (for online)" placeholder="https://meet.google.com/..." {...register('meetingLink')} />
      <Input label="Location (for in-person)" placeholder="Office address" {...register('location')} />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Notes</label>
        <textarea
          rows={3}
          className="w-full rounded-xl border border-secondary/15 bg-white px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          {...register('notes')}
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Scheduling…' : 'Schedule Interview'}
        </Button>
      </div>
    </form>
  );
}
