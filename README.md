# Afropolitan Restaurant Bar & Grill

A premium website for Afropolitan Restaurant Bar & Grill, Madokero, Harare.
Built by **Infinity Nexa**.

Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide React

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

---

## Before this goes live

Everything below is a **placeholder on purpose**. The site does not invent a
single business detail — anything Afropolitan has not confirmed renders as a
visible "to be confirmed" marker rather than a plausible-looking fake.

All of it is set in one file, [`lib/site.ts`](lib/site.ts):

| # | What | Where | Effect once set |
| --- | --- | --- | --- |
| 1 | **WhatsApp number** | `WHATSAPP_NUMBER` | Activates *every* WhatsApp CTA on the site, plus the reservation hand-off. Until set, those CTAs point at `/#contact` instead of a dead `wa.me` link. |
| 2 | Telephone | `CONTACT.phone` | Becomes a `tel:` link |
| 3 | Email | `CONTACT.email` | Becomes a `mailto:` link |
| 4 | Exact street address | `CONTACT.address` | Madokero, Harare is confirmed; the street line is not |
| 5 | Social accounts | `SOCIALS` | Facebook / Instagram / TikTok become live links |
| 6 | Google Maps embed | `SITE.mapEmbedUrl` | Swaps the map placeholder for the live map |
| 7 | ~~Logo artwork~~ | [`components/layout/Logo.tsx`](components/layout/Logo.tsx) | **Done** — client logo in place. A vector (SVG/PDF/AI) would still be better than the supplied JPEG |
| 8 | **Menu** | [`lib/data/menu.ts`](lib/data/menu.ts) | Dish names, descriptions and prices are structural placeholders (`$XX`) |
| 9 | **Photography** | `public/media/` | Ships 15 licensed Unsplash photographs — *other restaurants' rooms and food*. Afropolitan needs their own shoot before launch. See [`public/media/CREDITS.md`](public/media/CREDITS.md) |
| 10 | Opening hours | `OPENING_HOURS` | Taken from the original brief — worth reconfirming |

> The menu carries a visible line — *"Sample structure only. Dishes,
> descriptions and prices to be supplied by Afropolitan."* — so the demo can be
> presented without anyone mistaking the placeholders for a real menu.

---

## Structure

```
app/
  layout.tsx             Fonts, navigation, footer, WhatsApp button
  page.tsx               Homepage — all ten sections in brief order
  menu/page.tsx          Full menu page
  menu/MenuBoard.tsx     Course-grouped menu with category tabs
components/
  layout/                Navbar, Footer, Logo, WhatsAppButton
  home/                  Hero, About, Experience, MenuPreview, Signature,
                         Gallery, Occasions, Reservations, FindUs, Connect
  menu/                  CategoryTabs, MenuList
  ui/                    Button, Media, Reveal, SectionHeading,
                         PendingValue, SocialIcons
lib/
  site.ts                Business details + everything awaiting confirmation
  types.ts               ContactDetail, MenuItem, GalleryImage, …
  data/menu.ts           Placeholder menu structure
  data/content.ts        Experience cards, occasions, gallery mosaic
scripts/
  generate_placeholders.py   Optional: abstract brand artwork instead of photos
public/media/            15 licensed stock photographs (see its CREDITS.md)
```

## Homepage flow

Hero → Welcome/About → The Afropolitan Experience → Our Menu → Signature
Favourites → Gallery → Make It an Occasion → Reserve Your Table → Find Us →
Let's Connect → Footer.

Navigation anchors to those sections; **Menu** is a full page of its own.

## Design tokens

Defined in [`tailwind.config.ts`](tailwind.config.ts).

| Token | Value | Role |
| --- | --- | --- |
| `ink` | `#000000` | Primary background |
| `dark` | `#0B0D0D` | Alternating dark sections |
| `teal-500` | `#1E5152` | The signature accent — buttons, rules, icons |
| `teal-700` | `#143536` | "Let's Connect" band |
| `softwhite` | `#F3F4F2` | Light sections (About, Reservations) |
| `greyline` | `#A7A9AA` | Secondary text |

Headings use **Cormorant Garamond** (`font-display`), body and UI use
**Montserrat** (`font-sans`), both via `next/font`.

## Three primary actions

`VIEW MENU` · `RESERVE A TABLE` · `WHATSAPP US` — and nothing else competes
with them. The WhatsApp CTA is a floating teal circle on desktop and a fixed
full-width bar on mobile.

## Reservations

WhatsApp-powered rather than a booking system, as briefed. The form composes
the request and hands it to WhatsApp; once `WHATSAPP_NUMBER` is set, submitting
opens WhatsApp directly, with a manual "Send on WhatsApp" fallback on the
confirmation screen.

## Accessibility notes

- Scroll-reveal entrances are Framer Motion inline styles, so `globals.css`
  explicitly resets `[data-reveal]` under `prefers-reduced-motion: reduce`.
  Without that, anyone browsing with reduced motion would see the
  pre-animation state — invisible content.
- The gallery lightbox supports `Esc` and arrow keys and locks body scroll.
- Skip-to-content link, focus rings, and labelled icon-only controls throughout.
