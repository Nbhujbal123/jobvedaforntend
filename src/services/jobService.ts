import { api } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/common.types';
import type { Job, JobPayload } from '@/types/job.types';

export interface JobListParams {
  page?: number;
  limit?: number;
  keyword?: string;
  location?: string;
  category?: string;
  jobType?: string;
  workMode?: string;
  companyId?: string;
  minExperience?: number;
  maxExperience?: number;
  minSalary?: number;
  sort?: string;
  status?: string;
}

export async function fetchJobs(params: JobListParams = {}): Promise<PaginatedResponse<Job>> {
  const { data } = await api.get<PaginatedResponse<Job>>('/jobs', { params });
  console.log("Data: ", data);
  return data;
}

export async function fetchMyJobs(params: JobListParams = {}): Promise<PaginatedResponse<Job>> {
  const { data } = await api.get<PaginatedResponse<Job>>('/jobs/mine', { params });
  return data;
}

export async function fetchAdminJobs(params: JobListParams = {}): Promise<PaginatedResponse<Job>> {
  const { data } = await api.get<PaginatedResponse<Job>>('/admin/jobs', { params });
  return data;
}

export async function fetchJobById(id: string): Promise<Job> {
  const { data } = await api.get<ApiResponse<Job>>(`/jobs/${id}`);
  return data.data;
}

export async function createJob(payload: JobPayload): Promise<Job> {
  const { data } = await api.post<ApiResponse<Job>>('/jobs', payload);
  return data.data;
}

export async function updateJob(id: string, payload: Partial<JobPayload>): Promise<Job> {
  const { data } = await api.put<ApiResponse<Job>>(`/jobs/${id}`, payload);
  return data.data;
}

export async function deleteJob(id: string): Promise<void> {
  await api.delete(`/jobs/${id}`);
}

export async function updateJobStatus(id: string, status: Job['status']): Promise<Job> {
  const { data } = await api.patch<ApiResponse<Job>>(`/jobs/${id}/status`, { status });
  return data.data;
}
