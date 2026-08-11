import type { SVGProps } from 'react';

/**
 * lucide-react dropped brand/social icons in this project's installed
 * version, so these small inline glyphs fill that gap for the footer.
 */
export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4.01c-.88.4-1.83.67-2.83.8a4.9 4.9 0 0 0 2.15-2.72 9.72 9.72 0 0 1-3.13 1.2 4.86 4.86 0 0 0-8.28 4.43A13.8 13.8 0 0 1 1.67 3.15a4.86 4.86 0 0 0 1.5 6.48 4.83 4.83 0 0 1-2.2-.6v.06a4.86 4.86 0 0 0 3.9 4.77 4.9 4.9 0 0 1-2.19.08 4.87 4.87 0 0 0 4.54 3.38A9.75 9.75 0 0 1 0 19.54a13.75 13.75 0 0 0 7.44 2.18c8.93 0 13.82-7.4 13.82-13.82 0-.21 0-.42-.02-.63A9.9 9.9 0 0 0 24 4.59a9.7 9.7 0 0 1-2.82.78z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
