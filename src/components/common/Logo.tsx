import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';

/**
 * Temporary text wordmark — no Jobveda logo file exists in the project yet.
 * Swap for <img src={logo} alt={SITE.fullName} /> once the real logo asset is provided.
 */
export function Logo() {
  return (
    <Link to={ROUTES.HOME} className="flex items-center gap-2" aria-label={`${SITE.fullName} home`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold text-white">
        J
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-xl font-bold text-secondary">{SITE.name}</span>
        <span className="hidden text-[11px] font-medium text-muted sm:block">{SITE.subtitle}</span>
      </span>
    </Link>
  );
}
