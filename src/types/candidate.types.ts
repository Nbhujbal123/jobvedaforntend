export interface CandidateProfile {
  id: string;
  userId: string | { id: string; firstName: string; lastName: string; email: string; phone?: string };
  headline?: string;
  skills: string[];
  experience?: string;
  education?: string;
  location?: string;
  expectedSalary?: number;
  resumeUrl?: string;
  profileImage?: string;
  bio?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  profileCompletion: number;
}

export interface CandidateDashboardStats {
  profileCompletion: number;
  appliedJobsCount: number;
  savedJobsCount: number;
  upcomingInterviewsCount: number;
  applicationsByStatus: Record<string, number>;
}
