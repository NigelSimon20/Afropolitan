/* ------------------------------------------------------------------ *
 *  Contact details
 *
 *  Nothing about the real business is invented. Anything Afropolitan has
 *  not confirmed is marked `pending: true`, renders as a "to be confirmed"
 *  chip instead of a link, and turns into a live link the moment a real
 *  value is filled in. See lib/site.ts.
 * ------------------------------------------------------------------ */

export interface ContactDetail {
  label: string;
  /** Link target. Ignored while `pending` is true. */
  href?: string;
  pending: boolean;
}

/* ------------------------------------------------------------------ *
 *  Menu
 * ------------------------------------------------------------------ */

export type MenuCategoryId = 'starters' | 'mains' | 'grill' | 'sides' | 'drinks' | 'desserts';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /**
   * Held as a string, not a number, so the placeholder "$XX" is
   * representable until Afropolitan supplies real pricing.
   */
  price: string;
  category: MenuCategoryId;
  /** Surfaced in the "Signature Favourites" section. */
  signature?: boolean;
  image?: string;
}

/* ------------------------------------------------------------------ *
 *  Experience + occasions
 * ------------------------------------------------------------------ */

export type ExperienceIcon = 'dining' | 'bar' | 'grill' | 'events';

export interface ExperienceCard {
  id: ExperienceIcon;
  title: string;
  description: string;
}

export interface Occasion {
  title: string;
  description: string;
}

/* ------------------------------------------------------------------ *
 *  Gallery
 * ------------------------------------------------------------------ */

export type GalleryCategory = 'Food' | 'Drinks' | 'Restaurant' | 'Events' | 'Experience';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Tailwind grid spans — drives the editorial mosaic layout. */
  span: string;
}

/* ------------------------------------------------------------------ *
 *  Site chrome
 * ------------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string;
}

export type SocialIcon = 'facebook' | 'instagram' | 'tiktok';

export interface SocialLink {
  label: string;
  icon: SocialIcon;
  href?: string;
  pending: boolean;
}

export interface OpeningHours {
  days: string;
  hours: string;
}
