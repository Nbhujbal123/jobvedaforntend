import { api } from '@/services/api';
import type { PaginatedResponse } from '@/types/common.types';
import type { ContactMessage, ContactMessageStatus, ContactPayload } from '@/types/contact.types';

export async function submitContactMessage(payload: ContactPayload): Promise<void> {
  await api.post('/contact', payload);
}

export async function fetchContactMessages(
  page = 1,
  limit = 12,
  status?: string,
): Promise<PaginatedResponse<ContactMessage>> {
  const { data } = await api.get<PaginatedResponse<ContactMessage>>('/contact', {
    params: { page, limit, status },
  });
  return data;
}

export async function updateContactStatus(id: string, status: ContactMessageStatus): Promise<void> {
  await api.patch(`/contact/${id}/status`, { status });
}

export async function deleteContactMessage(id: string): Promise<void> {
  await api.delete(`/contact/${id}`);
}
