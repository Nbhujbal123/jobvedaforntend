import { api } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/common.types';
import type { ApiTestimonial } from '@/types/testimonial.types';

export interface TestimonialPayload {
  name: string;
  role?: string;
  company?: string;
  message: string;
  rating: number;
  imageUrl?: string;
  isPublished: boolean;
}

export async function fetchTestimonials(page = 1, limit = 12): Promise<PaginatedResponse<ApiTestimonial>> {
  const { data } = await api.get<PaginatedResponse<ApiTestimonial>>('/testimonials', { params: { page, limit } });
  return data;
}

export async function fetchAdminTestimonials(
  page = 1,
  limit = 12,
): Promise<PaginatedResponse<ApiTestimonial>> {
  const { data } = await api.get<PaginatedResponse<ApiTestimonial>>('/admin/testimonials', {
    params: { page, limit },
  });
  return data;
}

export async function createTestimonial(payload: TestimonialPayload): Promise<ApiTestimonial> {
  const { data } = await api.post<ApiResponse<ApiTestimonial>>('/testimonials', payload);
  return data.data;
}

export async function updateTestimonial(
  id: string,
  payload: Partial<TestimonialPayload>,
): Promise<ApiTestimonial> {
  const { data } = await api.put<ApiResponse<ApiTestimonial>>(`/testimonials/${id}`, payload);
  return data.data;
}

export async function deleteTestimonial(id: string): Promise<void> {
  await api.delete(`/testimonials/${id}`);
}
