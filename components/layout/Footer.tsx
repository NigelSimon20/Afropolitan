import Link from 'next/link';
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { NAV_LINKS, OPENING_HOURS, SITE, SOCIAL_LINKS } from '@/lib/site';
import type { SocialIcon } from '@/lib/types';

const SOCIAL_ICONS: Record<SocialIcon, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  youtube: Youtube,
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-charcoal-900">
      <div className="container grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-terracotta-500 font-display text-xl font-extrabold text-cream">
              A
            </span>
            <span className="font-display text-xl font-extrabold uppercase tracking-tight text-cream">
              Afropolitan
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal-300">
            {SITE.tagline} An all-day kitchen, a wood-fired grill and a late bar in the middle of{' '}
            {SITE.city}.
          </p>

          <div className="mt-6 flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${SITE.name} on ${social.label}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-charcoal-200 transition-all duration-300 ease-silk hover:-translate-y-0.5 hover:border-gold-400/60 hover:text-gold-400"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </a>
              );
            })}
          </div>
        </div>

        {/* Opening hours */}
        <div className="lg:col-span-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-eyebrow text-gold-400">
            <Clock className="h-4 w-4" aria-hidden />
            Opening Hours
          </h3>
          <dl className="mt-5 space-y-4">
            {OPENING_HOURS.map((entry) => (
              <div key={entry.days}>
                <dt className="text-sm font-medium text-cream">{entry.days}</dt>
                <dd className="mt-1 font-display text-lg font-bold text-terracotta-400">
                  {entry.hours}
                </dd>
                {entry.note ? (
                  <dd className="mt-0.5 text-xs text-charcoal-300">{entry.note}</dd>
                ) : null}
              </div>
            ))}
          </dl>
        </div>

        {/* Contact + quick links */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-gold-400">Visit</h3>
          <ul className="mt-5 space-y-3 text-sm text-charcoal-300">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-400" aria-hidden />
              <span>{SITE.address}</span>
            </li>
            <li>
              <a
                href={`tel:+${SITE.phoneRaw}`}
                className="flex gap-2 transition-colors hover:text-gold-400"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-400" aria-hidden />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex gap-2 transition-colors hover:text-gold-400"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-400" aria-hidden />
                {SITE.email}
              </a>
            </li>
          </ul>

          <ul className="mt-6 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-charcoal-300 transition-colors hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-gold-400">Find Us</h3>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            {SITE.mapEmbedUrl ? (
              <iframe
                src={SITE.mapEmbedUrl}
                title={`Map to ${SITE.fullName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="aspect-[4/3] w-full grayscale-[0.4] contrast-[1.1]"
              />
            ) : (
              /*
               * Google Maps placeholder.
               * Maps → share → "Embed a map" → copy the src, then paste it into
               * `SITE.mapEmbedUrl` in lib/site.ts and this block swaps itself out.
               */
              <div className="grid aspect-[4/3] w-full place-items-center bg-charcoal-700 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] text-center">
                <div className="px-4">
                  <MapPin className="mx-auto h-7 w-7 text-terracotta-400" aria-hidden />
                  <p className="mt-2 text-sm font-semibold text-cream">{SITE.city}</p>
                  <p className="mt-1 text-xs text-charcoal-300">
                    Google Maps embed goes here
                    <br />
                    <code className="text-[0.65rem] text-gold-400">SITE.mapEmbedUrl</code>
                  </p>
                </div>
              </div>
            )}
          </div>
          <a
            href={SITE.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-medium text-gold-400 transition-colors hover:text-gold-300"
          >
            Get directions →
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-charcoal-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
          </p>
          <p>Made in {SITE.city}</p>
        </div>
      </div>
    </footer>
  );
}
