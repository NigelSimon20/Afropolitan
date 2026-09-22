import Link from 'next/link';
import Logo from './Logo';
import { SOCIAL_ICONS } from '@/components/ui/SocialIcons';
import { AGENCY, SITE, SOCIALS } from '@/lib/site';

const FOOTER_LINKS = [
  { label: 'Home', href: '/#top' },
  { label: 'About', href: '/#about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Reservations', href: '/#reserve' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="container grid gap-14 py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Logo size="footer" />
          <p className="mt-7 max-w-xs text-sm font-light leading-[1.9] text-greyline">
            {SITE.tagline}
          </p>
          <p className="mt-5 text-sm font-light text-greyline/70">{SITE.cityCountry}</p>
        </div>

        <nav className="lg:col-span-4" aria-label="Footer">
          <h2 className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-teal-300">
            Explore
          </h2>
          <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline text-sm font-light text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-teal-300">
            Follow Us
          </h2>
          <ul className="mt-7 space-y-4">
            {SOCIALS.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <li key={social.label}>
                  {social.pending || !social.href ? (
                    <span
                      className="inline-flex items-center gap-3 text-sm font-light text-greyline/60 italic"
                      title="Official account to be confirmed by Afropolitan"
                    >
                      <Icon className="h-4 w-4" />
                      {social.label}
                      <span className="text-[0.6rem] not-italic uppercase tracking-[0.15em] text-greyline/40">
                        To confirm
                      </span>
                    </span>
                  ) : (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-sm font-light text-white/75 transition-colors hover:text-teal-300"
                    >
                      <Icon className="h-4 w-4" />
                      {social.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-7 text-center sm:flex-row sm:text-left">
          <p className="text-[0.7rem] font-light tracking-wide text-greyline/70">
            © {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
          </p>
          <p className="text-[0.7rem] font-light tracking-wide text-greyline/70">
            Website by{' '}
            <a
              href={AGENCY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-medium text-teal-300 transition-colors hover:text-teal-200"
            >
              {AGENCY.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
