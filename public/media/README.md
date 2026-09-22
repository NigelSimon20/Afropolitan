# Media

Every image here is a **generated placeholder** — abstract, palette-matched
artwork produced by [`scripts/generate_placeholders.py`](../../scripts/generate_placeholders.py).
They are deliberately not fake photos.

## Replacing them with real photography

Save your photo over the placeholder **at the same path and filename**. Nothing
in the code changes — the paths live in `lib/data/menu.ts`, `lib/data/events.ts`
and `lib/site.ts`, and none of them need editing.

| Path | Used by | Suggested size |
| --- | --- | --- |
| `hero-poster.jpg` | `components/home/Hero.tsx` | 1920×1080, landscape |
| `vibe-day.jpg`, `vibe-night.jpg` | `components/home/VibeSection.tsx` | 1600×1000 |
| `events/*.jpg` | `lib/data/events.ts` → each event's `image` | 1200×800 |
| `menu/*.jpg` | `lib/data/menu.ts` → each item's `image` | 900×900, square |

Menu thumbnails are cropped to a tall, narrow strip on the card, so keep the
subject centred.

## The hero video

There is no placeholder video — a still can't stand in for one. The hero shows
`hero-poster.jpg` with a slow drift until you set `SITE.heroVideo` in
`lib/site.ts` to a real file, e.g.:

```ts
heroVideo: '/media/hero.mp4',
```

Then drop `hero.mp4` in this folder. Keep it muted-friendly, under ~6 MB and
around 15 s so it loops cleanly.

## Regenerating the placeholders

```bash
pip install Pillow
python3 scripts/generate_placeholders.py
```

Output is deterministic — each file is seeded by its own name, so re-running
produces byte-identical images. Motifs are assigned so that no two images
visible on the same page or menu tab share one; if you add a dish or an event,
add a matching line to `SPECS` at the bottom of the script.
