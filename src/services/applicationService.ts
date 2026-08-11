import { api } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/common.types';
import type { Application, ApplicationStatus } from '@/types/application.types';

export interface ApplicationListParams {
  page?: number;
  limit?: number;
  jobId?: string;
  companyId?: string;
  status?: string;
}

export async function applyToJob(jobId: string, coverNote?: string): Promise<Application> {
  const { data } = await api.post<ApiResponse<Application>>('/applications', { jobId, coverNote });
  return data.data;
}

export async function fetchMyApplications(
  params: ApplicationListParams = {},
): Promise<PaginatedResponse<Application>> {
  const { data } = await api.get<PaginatedResponse<Application>>('/applications/my', { params });
  return data;
}

export async function fetchApplications(
  params: ApplicationListParams = {},
): Promise<PaginatedResponse<Application>> {
  const { data } = await api.get<PaginatedResponse<Application>>('/applications', { params });
  return data;
}

export async function fetchAdminApplications(
  params: ApplicationListParams = {},
): Promise<PaginatedResponse<Application>> {
  const { data } = await api.get<PaginatedResponse<Application>>('/admin/applications', { params });
  return data;
}

export async function fetchApplicationById(id: string): Promise<Application> {
  const { data } = await api.get<ApiResponse<Application>>(`/applications/${id}`);
  return data.data;
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
): Promise<Application> {
  const { data } = await api.patch<ApiResponse<Application>>(`/applications/${id}/status`, { status });
  return data.data;
}
