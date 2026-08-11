import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/common.types';

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.';

export function getErrorMessage(error: unknown, fallback = FALLBACK_MESSAGE): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

/**
 * Maps backend validation errors like "email: Enter a valid email address"
 * into { email: "Enter a valid email address" } so they can be attached
 * to the matching form field via react-hook-form's setError.
 */
export function getFieldErrors(error: unknown): Record<string, string> {
  if (!isAxiosError<ApiErrorResponse>(error)) return {};

  const errors = error.response?.data.errors ?? [];
  const fieldErrors: Record<string, string> = {};

  for (const raw of errors) {
    const separatorIndex = raw.indexOf(':');
    if (separatorIndex === -1) continue;

    const field = raw.slice(0, separatorIndex).trim();
    const message = raw.slice(separatorIndex + 1).trim();
    if (field && message) {
      fieldErrors[field] = message;
    }
  }

  return fieldErrors;
}
