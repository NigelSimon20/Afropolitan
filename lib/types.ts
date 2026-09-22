/* ------------------------------------------------------------------ *
 *  Shared domain types
 * ------------------------------------------------------------------ */

export type MenuCategoryId = 'breakfast' | 'braai-mains' | 'gelato' | 'drinks';

export type MenuTag = 'vegetarian' | 'vegan' | 'spicy' | 'gluten-free' | 'contains-nuts';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  /** One-line mood setter shown under the tabs when the category is active. */
  tagline: string;
  /** Service window shown as a chip next to the tagline. */
  served: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Stored as a number so items stay sortable and currency stays swappable. */
  price: number;
  category: MenuCategoryId;
  /** Path under /public — falls back to a gradient if the file is absent. */
  image?: string;
  tags?: MenuTag[];
  /** Highlighted with a gold "Chef's pick" ribbon. */
  signature?: boolean;
}

export type EventCategory = 'weekly' | 'sunday' | 'special';

export interface EventItem {
  id: string;
  title: string;
  /** ISO `YYYY-MM-DD`. */
  date: string;
  /** Human readable, e.g. "8:00 PM – Late". */
  time: string;
  description: string;
  /** Path under /public — falls back to a gradient if the file is absent. */
  image: string;
  category: EventCategory;
  /** Short chip, e.g. "Live Band", "DJ Set". */
  tag: string;
  artist?: string;
  /** Recurrence label, e.g. "Every Thursday". */
  recurrence?: string;
  /** Cover charge in USD; omit or 0 for free entry. */
  cover?: number;
  featured?: boolean;
}

/* ------------------------------------------------------------------ *
 *  Site chrome
 * ------------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string;
}

export interface OpeningHours {
  days: string;
  hours: string;
  note?: string;
}

export type SocialIcon = 'instagram' | 'facebook' | 'twitter' | 'youtube';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}
