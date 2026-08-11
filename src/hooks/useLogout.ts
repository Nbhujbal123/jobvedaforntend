import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutRequest } from '@/services/auth.service';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { clearUser } from '@/store/slices/authSlice';
import { CURRENT_USER_QUERY_KEY } from '@/hooks/useCurrentUser';
import { clearStoredToken } from '@/utils/tokenStorage';

export function useLogout() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    // Runs whether the request succeeds or fails — the user's intent is to
    // be logged out locally either way, never leave the UI stuck as "authenticated".
    onSettled: () => {
      clearStoredToken();
      dispatch(clearUser());
      queryClient.removeQueries({ queryKey: CURRENT_USER_QUERY_KEY });
    },
  });
}
