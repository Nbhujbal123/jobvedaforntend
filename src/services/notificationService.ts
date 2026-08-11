import { api } from '@/services/api';
import type { PaginatedResponse } from '@/types/common.types';
import type { AppNotification } from '@/types/notification.types';

export interface NotificationListResponse extends PaginatedResponse<AppNotification> {
  unreadCount: number;
}

export async function fetchMyNotifications(page = 1, limit = 10): Promise<NotificationListResponse> {
  const { data } = await api.get<NotificationListResponse>('/notifications', { params: { page, limit } });
  return data;
}

export async function markNotificationRead(id: string): Promise<void> {
  await api.patch(`/notifications/${id}/read`);
}

export async function markAllNotificationsRead(): Promise<void> {
  await api.patch('/notifications/read-all');
}
