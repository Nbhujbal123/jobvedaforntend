import type { SelectOption } from '@/types/common.types';
import type { ExperienceLevel, JobType, SalaryBucket, WorkMode, JobStatus } from '@/types/job.types';

export const EXPERIENCE_OPTIONS: (SelectOption & { value: ExperienceLevel })[] = [
  { label: 'Fresher', value: 'fresher' },
  { label: 'Entry Level', value: 'entry' },
  { label: 'Mid Level', value: 'mid' },
  { label: 'Senior Level', value: 'senior' },
  { label: 'Lead', value: 'lead' },
];

/** Numeric years-of-experience range each bucket maps to, used to query the API. */
export const EXPERIENCE_RANGES: Record<ExperienceLevel, { min: number; max: number }> = {
  fresher: { min: 0, max: 0 },
  entry: { min: 0, max: 2 },
  mid: { min: 2, max: 5 },
  senior: { min: 5, max: 10 },
  lead: { min: 8, max: 30 },
};

export const JOB_TYPE_OPTIONS: (SelectOption & { value: JobType })[] = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
];

export const WORK_MODE_OPTIONS: (SelectOption & { value: WorkMode })[] = [
  { label: 'Remote', value: 'remote' },
  { label: 'On-site', value: 'onsite' },
  { label: 'Hybrid', value: 'hybrid' },
];

export const JOB_STATUS_OPTIONS: (SelectOption & { value: JobStatus })[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Closed', value: 'closed' },
];

export const JOB_CATEGORY_OPTIONS: SelectOption[] = [
  { label: 'IT', value: 'IT' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Banking', value: 'Banking' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Manufacturing', value: 'Manufacturing' },
  { label: 'BPO', value: 'BPO' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'HR', value: 'HR' },
  { label: 'Marketing', value: 'Marketing' },
];

export const SALARY_BUCKETS: SalaryBucket[] = [
  { id: 'under-3', label: 'Under ₹3 LPA', min: 0, max: 3 },
  { id: '3-6', label: '₹3 - 6 LPA', min: 3, max: 6 },
  { id: '6-10', label: '₹6 - 10 LPA', min: 6, max: 10 },
  { id: '10-15', label: '₹10 - 15 LPA', min: 10, max: 15 },
  { id: '15-plus', label: '₹15 LPA+', min: 15, max: Number.POSITIVE_INFINITY },
];
