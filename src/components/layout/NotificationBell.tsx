import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMyNotifications, markAllNotificationsRead, markNotificationRead } from '@/services/notificationService';
import { cn } from '@/utils/cn';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['notifications', 'mine'],
    queryFn: () => fetchMyNotifications(1, 8),
    refetchInterval: 60_000,
  });

  const handleOpen = () => setIsOpen((prev) => !prev);

  const handleMarkAll = async () => {
    await markAllNotificationsRead();
    queryClient.invalidateQueries({ queryKey: ['notifications', 'mine'] });
  };

  const handleItemClick = async (id: string) => {
    await markNotificationRead(id);
    queryClient.invalidateQueries({ queryKey: ['notifications', 'mine'] });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Notifications"
        aria-expanded={isOpen}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-secondary/15 text-secondary hover:border-primary hover:text-primary"
      >
        <Bell size={18} aria-hidden="true" />
        {Boolean(data?.unreadCount) && (
          <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
            {data && data.unreadCount > 9 ? '9+' : data?.unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2.5rem)] rounded-[16px] border border-secondary/10 bg-white p-3 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="text-sm font-semibold text-secondary">Notifications</span>
              <button type="button" onClick={handleMarkAll} className="text-xs font-medium text-primary hover:underline">
                Mark all read
              </button>
            </div>
            <div className="flex max-h-80 flex-col gap-1 overflow-y-auto">
              {!data || data.data.length === 0 ? (
                <p className="px-1 py-6 text-center text-sm text-muted">No notifications yet.</p>
              ) : (
                data.data.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => handleItemClick(notification.id)}
                    className={cn(
                      'flex flex-col gap-0.5 rounded-xl px-3 py-2 text-left hover:bg-accent',
                      !notification.isRead && 'bg-accent/60',
                    )}
                  >
                    <span className="text-sm font-medium text-secondary">{notification.title}</span>
                    <span className="text-xs text-muted">{notification.message}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
