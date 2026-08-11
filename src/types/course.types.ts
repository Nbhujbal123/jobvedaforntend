export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'beginner-to-advanced';

export type CourseStatus = 'draft' | 'published' | 'unpublished';

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  description?: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  price?: number;
  instructor?: string;
  skills?: string[];
  level?: CourseLevel;
  status?: CourseStatus;
  createdAt?: string;
}
