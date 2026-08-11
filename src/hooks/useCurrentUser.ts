import { useQuery } from '@tanstack/react-query';
import { getCurrentUserRequest } from '@/services/auth.service';

export const CURRENT_USER_QUERY_KEY = ['auth', 'me'] as const;

export function useCurrentUser() {
  return useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: getCurrentUserRequest,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
