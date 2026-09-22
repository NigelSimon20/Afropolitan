import type { EventItem } from '@/lib/types';

/**
 * Mock line-up. Dates are ISO strings so they sort and format predictably —
 * replace this array with a CMS/API call without touching any component.
 */
export const EVENTS: EventItem[] = [
  {
    id: 'ev-01',
    title: 'Afrobeat Fridays',
    date: '2026-09-25',
    time: '9:00 PM – 3:00 AM',
    description:
      'The house night. Resident DJ Tafi runs Afrobeats, amapiano and Zim dancehall until the lights come up, with a live percussionist riding the back half of the set.',
    image: '/media/events/afrobeat-fridays.jpg',
    category: 'weekly',
    tag: 'DJ Set',
    artist: 'DJ Tafi + Percussion',
    recurrence: 'Every Friday',
    cover: 10,
    featured: true,
  },
  {
    id: 'ev-02',
    title: 'Live Band Saturdays',
    date: '2026-09-26',
    time: '8:30 PM – 3:00 AM',
    description:
      'A rotating cast of Harare’s best live acts — sungura, jazz-fusion and Afro-soul — playing two full sets across the courtyard stage.',
    image: '/media/events/live-band-saturdays.jpg',
    category: 'weekly',
    tag: 'Live Band',
    artist: 'The Mbira Collective',
    recurrence: 'Every Saturday',
    cover: 15,
    featured: true,
  },
  {
    id: 'ev-03',
    title: 'Sunday Chill Sessions',
    date: '2026-09-27',
    time: '1:00 PM – 10:00 PM',
    description:
      'Long lunch, longer afternoon. Acoustic sets under the trees, a slow braai on the coals and gelato for the kids while the grown-ups linger.',
    image: '/media/events/sunday-chill.jpg',
    category: 'sunday',
    tag: 'Acoustic',
    artist: 'Rotating acoustic duos',
    recurrence: 'Every Sunday',
    cover: 0,
    featured: true,
  },
  {
    id: 'ev-04',
    title: 'Thursday Jazz & Grill',
    date: '2026-09-24',
    time: '7:00 PM – 1:00 AM',
    description:
      'A trio on the small stage, short-rib specials off the coals and the bar’s full cocktail list. The soft open to the weekend.',
    image: '/media/events/jazz-grill.jpg',
    category: 'weekly',
    tag: 'Live Jazz',
    artist: 'Kuda Moyo Trio',
    recurrence: 'Every Thursday',
    cover: 5,
  },
  {
    id: 'ev-05',
    title: 'Open Mic Wednesdays',
    date: '2026-09-23',
    time: '7:30 PM – 11:00 PM',
    description:
      'Poets, singers and first-timers. Sign-up opens at 6:30 PM, ten-minute slots, and the house band backs anyone who wants it.',
    image: '/media/events/open-mic.jpg',
    category: 'weekly',
    tag: 'Open Mic',
    recurrence: 'Every Wednesday',
    cover: 0,
  },
  {
    id: 'ev-06',
    title: 'Family Braai Day',
    date: '2026-09-27',
    time: '11:00 AM – 5:00 PM',
    description:
      'Kids eat free before 2 PM. Garden games, a dedicated gelato cart and the full braai menu served family-style.',
    image: '/media/events/family-braai.jpg',
    category: 'sunday',
    tag: 'Family',
    recurrence: 'Every Sunday',
    cover: 0,
  },
  {
    id: 'ev-07',
    title: 'Amapiano Takeover',
    date: '2026-10-03',
    time: '10:00 PM – 3:00 AM',
    description:
      'A guest takeover from Johannesburg — log drums, deep piano keys and a full production rig on the terrace. Limited pre-sale tickets.',
    image: '/media/events/amapiano-takeover.jpg',
    category: 'special',
    tag: 'Guest DJ',
    artist: 'DJ Lebo (JHB)',
    cover: 25,
  },
  {
    id: 'ev-08',
    title: 'Gelato & Vinyl Afternoon',
    date: '2026-10-11',
    time: '2:00 PM – 7:00 PM',
    description:
      'All-vinyl selectors, a limited seasonal gelato flight and the shady half of the garden. Free entry, all ages.',
    image: '/media/events/gelato-vinyl.jpg',
    category: 'sunday',
    tag: 'Vinyl',
    artist: 'Selector Nyasha',
    cover: 0,
  },
];

/** The three cards shown in the home-page "Featured Events" grid. */
export const FEATURED_EVENTS: EventItem[] = EVENTS.filter((event) => event.featured).slice(0, 3);

export const WEEKLY_EVENTS: EventItem[] = EVENTS.filter((event) => event.category === 'weekly');
export const SUNDAY_EVENTS: EventItem[] = EVENTS.filter((event) => event.category === 'sunday');
export const SPECIAL_EVENTS: EventItem[] = EVENTS.filter((event) => event.category === 'special');
