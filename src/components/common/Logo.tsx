import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';

/**
 * Temporary text wordmark — no Jobveda logo file exists in the project yet.
 * Swap for <img src={logo} alt={SITE.name} /> once the real logo asset is provided.
 */
export function Logo() {
  return (
    <Link to={ROUTES.HOME} className="flex items-center gap-2" aria-label={`${SITE.name} home`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-base font-bold text-white">
        J
      </span>
      <span className="text-xl font-bold text-secondary">{SITE.name}</span>
    </Link>
  );
}
