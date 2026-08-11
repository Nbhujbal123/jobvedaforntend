import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Reveal } from '@/components/common/Reveal';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';

export function ContactCtaSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 rounded-[16px] bg-primary px-6 py-14 text-center text-white sm:px-16">
          <h2 className="max-w-xl text-3xl font-bold md:text-4xl">
            Ready to take the next step in your career or hiring journey?
          </h2>
          <p className="max-w-lg text-white/85">
            Talk to our team about job placement, corporate hiring, or training programs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-base font-semibold text-primary transition-colors duration-200 hover:bg-white/90"
            >
              Contact Us
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={`tel:${SITE.contact.phone}`}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-white/40 px-8 text-base font-semibold text-white transition-colors duration-200 hover:border-white"
            >
              <Phone size={18} aria-hidden="true" />
              {SITE.contact.phone}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
