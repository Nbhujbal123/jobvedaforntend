import { api } from '@/services/api';
import type { ApiResponse, PaginatedResponse } from '@/types/common.types';
import type { Company, CompanyPayload } from '@/types/company.types';

export interface CompanyListParams {
  page?: number;
  limit?: number;
  keyword?: string;
  industry?: string;
  location?: string;
  companySize?: string;
  verified?: boolean;
}

export async function fetchCompanies(params: CompanyListParams = {}): Promise<PaginatedResponse<Company>> {
  const { data } = await api.get<PaginatedResponse<Company>>('/companies', { params });
  return data;
}

export async function fetchAdminCompanies(
  params: CompanyListParams = {},
): Promise<PaginatedResponse<Company>> {
  const { data } = await api.get<PaginatedResponse<Company>>('/admin/companies', { params });
  return data;
}

export async function fetchCompanyById(id: string): Promise<Company> {
  const { data } = await api.get<ApiResponse<Company>>(`/companies/${id}`);
  return data.data;
}

export async function fetchMyCompany(): Promise<Company | null> {
  const { data } = await api.get<ApiResponse<Company | null>>('/companies/me');
  return data.data;
}

export async function createCompany(payload: CompanyPayload): Promise<Company> {
  const { data } = await api.post<ApiResponse<Company>>('/companies', payload);
  return data.data;
}

export async function updateCompany(id: string, payload: Partial<CompanyPayload>): Promise<Company> {
  const { data } = await api.put<ApiResponse<Company>>(`/companies/${id}`, payload);
  return data.data;
}

export async function deleteCompany(id: string): Promise<void> {
  await api.delete(`/companies/${id}`);
}

export async function verifyCompany(id: string, isVerified: boolean): Promise<Company> {
  const { data } = await api.patch<ApiResponse<Company>>(`/companies/${id}/verify`, { isVerified });
  return data.data;
}

export async function uploadCompanyLogo(id: string, file: File): Promise<Company> {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post<ApiResponse<Company>>(`/companies/${id}/logo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}
