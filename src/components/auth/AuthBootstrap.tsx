import { useEffect } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { clearUser, setUser } from '@/store/slices/authSlice';
import { clearStoredToken } from '@/utils/tokenStorage';

/**
 * Runs once on app load to check whether the httpOnly session cookie is
 * still valid, and syncs the result into Redux. Renders nothing.
 */
export function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isError } = useCurrentUser();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    } else if (isError) {
      clearStoredToken();
      dispatch(clearUser());
    }
  }, [isSuccess, isError, data, dispatch]);

  return null;
}
