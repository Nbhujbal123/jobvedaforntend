export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  industry?: string;
  location?: string;
  website?: string;
  description?: string;
  companySize?: string;
  isVerified: boolean;
  ownerId?: string;
  openJobsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyPayload {
  name: string;
  logoUrl?: string;
  industry?: string;
  location?: string;
  website?: string;
  description?: string;
  companySize?: string;
}
