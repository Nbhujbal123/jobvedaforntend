import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import {
  JOB_CATEGORY_OPTIONS,
  JOB_STATUS_OPTIONS,
  JOB_TYPE_OPTIONS,
  WORK_MODE_OPTIONS,
} from '@/constants/jobOptions';
import type { Job, JobPayload } from '@/types/job.types';
import type { SelectOption } from '@/types/common.types';

const linesToArray = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const commaToArray = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const jobFormSchema = z
  .object({
    title: z.string().trim().min(3, 'Job title is too short'),
    companyId: z.string().trim().min(1, 'Select a company'),
    category: z.string().trim().min(1, 'Category is required'),
    location: z.string().trim().min(1, 'Location is required'),
    workMode: z.enum(['remote', 'onsite', 'hybrid']),
    jobType: z.enum(['full-time', 'part-time', 'contract', 'internship']),
    salaryMin: z.number().min(0),
    salaryMax: z.number().min(0),
    experienceMin: z.number().min(0),
    experienceMax: z.number().min(0),
    applicationDeadline: z.string().optional(),
    status: z.enum(['draft', 'published', 'closed']),
    description: z.string().trim().min(20, 'Description should be more detailed'),
    responsibilities: z.string().optional(),
    requirements: z.string().optional(),
    skills: z.string().optional(),
  })
  .refine((values) => values.salaryMax >= values.salaryMin, {
    message: 'Max salary must be greater than min salary',
    path: ['salaryMax'],
  })
  .refine((values) => values.experienceMax >= values.experienceMin, {
    message: 'Max experience must be greater than min experience',
    path: ['experienceMax'],
  });

type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobFormProps {
  initialJob?: Job;
  companies: SelectOption[];
  lockCompanyId?: string;
  isSubmitting?: boolean;
  onSubmit: (payload: JobPayload) => void;
  onCancel: () => void;
}

export function JobForm({ initialJob, companies, lockCompanyId, isSubmitting, onSubmit, onCancel }: JobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: initialJob?.title ?? '',
      companyId: lockCompanyId ?? initialJob?.companyId ?? '',
      category: initialJob?.category ?? '',
      location: initialJob?.location ?? '',
      workMode: initialJob?.workMode ?? 'onsite',
      jobType: initialJob?.jobType ?? 'full-time',
      salaryMin: initialJob?.salaryMin ?? 0,
      salaryMax: initialJob?.salaryMax ?? 0,
      experienceMin: initialJob?.experienceMin ?? 0,
      experienceMax: initialJob?.experienceMax ?? 0,
      applicationDeadline: initialJob?.applicationDeadline
        ? initialJob.applicationDeadline.slice(0, 10)
        : '',
      status: initialJob?.status ?? 'published',
      description: initialJob?.description ?? '',
      responsibilities: initialJob?.responsibilities.join('\n') ?? '',
      requirements: initialJob?.requirements.join('\n') ?? '',
      skills: initialJob?.skills.join(', ') ?? '',
    },
  });

  const submit = (values: JobFormValues) => {
    onSubmit({
      title: values.title,
      companyId: values.companyId,
      category: values.category,
      location: values.location,
      workMode: values.workMode,
      jobType: values.jobType,
      salaryMin: values.salaryMin,
      salaryMax: values.salaryMax,
      experienceMin: values.experienceMin,
      experienceMax: values.experienceMax,
      applicationDeadline: values.applicationDeadline || undefined,
      status: values.status,
      description: values.description,
      responsibilities: linesToArray(values.responsibilities ?? ''),
      requirements: linesToArray(values.requirements ?? ''),
      skills: commaToArray(values.skills ?? ''),
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
      <Input label="Job Title" placeholder="Java Full Stack Developer" error={errors.title?.message} {...register('title')} />

      <Select
        label="Company"
        placeholder="Select a company"
        options={companies}
        error={errors.companyId?.message}
        disabled={Boolean(lockCompanyId)}
        {...register('companyId')}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select
          label="Category"
          placeholder="Select category"
          options={JOB_CATEGORY_OPTIONS}
          error={errors.category?.message}
          {...register('category')}
        />
        <Input label="Location" placeholder="Pune" error={errors.location?.message} {...register('location')} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select label="Work Mode" options={WORK_MODE_OPTIONS} error={errors.workMode?.message} {...register('workMode')} />
        <Select label="Job Type" options={JOB_TYPE_OPTIONS} error={errors.jobType?.message} {...register('jobType')} />
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        <Input label="Min Salary (LPA)" type="number" step="0.1" error={errors.salaryMin?.message} {...register('salaryMin', { valueAsNumber: true })} />
        <Input label="Max Salary (LPA)" type="number" step="0.1" error={errors.salaryMax?.message} {...register('salaryMax', { valueAsNumber: true })} />
        <Input label="Min Experience (yrs)" type="number" step="0.5" error={errors.experienceMin?.message} {...register('experienceMin', { valueAsNumber: true })} />
        <Input label="Max Experience (yrs)" type="number" step="0.5" error={errors.experienceMax?.message} {...register('experienceMax', { valueAsNumber: true })} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Application Deadline" type="date" error={errors.applicationDeadline?.message} {...register('applicationDeadline')} />
        <Select label="Status" options={JOB_STATUS_OPTIONS} error={errors.status?.message} {...register('status')} />
      </div>

      <Input label="Skills (comma separated)" placeholder="Java, Spring Boot, React, MySQL" {...register('skills')} />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Description</label>
        <textarea
          rows={4}
          className="w-full rounded-xl border border-secondary/15 bg-white px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          {...register('description')}
        />
        {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Responsibilities (one per line)</label>
        <textarea
          rows={3}
          className="w-full rounded-xl border border-secondary/15 bg-white px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          {...register('responsibilities')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-secondary">Requirements (one per line)</label>
        <textarea
          rows={3}
          className="w-full rounded-xl border border-secondary/15 bg-white px-4 py-3 text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          {...register('requirements')}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : initialJob ? 'Update Job' : 'Create Job'}
        </Button>
      </div>
    </form>
  );
}
