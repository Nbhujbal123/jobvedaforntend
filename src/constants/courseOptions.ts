import type { SelectOption } from '@/types/common.types';
import type { CourseLevel, CourseStatus } from '@/types/course.types';

export const COURSE_LEVEL_OPTIONS: (SelectOption & { value: CourseLevel })[] = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Beginner to Advanced', value: 'beginner-to-advanced' },
];

export const COURSE_MODE_OPTIONS: SelectOption[] = [
  { label: 'Online', value: 'Online' },
  { label: 'Offline', value: 'Offline' },
  { label: 'Hybrid', value: 'Hybrid' },
];

export const COURSE_STATUS_OPTIONS: (SelectOption & { value: CourseStatus })[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Unpublished', value: 'unpublished' },
];
