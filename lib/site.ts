import type { NavLink, OpeningHours, SocialLink } from './types';

/**
 * Single source of truth for business details.
 * Swap the placeholder phone number, address and social handles for the real
 * ones here and every component picks them up.
 */
export const SITE = {
  name: 'Afropolitan',
  fullName: 'Afropolitan Restaurant, Bar & Grill',
  tagline: 'Braai by day. Afrobeat by night.',
  description:
    'Afropolitan Restaurant, Bar & Grill — all-day dining, wood-fired braai, artisanal gelato and live Afrobeat nights in the heart of Harare.',
  url: 'https://afropolitan.co.zw',
  city: 'Harare, Zimbabwe',
  address: '12 Sam Nujoma Street, Avondale, Harare',
  email: 'hello@afropolitan.co.zw',
  phoneDisplay: '+263 77 000 0000',
  /** Digits only, international format — used for tel: and wa.me links. */
  phoneRaw: '263770000000',
  whatsappMessage: "Hi Afropolitan! I'd like to book a table.",
  /** Paste the src of your Google Maps "Embed a map" iframe here. */
  mapEmbedUrl: '' as string,
  /** Set to a path under /public once you have footage, e.g. '/media/hero.mp4'. */
  heroVideo: '' as string,
  /** Shown while the video loads, and on its own until `heroVideo` is set. */
  heroPoster: '/media/hero-poster.jpg',
  mapDirectionsUrl: 'https://maps.google.com/?q=Afropolitan+Restaurant+Bar+Grill+Harare',
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(
  SITE.whatsappMessage,
)}`;

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Events', href: '/events' },
  { label: 'Reservations', href: '/reservations' },
];

export const OPENING_HOURS: OpeningHours[] = [
  { days: 'Sunday — Wednesday', hours: '8:00 AM – 12:00 AM', note: 'Kitchen closes 11:00 PM' },
  { days: 'Thursday — Saturday', hours: '8:00 AM – 3:00 AM', note: 'Late bar & live sets' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/afropolitan', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/afropolitan', icon: 'facebook' },
  { label: 'X', href: 'https://x.com/afropolitan', icon: 'twitter' },
  { label: 'YouTube', href: 'https://youtube.com/@afropolitan', icon: 'youtube' },
];
