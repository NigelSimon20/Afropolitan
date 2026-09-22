# Afropolitan Restaurant, Bar & Grill

Premium restaurant + nightlife site for Afropolitan in Harare.
Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide React.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## Structure

```
app/
  layout.tsx          Root layout — fonts, Navbar, Footer, floating WhatsApp button
  template.tsx        Route-level fade/slide transition (re-mounts per navigation)
  page.tsx            Home — Hero, Marquee, Vibe, Featured Events, CTA
  menu/page.tsx       Interactive menu (client-side category tabs)
  events/page.tsx     Weekly gigs, Sunday chill sessions, special takeovers
  reservations/page.tsx
components/
  layout/             Navbar, Footer, WhatsAppButton
  home/               Hero, VibeSection, FeaturedEvents, ReservationCTA
  menu/               MenuExplorer (tabs + filtering), MenuItemCard
  events/             EventCard (shared by home + events pages)
  reservations/       ReservationForm
  ui/                 Button, Reveal, SectionHeading, PageHeader, MediaFrame, Marquee
lib/
  types.ts            MenuItem, MenuCategory, EventItem, NavLink, OpeningHours…
  site.ts             Business details, nav links, opening hours, socials
  data/menu.ts        Mock menu items + categories
  data/events.ts      Mock events + derived weekly/Sunday/special/featured lists
  utils.ts            cn(), formatPrice(), formatEventDate()
public/media/         38 generated placeholder images (see its README)
scripts/
  generate_placeholders.py   Redraws every placeholder; deterministic per filename
```

## Design tokens

Defined in `tailwind.config.ts`:

| Token | Value | Role |
| --- | --- | --- |
| `charcoal-800` | `#1A1A1A` | Page background |
| `charcoal-900` | `#131313` | Footer / alternating sections |
| `terracotta-500` | `#C4622F` | Primary accent — braai fire, buttons |
| `gold-400` | `#D6A64A` | Bar / premium accent, active states |
| `foliage-500` | `#4C9A5A` | Garden / day-time accent, WhatsApp |
| `cream` | `#F7F3EC` | Primary text |

Fonts are wired through CSS variables in `app/layout.tsx` — **Outfit** (`font-display`)
for headings, **Inter** (`font-sans`) for body.

## Swapping in real content

- **Business details** — phone, address, email, socials: `lib/site.ts`.
- **Google Maps** — paste your embed `src` into `SITE.mapEmbedUrl`; the footer placeholder
  swaps itself out for the live iframe.
- **WhatsApp** — set `SITE.phoneRaw` (digits only, international format).
- **Menu / events** — edit the arrays in `lib/data/`. Both are typed, so a bad shape fails
  at build time rather than in the browser.
- **Images** — `public/media/` ships 38 generated placeholders (abstract, palette-matched
  artwork, not fake photos). Save a real photo over any of them at the same path and nothing
  in the code changes. Regenerate or extend them with `python3 scripts/generate_placeholders.py`.
- **Hero video** — set `SITE.heroVideo` to a file under `/public`; until then the hero runs on
  `hero-poster.jpg` with a slow drift. See `public/media/README.md`.

## Notes

- The menu renders only the active category client-side. If you want every dish in the
  initial HTML for SEO, render all four categories server-side and hide the inactive ones
  with CSS instead of unmounting them.
- `ReservationForm` has no backend — it validates, shows a confirmation state and hands the
  booking off to WhatsApp. Point `handleSubmit` at a route handler or booking provider.
