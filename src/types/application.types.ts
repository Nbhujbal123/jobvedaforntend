export type ApplicationStatus = 'applied' | 'shortlisted' | 'interview' | 'selected' | 'rejected';

export interface PopulatedJobRef {
  id: string;
  title: string;
  location?: string;
  jobType?: string;
  status?: string;
  companyId?: { id: string; name: string; logoUrl?: string };
}

export interface PopulatedCandidateRef {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

export interface PopulatedCompanyRef {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface Application {
  id: string;
  jobId: PopulatedJobRef | string;
  candidateId: PopulatedCandidateRef | string;
  companyId: PopulatedCompanyRef | string;
  resumeUrl?: string;
  coverNote?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}
