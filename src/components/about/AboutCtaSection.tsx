import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Reveal } from '@/components/common/Reveal';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';

export function AboutCtaSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <Container className="flex flex-col gap-8">
        <Reveal className="flex flex-col items-center gap-6 rounded-[16px] bg-primary px-6 py-14 text-center text-white sm:px-16">
          <h2 className="max-w-xl text-3xl font-bold md:text-4xl">
            Ready to take the next step in your career?
          </h2>
          <p className="max-w-lg text-white/85">
            Explore opportunities, build your profile, and move closer to your career goals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to={ROUTES.JOBS}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-base font-semibold text-primary transition-colors duration-200 hover:bg-white/90"
            >
              Find Jobs
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-white/40 px-8 text-base font-semibold text-white transition-colors duration-200 hover:border-white"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-1 gap-4 rounded-[16px] border border-secondary/10 bg-white p-6 shadow-[var(--shadow-soft)] sm:grid-cols-3 sm:items-center">
          <a href={`tel:${SITE.contact.phone}`} className="flex items-center gap-3 text-sm text-secondary hover:text-primary">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
              <Phone size={16} aria-hidden="true" />
            </span>
            {SITE.contact.phone}
          </a>
          <a href={`mailto:${SITE.contact.email}`} className="flex items-center gap-3 text-sm text-secondary hover:text-primary">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
              <Mail size={16} aria-hidden="true" />
            </span>
            {SITE.contact.email}
          </a>
          <span className="flex items-center gap-3 text-sm text-secondary">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
              <MapPin size={16} aria-hidden="true" />
            </span>
            {SITE.contact.location}
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
