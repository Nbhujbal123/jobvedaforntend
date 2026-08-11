import { api } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/common.types';
import type { AdminDashboardStats } from '@/types/admin.types';
import type { AuthUser, UserRole } from '@/types/auth.types';

export interface AdminUserListParams {
  page?: number;
  limit?: number;
  role?: UserRole;
  isActive?: boolean;
  search?: string;
}

export async function fetchAdminDashboard(): Promise<AdminDashboardStats> {
  const { data } = await api.get<ApiResponse<AdminDashboardStats>>('/admin/dashboard');
  return data.data;
}

export async function fetchAdminUsers(params: AdminUserListParams = {}): Promise<PaginatedResponse<AuthUser>> {
  const { data } = await api.get<PaginatedResponse<AuthUser>>('/admin/users', { params });
  return data;
}

export async function activateUser(id: string): Promise<AuthUser> {
  const { data } = await api.patch<ApiResponse<AuthUser>>(`/admin/users/${id}/activate`);
  return data.data;
}

export async function deactivateUser(id: string): Promise<AuthUser> {
  const { data } = await api.patch<ApiResponse<AuthUser>>(`/admin/users/${id}/deactivate`);
  return data.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/admin/users/${id}`);
}
