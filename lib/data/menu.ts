import type { MenuCategory, MenuCategoryId, MenuItem } from '@/lib/types';

/* ==================================================================== *
 *  PLACEHOLDER MENU STRUCTURE
 *
 *  These are NOT Afropolitan's dishes. They are generic category
 *  placeholders that demonstrate layout, spacing and behaviour only.
 *  Descriptions and prices are intentionally left as placeholders so the
 *  demo never presents invented food or pricing as if it were real.
 *
 *  Replace `name`, `description` and `price` with the real menu when
 *  Afropolitan supplies it. Nothing else needs to change.
 * ==================================================================== */

export const MENU_DISCLAIMER =
  'Sample structure only. Dishes, descriptions and prices to be supplied by Afropolitan.';

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'grill', label: 'Grill' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' },
];

const D = 'Dish description to be provided.';
const P = '$XX';

export const MENU_ITEMS: MenuItem[] = [
  /* --------------------------- Starters --------------------------- */
  { id: 'st-1', name: 'Soup of the Day', description: D, price: P, category: 'starters' },
  { id: 'st-2', name: 'Chicken Wings', description: D, price: P, category: 'starters' },
  { id: 'st-3', name: 'Garden Salad', description: D, price: P, category: 'starters' },
  { id: 'st-4', name: 'Starter Platter', description: D, price: P, category: 'starters' },

  /* ----------------------------- Mains ---------------------------- */
  { id: 'mn-1', name: 'Grilled Chicken', description: D, price: P, category: 'mains', signature: true, image: '/media/signature-1.jpg' },
  { id: 'mn-2', name: 'Beef Steak', description: D, price: P, category: 'mains', signature: true, image: '/media/signature-2.jpg' },
  { id: 'mn-3', name: 'Grilled Fish', description: D, price: P, category: 'mains' },
  { id: 'mn-4', name: 'Pasta Dish', description: D, price: P, category: 'mains' },
  { id: 'mn-5', name: 'Burger & Fries', description: D, price: P, category: 'mains' },

  /* ----------------------------- Grill ---------------------------- */
  { id: 'gr-1', name: 'Mixed Grill Platter', description: D, price: P, category: 'grill', signature: true, image: '/media/signature-3.jpg' },
  { id: 'gr-2', name: 'Grilled Ribs', description: D, price: P, category: 'grill' },
  { id: 'gr-3', name: 'Lamb Chops', description: D, price: P, category: 'grill' },
  { id: 'gr-4', name: 'Grilled Prawns', description: D, price: P, category: 'grill' },
  { id: 'gr-5', name: 'Sharing Grill', description: D, price: P, category: 'grill' },

  /* ----------------------------- Sides ---------------------------- */
  { id: 'sd-1', name: 'Sadza', description: D, price: P, category: 'sides' },
  { id: 'sd-2', name: 'Fries', description: D, price: P, category: 'sides' },
  { id: 'sd-3', name: 'Rice', description: D, price: P, category: 'sides' },
  { id: 'sd-4', name: 'Seasonal Vegetables', description: D, price: P, category: 'sides' },

  /* ----------------------------- Drinks --------------------------- */
  { id: 'dr-1', name: 'Signature Cocktail', description: D, price: P, category: 'drinks' },
  { id: 'dr-2', name: 'House Wine', description: D, price: P, category: 'drinks' },
  { id: 'dr-3', name: 'Local Beer', description: D, price: P, category: 'drinks' },
  { id: 'dr-4', name: 'Soft Drinks', description: D, price: P, category: 'drinks' },
  { id: 'dr-5', name: 'Fresh Juice', description: D, price: P, category: 'drinks' },
  { id: 'dr-6', name: 'Coffee & Tea', description: D, price: P, category: 'drinks' },

  /* ---------------------------- Desserts -------------------------- */
  { id: 'ds-1', name: 'Dessert of the Day', description: D, price: P, category: 'desserts' },
  { id: 'ds-2', name: 'Ice Cream', description: D, price: P, category: 'desserts' },
  { id: 'ds-3', name: 'Cheesecake', description: D, price: P, category: 'desserts' },
];

export function getMenuItems(category: MenuCategoryId | 'all'): MenuItem[] {
  return category === 'all' ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === category);
}

/** The three cards in "Signature Favourites". */
export const SIGNATURE_ITEMS: MenuItem[] = MENU_ITEMS.filter((item) => item.signature).slice(0, 3);
