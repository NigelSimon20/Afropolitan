# Media

`public/media` now ships **real photography** — 15 licensed stock photographs
from Unsplash. See [CREDITS.md](CREDITS.md) for the full list, the licence, and
an important note about replacing them with Afropolitan's own shoot.

## Replacing them

Save the real photo over the placeholder **at the same path and filename**.
Nothing in the code changes.

| Path | Used by | Size |
| --- | --- | --- |
| `hero.jpg` | Homepage hero | 1920x1080 |
| `about.jpg` | Welcome / About | 1000x1250 portrait |
| `grill.jpg` | "From the Grill" + menu page header | 1000x1200 |
| `occasion.jpg` | "Make It an Occasion" band | 1800x900 |
| `signature-1...3.jpg` | Signature Favourites cards | 1000x1200 |
| `gallery/*.jpg` | Gallery mosaic (8 tiles) | 900x900 / 1300x870 |

Art-direction notes:

- The hero and the occasion band carry white type on the **left**, so keep the
  left third of those frames quiet.
- Signature cards crop to 4:5 portrait; gallery tiles crop square or 3:2
  depending on position, so keep subjects centred.
- Everything is served through `next/image`, which generates AVIF/WebP and a
  responsive srcset automatically. Supply the largest version you have.

## Before publishing any photograph

Check the full-size file for **other businesses' branding** — signage, neon,
menu boards, price lists, staff uniforms. Several otherwise-excellent
candidates were rejected for exactly this; the details are in CREDITS.md.

## The hero video

There is no placeholder video. The hero runs `hero.jpg` with a slow 22-second
zoom until you set `SITE.heroVideo` in `lib/site.ts`:

```ts
heroVideo: '/media/hero.mp4',
```

Then drop `hero.mp4` into this folder — muted-friendly, under ~6 MB, around
15 s so it loops cleanly.

## The logo

| File | What it is |
| --- | --- |
| `logo.jpeg` | The artwork supplied by Afropolitan. Keep it — it is the source. |
| `logo.png` | Transparent version, generated from it. **This is what the site renders.** |
| `../../app/icon.png` | Favicon: the "A" from the wordmark, on black. |

The supplied file is a JPEG on solid black with no alpha channel. Dropped
straight in, it shows as a black rectangle wherever the background is not pure
black — most obviously in the navbar, which is transparent over the hero
photograph. `scripts/extract_logo.py` recovers the alpha channel, crops the
padding and writes `logo.png` plus the favicon:

```bash
python3 scripts/extract_logo.py
```

Two things worth knowing:

- **The mark is white and teal, for dark surfaces only.** Every current use
  (navbar, hero, footer) is on black. It would be invisible on the soft-white
  About and Reservations sections — ask Afropolitan for a dark variant before
  using it there.
- **The artwork already contains "Restaurant Bar & Grill"**, so the component
  never sets that line separately. The hero used to print it as a second line;
  that was removed so it does not appear twice.

If a vector logo (SVG/PDF/AI) is ever supplied, use it directly and delete the
extraction script — it will be sharper at the hero size, which currently runs
at the raster's native 411px width to avoid upscaling.

The logo's teal is `#1E5152` — an exact match for the `teal-500` design token,
so the palette in `tailwind.config.ts` is confirmed correct against the real
artwork.

## Abstract placeholders (no longer used)

`scripts/generate_placeholders.py` generates brand-palette abstract artwork for
these same 15 slots. It is kept in case you ever want the non-photographic
treatment back — run `python3 scripts/generate_placeholders.py` and it
overwrites everything in this folder.
