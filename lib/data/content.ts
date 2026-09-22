import type { ExperienceCard, GalleryImage, Occasion } from '@/lib/types';

export const EXPERIENCE: ExperienceCard[] = [
  {
    id: 'dining',
    title: 'Dining',
    description: 'Enjoy a dining experience designed around great food and great company.',
  },
  {
    id: 'bar',
    title: 'Bar',
    description: 'Relax, connect and enjoy your favourite drinks in a vibrant atmosphere.',
  },
  {
    id: 'grill',
    title: 'Grill',
    description: 'Discover our grill selection prepared for flavour and satisfaction.',
  },
  {
    id: 'events',
    title: 'Events',
    description: 'A setting for celebrations, gatherings and memorable occasions.',
  },
];

/**
 * Presented as the kinds of occasions the space suits — to be confirmed as
 * formal services once Afropolitan says which they offer.
 */
export const OCCASIONS: Occasion[] = [
  { title: 'Birthday Celebrations', description: 'A room that carries the mood of the evening.' },
  { title: 'Corporate Gatherings', description: 'Space for teams, clients and conversation.' },
  { title: 'Private Dinners', description: 'Considered service for smaller tables.' },
  { title: 'Social Events', description: 'Where the night keeps going.' },
  { title: 'Group Dining', description: 'Long tables, shared plates, good company.' },
];

/**
 * Editorial mosaic. `span` drives the layout on a 4-column grid, following
 * the arrangement in the design brief.
 */
export const GALLERY: GalleryImage[] = [
  { id: 'g1', src: '/media/gallery/food-1.jpg', alt: 'A plated seafood pasta', category: 'Food', span: 'sm:col-span-2 sm:row-span-2' },
  { id: 'g2', src: '/media/gallery/interior-1.jpg', alt: 'Chefs working the pass', category: 'Restaurant', span: 'sm:col-span-2 sm:row-span-1' },
  { id: 'g3', src: '/media/gallery/drinks-1.jpg', alt: 'A whisky served over ice', category: 'Drinks', span: 'sm:col-span-1 sm:row-span-1' },
  { id: 'g4', src: '/media/gallery/experience-1.jpg', alt: 'Guests sharing a table', category: 'Experience', span: 'sm:col-span-1 sm:row-span-1' },
  { id: 'g5', src: '/media/gallery/restaurant-1.jpg', alt: 'The dining room', category: 'Restaurant', span: 'sm:col-span-2 sm:row-span-2' },
  { id: 'g6', src: '/media/gallery/event-1.jpg', alt: 'A long table gathering', category: 'Events', span: 'sm:col-span-2 sm:row-span-1' },
  { id: 'g7', src: '/media/gallery/food-2.jpg', alt: 'Stacked pancakes with honey', category: 'Food', span: 'sm:col-span-1 sm:row-span-1' },
  { id: 'g8', src: '/media/gallery/drinks-2.jpg', alt: 'A mojito being poured', category: 'Drinks', span: 'sm:col-span-1 sm:row-span-1' },
];

export const GALLERY_FILTERS = ['All', 'Food', 'Drinks', 'Restaurant', 'Events'] as const;
export type GalleryFilter = (typeof GALLERY_FILTERS)[number];
