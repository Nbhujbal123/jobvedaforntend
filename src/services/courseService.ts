import { api } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/common.types';
import type { Course } from '@/types/course.types';

export interface CoursePayload {
  title: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  duration: string;
  price: number;
  instructor?: string;
  skills: string[];
  category: string;
  level: string;
  mode: string;
  status: string;
}

export interface CourseListParams {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
  status?: string;
}

export async function fetchCourses(params: CourseListParams = {}): Promise<PaginatedResponse<Course>> {
  const { data } = await api.get<PaginatedResponse<Course>>('/courses', { params });
  return data;
}

export async function fetchAdminCourses(params: CourseListParams = {}): Promise<PaginatedResponse<Course>> {
  const { data } = await api.get<PaginatedResponse<Course>>('/admin/courses', { params });
  return data;
}

export async function fetchCourseById(id: string): Promise<Course> {
  const { data } = await api.get<ApiResponse<Course>>(`/courses/${id}`);
  return data.data;
}

export async function createCourse(payload: CoursePayload): Promise<Course> {
  const { data } = await api.post<ApiResponse<Course>>('/courses', payload);
  return data.data;
}

export async function updateCourse(id: string, payload: Partial<CoursePayload>): Promise<Course> {
  const { data } = await api.put<ApiResponse<Course>>(`/courses/${id}`, payload);
  return data.data;
}

export async function deleteCourse(id: string): Promise<void> {
  await api.delete(`/courses/${id}`);
}

export async function updateCourseStatus(id: string, status: string): Promise<Course> {
  const { data } = await api.patch<ApiResponse<Course>>(`/courses/${id}/status`, { status });
  return data.data;
}
