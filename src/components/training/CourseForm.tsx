import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { COURSE_LEVEL_OPTIONS, COURSE_MODE_OPTIONS, COURSE_STATUS_OPTIONS } from '@/constants/courseOptions';
import { JOB_CATEGORY_OPTIONS } from '@/constants/jobOptions';
import type { CoursePayload } from '@/services/courseService';
import type { Course } from '@/types/course.types';

const commaToArray = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const courseFormSchema = z.object({
  title: z.string().trim().min(3, 'Title is too short'),
  category: z.string().trim().min(1, 'Category is required'),
  duration: z.string().trim().min(1, 'Duration is required'),
  price: z.number().min(0),
  instructor: z.string().trim().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'beginner-to-advanced']),
  mode: z.enum(['Online', 'Offline', 'Hybrid']),
  status: z.enum(['draft', 'published', 'unpublished']),
  shortDescription: z.string().trim().optional(),
  description: z.string().trim().min(20, 'Description should be more detailed'),
  skills: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

interface CourseFormProps {
  initialCourse?: Course;
  isSubmitting?: boolean;
  onSubmit: (payload: CoursePayload) => void;
  onCancel: () => void;
}

export function CourseForm({ initialCourse, isSubmitting, onSubmit, onCancel }: CourseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: initialCourse?.title ?? '',
      category: initialCourse?.category ?? '',
      duration: initialCourse?.duration ?? '',
      price: initialCourse?.price ?? 0,
      instructor: initialCourse?.instructor ?? '',
      level: initialCourse?.level ?? 'beginner',
      mode: initialCourse?.mode ?? 'Online',
      status: initialCourse?.status ?? 'draft',
      shortDescription: initialCourse?.shortDescription ?? '',
      description: initialCourse?.description ?? '',
      skills: initialCourse?.skills?.join(', ') ?? '',
    },
  });

  const submit = (values: CourseFormValues) => {
    onSubmit({
      title: values.title,
      category: values.category,
      duration: values.duration,
      price: values.price,
      instructor: values.instructor,
      level: values.level,
      mode: values.mode,
      status: values.status,
      shortDescription: values.shortDescription,
      description: values.description,
      skills: commaToArray(values.skills ?? ''),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
      <Input label="Course Title" placeholder="Java Full Stack Development" error={errors.title?.message} {...register('title')} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Select label="Category" placeholder="Select category" options={JOB_CATEGORY_OPTIONS} error={errors.category?.message} {...register('category')} />
        <Input label="Duration" placeholder="6 Months" error={errors.duration?.message} {...register('duration')} />
        <Input label="Price (₹)" type="number" step="1" error={errors.price?.message} {...register('price', { valueAsNumber: true })} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Select label="Level" options={COURSE_LEVEL_OPTIONS} error={errors.level?.message} {...register('level')} />
        <Select label="Mode" options={COURSE_MODE_OPTIONS} error={errors.mode?.message} {...register('mode')} />
        <Select label="Status" options={COURSE_STATUS_OPTIONS} error={errors.status?.message} {...register('status')} />
      </div>

      <Input label="Instructor" placeholder="Instructor name" {...register('instructor')} />
      <Input label="Skills (comma separated)" placeholder="Java, Spring Boot, React, MySQL" {...register('skills')} />
      <Input label="Short Description" placeholder="One-line summary shown on cards" {...register('shortDescription')} />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Full Description</label>
        <textarea
          rows={5}
          className="w-full rounded-xl border border-secondary/15 bg-white px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          {...register('description')}
        />
        {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : initialCourse ? 'Update Course' : 'Create Course'}
        </Button>
      </div>
    </form>
  );
}
