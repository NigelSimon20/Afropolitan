#!/usr/bin/env python3
"""
Derive public/media/logo.png (transparent) from the supplied public/media/logo.jpeg.

The supplied artwork is a JPEG: white type plus two teal letter counters on
solid black, with no alpha channel. Dropped straight into the page it would
show as a black rectangle wherever the background is not pure black — most
visibly in the navbar, which is transparent over the hero photograph.

Each pixel is artwork_colour x coverage. For every pixel this decides which of
the two artwork colours it came from (by comparing normalised chroma) and
recovers that coverage as alpha. A plain luminance key would leave the teal
'o's semi-transparent, which is why the two colours are separated.

Re-run if a new logo.jpeg is supplied:
    python3 scripts/extract_logo.py

If a vector logo (SVG/PDF/AI) ever arrives, use that instead and delete this.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "media" / "logo.jpeg"
DST = ROOT / "public" / "media" / "logo.png"
ICON = ROOT / "app" / "icon.png"

WHITE = (255, 255, 255)
TEAL = (30, 81, 82)          # sampled from the logo; matches the brand token exactly
NOISE_FLOOR = 10             # JPEG ringing around the black background
EDGE_LIFT = 14               # alpha below this is treated as background


def extract() -> Image.Image:
    src = Image.open(SRC).convert("RGB")
    w, h = src.size
    sp = src.load()
    tmax = max(TEAL)
    tn = tuple(v / tmax for v in TEAL)

    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = sp[x, y]
            m = max(r, g, b)
            if m <= NOISE_FLOOR:
                continue
            nr, ng, nb = r / m, g / m, b / m
            d_white = (nr - 1) ** 2 + (ng - 1) ** 2 + (nb - 1) ** 2
            d_teal = (nr - tn[0]) ** 2 + (ng - tn[1]) ** 2 + (nb - tn[2]) ** 2
            if d_teal < d_white:
                op[x, y] = (*TEAL, min(255, round(m / tmax * 255)))
            else:
                op[x, y] = (*WHITE, m)

    alpha = out.getchannel("A").point(
        lambda v: 0 if v < EDGE_LIFT else min(255, int((v - EDGE_LIFT) * 255 / (255 - EDGE_LIFT)))
    )
    out.putalpha(alpha)

    box = out.getbbox()
    pad = 2
    return out.crop((max(0, box[0] - pad), max(0, box[1] - pad),
                     min(w, box[2] + pad), min(h, box[3] + pad)))


def _runs(values, threshold):
    """Contiguous spans where `values` exceeds `threshold`."""
    spans, start = [], None
    for i, v in enumerate(values):
        if v > threshold and start is None:
            start = i
        elif v <= threshold and start is not None:
            spans.append((start, i))
            start = None
    if start is not None:
        spans.append((start, len(values)))
    return spans


def make_icon(logo: Image.Image, size: int = 512) -> Image.Image:
    """
    Square app icon: the 'A' from the wordmark on brand black.

    The glyph is located by projection rather than hard-coded coordinates —
    rows first, to separate the wordmark from the 'Restaurant Bar & Grill'
    line beneath it, then columns within that band to isolate the first
    letter. A new logo.jpeg therefore still yields a correct icon.
    """
    alpha = logo.getchannel("A")
    w, h = alpha.size
    px = alpha.load()

    rows = [sum(px[x, y] for x in range(w)) for y in range(h)]
    bands = _runs(rows, max(rows) * 0.02)
    y0, y1 = bands[0]                      # the wordmark, above the sub-line

    cols = [sum(px[x, y] for y in range(y0, y1)) for x in range(w)]
    glyphs = _runs(cols, max(cols) * 0.02)
    x0, x1 = glyphs[0]                     # the leading 'A'

    glyph = logo.crop((x0, y0, x1, y1))
    target = int(size * 0.52)
    scale = target / max(glyph.width, glyph.height)
    glyph = glyph.resize((max(1, round(glyph.width * scale)),
                          max(1, round(glyph.height * scale))), Image.LANCZOS)

    icon = Image.new("RGBA", (size, size), (0, 0, 0, 255))
    icon.alpha_composite(glyph, ((size - glyph.width) // 2, (size - glyph.height) // 2))
    return icon


if __name__ == "__main__":
    logo = extract()
    logo.save(DST)
    print(f"  wrote {DST.relative_to(ROOT)}  {logo.size}  {DST.stat().st_size} bytes")
    icon = make_icon(logo)
    ICON.parent.mkdir(parents=True, exist_ok=True)
    icon.save(ICON)
    print(f"  wrote {ICON.relative_to(ROOT)}  {icon.size}  {ICON.stat().st_size} bytes")
