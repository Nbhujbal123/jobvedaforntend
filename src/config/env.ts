export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'https://jobvedabackend.onrender.com/api',
} as const;
