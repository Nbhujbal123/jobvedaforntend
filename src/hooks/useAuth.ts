import { useAppSelector } from '@/hooks/useAppSelector';

export function useAuth() {
  return useAppSelector((state) => state.auth);
}
