import { api } from '@/services/api';
import type { ApiResponse } from '@/types/common.types';
import type { CandidateDashboardStats, CandidateProfile } from '@/types/candidate.types';

export interface CandidateProfilePayload {
  headline?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  location?: string;
  expectedSalary?: number;
  bio?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export async function fetchMyCandidateProfile(): Promise<CandidateProfile> {
  const { data } = await api.get<ApiResponse<CandidateProfile>>('/candidate/profile');
  return data.data;
}

export async function updateMyCandidateProfile(
  payload: CandidateProfilePayload,
): Promise<CandidateProfile> {
  const { data } = await api.put<ApiResponse<CandidateProfile>>('/candidate/profile', payload);
  return data.data;
}

export async function uploadResume(file: File): Promise<CandidateProfile> {
  const formData = new FormData();
  formData.append('resume', file);
  const { data } = await api.post<ApiResponse<CandidateProfile>>('/candidate/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export async function fetchCandidateDashboard(): Promise<CandidateDashboardStats> {
  const { data } = await api.get<ApiResponse<CandidateDashboardStats>>('/candidate/dashboard');
  return data.data;
}

export async function fetchCandidateProfileForManager(userId: string): Promise<CandidateProfile> {
  const { data } = await api.get<ApiResponse<CandidateProfile>>(`/candidate/${userId}/profile`);
  return data.data;
}
