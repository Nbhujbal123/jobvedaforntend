import { useEffect } from 'react';
import { SITE } from '@/constants/site';

/**
 * Lightweight SEO helper — no react-helmet dependency needed for two pages.
 * Restores the previous title/description on unmount so navigating away
 * (e.g. via client-side routing) doesn't leave a stale tag behind.
 */
export function usePageMeta(title: string, description?: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | ${SITE.fullName}`;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = meta?.getAttribute('content') ?? undefined;

    if (description) {
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (description && meta && previousDescription !== undefined) {
        meta.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}
