import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import logoImage from '@/assets/logos/logo.png';

/**
 * Shared brand mark — logo image (rasterized from the client-supplied
 * Jobveda badge artwork) with the "Training & Placement Services" tagline
 * stacked underneath. Used in the header, dashboard sidebars, and footer so
 * the lockup only needs to be tuned responsively in one place.
 */
export function Logo() {
  return (
    <Link
      to={ROUTES.HOME}
      className="flex w-fit min-w-0 shrink-0 flex-col items-center gap-0.5"
      aria-label={`${SITE.fullName} home`}
    >
      <img
        src={logoImage}
        alt={SITE.fullName}
        className="h-9 w-auto shrink-0 object-contain sm:h-10 md:h-11"
      />
      <span className="max-w-full truncate text-[9px] font-semibold uppercase tracking-wide text-muted sm:text-[10px] md:text-[11px]">
        {SITE.subtitle}
      </span>
    </Link>
  );
}
