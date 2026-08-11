export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';

export type ExperienceLevel = 'fresher' | 'entry' | 'mid' | 'senior' | 'lead';

export type WorkMode = 'remote' | 'onsite' | 'hybrid';

export type JobStatus = 'draft' | 'published' | 'closed';

export interface Job {
  id: string;
  title: string;
  companyId?: string;
  companyName: string;
  companyLogoUrl?: string;
  location: string;
  workMode?: WorkMode;
  jobType: JobType;
  /** Bucketed level shown on the homepage mock cards; real API jobs carry experienceMin/Max instead. */
  experienceLevel?: ExperienceLevel;
  experienceMin?: number;
  experienceMax?: number;
  /** Annual salary bounds in LPA (lakhs per annum). */
  salaryMin: number;
  salaryMax: number;
  category: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  applicationDeadline?: string;
  status?: JobStatus;
  postedAt: string;
}

export interface JobPayload {
  title: string;
  companyId: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  category: string;
  location: string;
  workMode: WorkMode;
  jobType: JobType;
  salaryMin: number;
  salaryMax: number;
  experienceMin: number;
  experienceMax: number;
  applicationDeadline?: string;
  status: JobStatus;
}

export interface JobSearchFilters {
  keyword?: string;
  location?: string;
  experience?: ExperienceLevel;
  jobType?: JobType;
  /** Id of a SALARY_BUCKETS entry. */
  salary?: string;
  /** Id of a JOB_CATEGORIES entry (from constants/homeData). */
  category?: string;
}

export interface JobCategory {
  id: string;
  name: string;
  openRoles: number;
}

export interface SalaryBucket {
  id: string;
  label: string;
  min: number;
  max: number;
}
