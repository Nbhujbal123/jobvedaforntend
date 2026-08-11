import { api } from '@/services/api';
import type { ApiResponse } from '@/types/common.types';
import type { AuthResponseData, AuthUser, LoginPayload, RegisterPayload } from '@/types/auth.types';

export async function registerRequest(payload: RegisterPayload): Promise<AuthResponseData> {
  const { data } = await api.post<ApiResponse<AuthResponseData>>('/auth/register', payload);
  return data.data;
}

export async function loginRequest(payload: LoginPayload): Promise<AuthResponseData> {
  const { data } = await api.post<ApiResponse<AuthResponseData>>('/auth/login', payload);
  return data.data;
}

export async function logoutRequest(): Promise<void> {
  await api.post('/auth/logout');
}

export async function getCurrentUserRequest(): Promise<AuthUser> {
  const { data } = await api.get<ApiResponse<{ user: AuthUser }>>('/auth/me');
  return data.data.user;
}

export async function changePasswordRequest(payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  await api.post('/auth/change-password', payload);
}
