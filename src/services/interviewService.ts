import { api } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/common.types';
import type { Interview } from '@/types/interview.types';

export interface InterviewPayload {
  applicationId: string;
  scheduledAt: string;
  mode: string;
  location?: string;
  meetingLink?: string;
  notes?: string;
}

export async function fetchMyInterviews(page = 1, limit = 12): Promise<PaginatedResponse<Interview>> {
  const { data } = await api.get<PaginatedResponse<Interview>>('/interviews/my', { params: { page, limit } });
  return data;
}

export async function fetchInterviews(page = 1, limit = 12): Promise<PaginatedResponse<Interview>> {
  const { data } = await api.get<PaginatedResponse<Interview>>('/interviews', { params: { page, limit } });
  return data;
}

export async function scheduleInterview(payload: InterviewPayload): Promise<Interview> {
  const { data } = await api.post<ApiResponse<Interview>>('/interviews', payload);
  return data.data;
}

export async function updateInterview(id: string, payload: Partial<InterviewPayload & { status: string }>): Promise<Interview> {
  const { data } = await api.patch<ApiResponse<Interview>>(`/interviews/${id}`, payload);
  return data.data;
}
