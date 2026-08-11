import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { SITE } from '@/constants/site';

export function TopContactBar() {
  return (
    <div className="hidden bg-secondary text-white md:block">
      <Container className="flex h-10 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <a href={`tel:${SITE.contact.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary">
            <Phone size={13} aria-hidden="true" />
            {SITE.contact.phone}
          </a>
          <a href={`mailto:${SITE.contact.email}`} className="inline-flex items-center gap-1.5 hover:text-primary">
            <Mail size={13} aria-hidden="true" />
            {SITE.contact.email}
          </a>
          <span className="inline-flex items-center gap-1.5 text-white/70">
            <MapPin size={13} aria-hidden="true" />
            {SITE.contact.location}
          </span>
        </div>
        <nav aria-label="Social media" className="flex items-center gap-3 text-white/70">
          <a href={SITE.socials.linkedin} className="hover:text-primary" aria-label="LinkedIn">
            LinkedIn
          </a>
          <a href={SITE.socials.twitter} className="hover:text-primary" aria-label="Twitter">
            Twitter
          </a>
          <a href={SITE.socials.facebook} className="hover:text-primary" aria-label="Facebook">
            Facebook
          </a>
        </nav>
      </Container>
    </div>
  );
}
