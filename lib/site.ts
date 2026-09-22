import type { ContactDetail, NavLink, OpeningHours, SocialLink } from './types';

/* ==================================================================== *
 *  BEFORE LAUNCH — confirm with Afropolitan and fill in below
 *  --------------------------------------------------------------------
 *  1. WHATSAPP_NUMBER  — activates every "WhatsApp Us" CTA on the site
 *  2. CONTACT.phone    — official telephone number
 *  3. CONTACT.email    — official email address
 *  4. CONTACT.address  — exact street address (Madokero, Harare confirmed)
 *  5. SOCIALS          — official Facebook / Instagram / TikTok handles
 *  6. SITE.mapEmbedUrl — Google Maps "Embed a map" src
 *
 *  (The logo is in: public/media/logo.jpeg, rendered via logo.png.)
 *
 *  Every one of these renders as a clearly-marked placeholder until set,
 *  so nothing on the site invents a detail the restaurant hasn't given.
 * ==================================================================== */

/** Digits only, international format, no "+" — e.g. '263771234567'. */
export const WHATSAPP_NUMBER = '';

export const WHATSAPP_MESSAGE =
  "Hello Afropolitan Restaurant Bar & Grill,\nI'd like to make an enquiry/reservation.";

/**
 * Returns a live wa.me deep link once the number is set, and `/#contact`
 * until then — so the CTA is never a dead or wrong-number link.
 */
export function whatsappUrl(message: string = WHATSAPP_MESSAGE): string {
  if (!WHATSAPP_NUMBER) return '/#contact';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_PENDING = WHATSAPP_NUMBER === '';

export const SITE = {
  name: 'Afropolitan',
  fullName: 'Afropolitan Restaurant Bar & Grill',
  suffix: 'Restaurant Bar & Grill',
  tagline: 'Good food. Great atmosphere. Unforgettable moments.',
  description:
    'Afropolitan Restaurant Bar & Grill brings together great food, drinks and a vibrant dining atmosphere in Madokero, Harare.',
  url: 'https://afropolitan.co.zw',
  area: 'Madokero, Harare',
  cityCountry: 'Madokero, Harare, Zimbabwe',
  /** Paste the src from Google Maps → Share → "Embed a map". */
  mapEmbedUrl: '' as string,
  mapDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Afropolitan+Restaurant+Bar+and+Grill+Madokero+Harare',
  /** Set to a file under /public once footage exists, e.g. '/media/hero.mp4'. */
  heroVideo: '' as string,
  heroImage: '/media/hero.jpg',
};

export const AGENCY = {
  name: 'Infinity Nexa',
  url: 'https://infinitynexa.com',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/#top' },
  { label: 'About', href: '/#about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

export const CONTACT: Record<'phone' | 'whatsapp' | 'email' | 'address', ContactDetail> = {
  phone: { label: 'Telephone to be confirmed', pending: true },
  whatsapp: { label: 'WhatsApp number to be confirmed', pending: true },
  email: { label: 'Email address to be confirmed', pending: true },
  address: {
    label: 'Madokero, Harare, Zimbabwe',
    href: SITE.mapDirectionsUrl,
    pending: false,
  },
};

export const SOCIALS: SocialLink[] = [
  { label: 'Facebook', icon: 'facebook', pending: true },
  { label: 'Instagram', icon: 'instagram', pending: true },
  { label: 'TikTok', icon: 'tiktok', pending: true },
];

/** Supplied by the client in the original brief — worth reconfirming. */
export const OPENING_HOURS: OpeningHours[] = [
  { days: 'Sunday — Wednesday', hours: '8:00 AM – 12:00 AM' },
  { days: 'Thursday — Saturday', hours: '8:00 AM – 3:00 AM' },
];
