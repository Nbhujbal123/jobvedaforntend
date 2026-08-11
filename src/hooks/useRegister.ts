import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerRequest } from '@/services/auth.service';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setUser } from '@/store/slices/authSlice';
import { CURRENT_USER_QUERY_KEY } from '@/hooks/useCurrentUser';
import { setStoredToken } from '@/utils/tokenStorage';

export function useRegister() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      setStoredToken(data.token);
      dispatch(setUser(data.user));
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, data.user);
    },
  });
}
