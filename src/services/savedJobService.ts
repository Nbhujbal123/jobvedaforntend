import { api } from '@/services/api';
import type { PaginatedResponse } from '@/types/common.types';
import type { Job } from '@/types/job.types';

export interface SavedJobEntry {
  id: string;
  jobId: Job;
  createdAt: string;
}

export async function fetchSavedJobs(page = 1, limit = 12): Promise<PaginatedResponse<SavedJobEntry>> {
  const { data } = await api.get<PaginatedResponse<SavedJobEntry>>('/saved-jobs', { params: { page, limit } });
  return data;
}

export async function saveJob(jobId: string): Promise<void> {
  await api.post(`/saved-jobs/${jobId}`);
}

export async function unsaveJob(jobId: string): Promise<void> {
  await api.delete(`/saved-jobs/${jobId}`);
}
