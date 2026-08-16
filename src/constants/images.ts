import heroBg from '@/assets/images/backgrounds/hero-bg.svg';
import aboutBg from '@/assets/images/backgrounds/about-bg.svg';
import trainingBg from '@/assets/images/backgrounds/training-bg.svg';
import contactBg from '@/assets/images/backgrounds/contact-bg.svg';
import ctaBg from '@/assets/images/backgrounds/cta-bg.svg';

/**
 * Central registry for section background imagery.
 *
 * These currently point at lightweight abstract placeholder graphics (see
 * src/assets/images/backgrounds/*.svg) so every section already renders a
 * finished, on-brand background. Swap in real photography by replacing the
 * files below — recommended replacements (same key, .webp, 1600-1920px wide)
 * are listed in the project README/handoff notes. No other code needs to
 * change when the files are swapped.
 */
export const backgroundImages = {
  hero: heroBg,
  about: aboutBg,
  /** Reused for Companies/recruitment sections — both call for a subtle, light corporate backdrop. */
  companies: aboutBg,
  training: trainingBg,
  contact: contactBg,
  cta: ctaBg,
} as const;
