import { api } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/common.types';
import type { Blog } from '@/types/blog.types';

export interface BlogPayload {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  category: string;
  tags: string[];
  author: string;
  status: string;
}

export interface BlogListParams {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
}

export async function fetchBlogs(params: BlogListParams = {}): Promise<PaginatedResponse<Blog>> {
  const { data } = await api.get<PaginatedResponse<Blog>>('/blogs', { params });
  return data;
}

export async function fetchAdminBlogs(params: BlogListParams = {}): Promise<PaginatedResponse<Blog>> {
  const { data } = await api.get<PaginatedResponse<Blog>>('/admin/blogs', { params });
  return data;
}

export async function fetchBlogBySlug(slug: string): Promise<Blog> {
  const { data } = await api.get<ApiResponse<Blog>>(`/blogs/${slug}`);
  return data.data;
}

export async function createBlog(payload: BlogPayload): Promise<Blog> {
  const { data } = await api.post<ApiResponse<Blog>>('/blogs', payload);
  return data.data;
}

export async function updateBlog(id: string, payload: Partial<BlogPayload>): Promise<Blog> {
  const { data } = await api.put<ApiResponse<Blog>>(`/blogs/${id}`, payload);
  return data.data;
}

export async function deleteBlog(id: string): Promise<void> {
  await api.delete(`/blogs/${id}`);
}

export async function updateBlogStatus(id: string, status: string): Promise<Blog> {
  const { data } = await api.patch<ApiResponse<Blog>>(`/blogs/${id}/status`, { status });
  return data.data;
}
