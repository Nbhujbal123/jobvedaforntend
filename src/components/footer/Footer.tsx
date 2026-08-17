import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Logo } from '@/components/common/Logo';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@/components/common/SocialIcons';
import { NAV_LINKS, ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';

const candidateLinks = [
  { label: 'Browse Jobs', path: ROUTES.JOBS },
  { label: 'Training Programs', path: ROUTES.TRAINING },
  { label: 'Upload Resume', path: ROUTES.CANDIDATE_RESUME },
  { label: 'Career Guidance', path: ROUTES.SERVICES },
];

const employerLinks = [
  { label: 'Post a Job', path: ROUTES.EMPLOYER_POST_JOB },
  { label: 'Employer Dashboard', path: ROUTES.EMPLOYER_DASHBOARD },
  { label: 'Register as Employer', path: ROUTES.REGISTER },
];

const companyLinks = [
  { label: 'About Us', path: ROUTES.ABOUT },
  { label: 'Companies', path: ROUTES.COMPANIES },
  { label: 'Blogs', path: ROUTES.BLOGS },
  { label: 'Contact', path: ROUTES.CONTACT },
];

const socialLinks = [
  { label: 'Facebook', href: SITE.socials.facebook, icon: FacebookIcon },
  { label: 'LinkedIn', href: SITE.socials.linkedin, icon: LinkedinIcon },
  { label: 'Twitter', href: SITE.socials.twitter, icon: TwitterIcon },
  { label: 'Instagram', href: SITE.socials.instagram, icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-secondary/10 bg-secondary text-white/70">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <Logo variant="light" />
          <p className="text-sm leading-relaxed">{SITE.description}</p>
          <div className="flex flex-col gap-2 text-sm">
            <span className="inline-flex items-center gap-2">
              <Phone size={14} aria-hidden="true" />
              {SITE.contact.phone}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={14} aria-hidden="true" />
              {SITE.contact.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} aria-hidden="true" />
              {SITE.contact.location}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 text-white/70 hover:border-primary hover:text-primary"
              >
                <social.icon width={15} height={15} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Quick Links" links={NAV_LINKS as unknown as { label: string; path: string }[]} />
        <FooterColumn title="For Candidates" links={candidateLinks} />
        <FooterColumn title="For Employers" links={employerLinks} />
        <FooterColumn title="Company" links={companyLinks} />
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 text-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; path: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">{title}</h4>
      <ul className="flex flex-col gap-2.5 text-sm">
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path} className="hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
