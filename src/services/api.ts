import axios from 'axios';
import { env } from '@/config/env';
import { getStoredToken } from '@/utils/tokenStorage';

export const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// The session cookie is the primary auth mechanism, but some browsers /
// privacy extensions drop cookies on cross-port requests in dev (or
// cross-subdomain in prod). Attach the token as a Bearer header too so
// requests still authenticate even when the cookie doesn't make it —
// the backend already accepts either.
api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
