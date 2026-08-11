import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import type { TestimonialPayload } from '@/services/testimonialService';
import type { ApiTestimonial } from '@/types/testimonial.types';

const RATING_OPTIONS = [1, 2, 3, 4, 5].map((n) => ({ label: `${n} Star${n > 1 ? 's' : ''}`, value: String(n) }));
const PUBLISH_OPTIONS = [
  { label: 'Draft', value: 'false' },
  { label: 'Published', value: 'true' },
];

const testimonialFormSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short'),
  role: z.string().trim().optional(),
  company: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Message is too short'),
  rating: z.string(),
  imageUrl: z.string().trim().optional(),
  isPublished: z.string(),
});

type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

interface TestimonialFormProps {
  initialTestimonial?: ApiTestimonial;
  isSubmitting?: boolean;
  onSubmit: (payload: TestimonialPayload) => void;
  onCancel: () => void;
}

export function TestimonialForm({ initialTestimonial, isSubmitting, onSubmit, onCancel }: TestimonialFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: initialTestimonial?.name ?? '',
      role: initialTestimonial?.role ?? '',
      company: initialTestimonial?.company ?? '',
      message: initialTestimonial?.message ?? '',
      rating: String(initialTestimonial?.rating ?? 5),
      imageUrl: initialTestimonial?.imageUrl ?? '',
      isPublished: String(initialTestimonial?.isPublished ?? false),
    },
  });

  const submit = (values: TestimonialFormValues) => {
    onSubmit({
      name: values.name,
      role: values.role,
      company: values.company,
      message: values.message,
      rating: Number(values.rating),
      imageUrl: values.imageUrl,
      isPublished: values.isPublished === 'true',
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
      <Input label="Name" placeholder="Ananya Sharma" error={errors.name?.message} {...register('name')} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Role" placeholder="Frontend Developer" {...register('role')} />
        <Input label="Company" placeholder="Nimbus Technologies" {...register('company')} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select label="Rating" options={RATING_OPTIONS} {...register('rating')} />
        <Select label="Status" options={PUBLISH_OPTIONS} {...register('isPublished')} />
      </div>
      <Input label="Image URL (optional)" placeholder="https://..." {...register('imageUrl')} />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Message</label>
        <textarea
          rows={4}
          className="w-full rounded-xl border border-secondary/15 bg-white px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          {...register('message')}
        />
        {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
      </div>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : initialTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
        </Button>
      </div>
    </form>
  );
}
