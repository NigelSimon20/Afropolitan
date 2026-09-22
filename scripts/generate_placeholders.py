#!/usr/bin/env python3
"""
Generate placeholder imagery for Afropolitan Restaurant Bar & Grill.

The brief calls for cinematic restaurant photography that does not exist yet.
Rather than invent stock-looking pictures, these are restrained, brand-accurate
compositions in the Afropolitan palette — black, teal #1E5152, white — built
from soft light, depth-of-field bokeh and a single fine-line subject.

They read as intentional art direction in a client proposal, and every one is
sized and named for the exact slot it fills, so a real photograph dropped in at
the same path replaces it with no code change.

    pip install Pillow
    python3 scripts/generate_placeholders.py

Output is deterministic: each file is seeded by its own name.
"""

from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "media"
SS = 2  # supersample factor (Pillow's draw has no antialiasing)

BLACK = (0, 0, 0)
TEAL = (30, 81, 82)
TEAL_LIFT = (58, 132, 133)   # brighter teal for light sources
WHITE = (243, 244, 242)
GREY = (167, 169, 170)

# Tone = (gradient top, gradient bottom, light colour, line colour)
TONES = {
    "night":  ((14, 18, 18), (0, 0, 0),    TEAL_LIFT, WHITE),
    "teal":   ((16, 38, 39), (3, 7, 7),    TEAL,      WHITE),
    "deep":   ((11, 13, 13), (0, 0, 0),    TEAL,      WHITE),
    "warm":   ((26, 26, 24), (0, 0, 0),    (196, 186, 160), WHITE),
    "ash":    ((32, 34, 34), (6, 7, 7),    GREY,      WHITE),
}


def lerp(a, b, t):
    return int(round(a + (b - a) * t))


def gradient(size, top, bottom, angle=0.0):
    w, h = size
    diag = int(math.hypot(w, h)) + 4
    tall = diag if angle else h
    strip = Image.new("RGB", (1, tall))
    px = strip.load()
    for y in range(tall):
        t = y / max(tall - 1, 1)
        px[0, y] = (lerp(top[0], bottom[0], t), lerp(top[1], bottom[1], t), lerp(top[2], bottom[2], t))
    img = strip.resize((diag if angle else w, tall), Image.BICUBIC)
    if angle:
        img = img.rotate(angle, resample=Image.BICUBIC)
        l, t_ = (img.width - w) // 2, (img.height - h) // 2
        img = img.crop((l, t_, l + w, t_ + h))
    return img


def glow(img, color, center, radius, strength=1.0):
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    cx, cy = center[0] * w, center[1] * h
    r = radius * max(w, h)
    for i in range(26, 0, -1):
        t = i / 26
        rr = r * t
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=int(255 * (1 - t) ** 1.9 * strength))
    mask = mask.filter(ImageFilter.GaussianBlur(r * 0.15))
    img.paste(Image.composite(ImageChops.screen(img, Image.new("RGB", (w, h), color)), img, mask), (0, 0))


def bokeh(img, color, rnd, count=16, strength=0.5):
    w, h = img.size
    layer = Image.new("RGB", (w, h), BLACK)
    d = ImageDraw.Draw(layer)
    for _ in range(count):
        r = min(w, h) * rnd.uniform(0.018, 0.075)
        cx, cy = rnd.uniform(-0.05, 1.05) * w, rnd.uniform(-0.05, 0.85) * h
        v = rnd.uniform(0.2, 1.0) * strength
        d.ellipse([cx - r, cy - r, cx + r, cy + r],
                  fill=(int(color[0] * v), int(color[1] * v), int(color[2] * v)))
    layer = layer.filter(ImageFilter.GaussianBlur(min(w, h) * 0.026))
    img.paste(ImageChops.screen(img, layer), (0, 0))


def vignette(img, amount=0.68):
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    for i in range(30):
        t = i / 30
        ix, iy = w * 0.5 * t, h * 0.5 * t
        d.ellipse([ix - w * 0.16, iy - h * 0.16, w - ix + w * 0.16, h - iy + h * 0.16],
                  fill=int(255 * (1 - t)))
    mask = mask.filter(ImageFilter.GaussianBlur(min(w, h) * 0.09))
    img.paste(Image.blend(Image.new("RGB", (w, h), BLACK), img, amount), (0, 0), ImageChops.invert(mask))


def grain(img, sigma=6.0):
    noise = Image.effect_noise(img.size, sigma).convert("RGB")
    return Image.blend(img, ImageChops.overlay(img, noise), 0.16)


# --------------------------------------------------------------------------- #
#  Fine-line subjects. Stroked, never filled — filled icons read as clip art.
# --------------------------------------------------------------------------- #
def lw(u, m=1.0):
    return max(1, int(u * 0.0075 * m))


def s_plate(d, w, h, c, u, rnd):
    cx, cy = w * 0.5, h * 0.5
    r = u * 0.26
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=c(150), width=lw(u))
    d.ellipse([cx - r * 0.74, cy - r * 0.74, cx + r * 0.74, cy + r * 0.74], outline=c(70), width=lw(u, 0.7))
    for i in range(3):
        a = -math.pi / 2 + (i - 1) * 0.85
        bx, by = cx + math.cos(a) * r * 0.34, cy + math.sin(a) * r * 0.34
        br = r * (0.2 if i == 1 else 0.15)
        d.ellipse([bx - br, by - br, bx + br, by + br], outline=c(120), width=lw(u, 0.8))
    for sx in (-1.55, 1.55):
        d.line([cx + r * sx, cy - r * 0.62, cx + r * sx, cy + r * 0.62], fill=c(60), width=lw(u, 0.8))


def s_glass(d, w, h, c, u, rnd):
    cx, cy = w * 0.5, h * 0.46
    r = u * 0.16
    d.line([(cx - r, cy - r * 0.8), (cx + r, cy - r * 0.8), (cx, cy + r * 0.9), (cx - r, cy - r * 0.8)],
           fill=c(150), width=lw(u), joint="curve")
    d.line([cx, cy + r * 0.9, cx, cy + r * 2.0], fill=c(150), width=lw(u))
    d.line([cx - r * 0.62, cy + r * 2.0, cx + r * 0.62, cy + r * 2.0], fill=c(150), width=lw(u))
    d.line([cx - r * 0.82, cy - r * 0.35, cx + r * 0.82, cy - r * 0.35], fill=c(75), width=lw(u, 0.7))
    gx, gy = cx + r * 0.78, cy - r * 1.25
    d.ellipse([gx - r * 0.2, gy - r * 0.2, gx + r * 0.2, gy + r * 0.2], outline=c(130), width=lw(u, 0.8))
    d.line([gx, gy + r * 0.2, cx + r * 0.42, cy - r * 0.8], fill=c(90), width=lw(u, 0.6))


def s_flame(d, w, h, c, u, rnd):
    cx, base = w * 0.5, h * 0.7
    for sw, sh, a in ((0.16, 0.34, 140), (0.09, 0.2, 90)):
        pts = []
        for side in (-1, 1):
            rng = range(25) if side == -1 else range(24, -1, -1)
            for i in rng:
                t = i / 24
                spread = math.sin(t * math.pi) * (1 - t) ** 0.55
                pts.append((cx + side * u * sw * spread, base - u * sh * t))
        d.line(pts + [pts[0]], fill=c(a), width=lw(u), joint="curve")
    d.line([cx - u * 0.26, base + u * 0.04, cx + u * 0.26, base + u * 0.04], fill=c(70), width=lw(u, 0.8))
    for i in range(4):
        gx = cx + (i - 1.5) * u * 0.1
        d.line([gx - u * 0.035, base + u * 0.09, gx + u * 0.035, base + u * 0.09], fill=c(55), width=lw(u, 0.7))


def s_grill(d, w, h, c, u, rnd):
    cx, cy = w * 0.5, h * 0.52
    r = u * 0.28
    d.ellipse([cx - r, cy - r * 0.6, cx + r, cy + r * 0.6], outline=c(145), width=lw(u))
    for i in range(6):
        y = cy - r * 0.6 + r * 1.2 * (i + 1) / 7
        half = r * math.sqrt(max(0.0, 1 - ((y - cy) / (r * 0.6)) ** 2)) * 0.97
        d.line([cx - half, y, cx + half, y], fill=c(80), width=lw(u, 0.75))
    for i in range(3):
        x = cx + (i - 1) * r * 0.5
        pts = [(x + math.sin(t * 3.6 + i) * u * 0.028, cy - r * 0.68 - t * u * 0.2)
               for t in [k / 16 for k in range(17)]]
        d.line(pts, fill=c(60), width=lw(u, 0.7), joint="curve")


def s_arch(d, w, h, c, u, rnd):
    """Interior: a row of arches — reads as architecture, never as clip art."""
    n = 3
    span = u * 0.24
    base = h * 0.76
    for i in range(n):
        cx = w * 0.5 + (i - (n - 1) / 2) * span * 1.25
        top = base - u * 0.46
        d.arc([cx - span * 0.44, top, cx + span * 0.44, top + span * 0.88], 180, 360,
              fill=c(120 - i * 12), width=lw(u))
        d.line([cx - span * 0.44, top + span * 0.44, cx - span * 0.44, base], fill=c(120 - i * 12), width=lw(u))
        d.line([cx + span * 0.44, top + span * 0.44, cx + span * 0.44, base], fill=c(120 - i * 12), width=lw(u))
    d.line([w * 0.12, base, w * 0.88, base], fill=c(80), width=lw(u, 0.8))
    d.line([w * 0.2, base + u * 0.12, w * 0.8, base + u * 0.12], fill=c(40), width=lw(u, 0.6))


def s_table(d, w, h, c, u, rnd):
    """Two settings across a table — the 'people dining' slot."""
    cy = h * 0.54
    d.line([w * 0.08, cy + u * 0.2, w * 0.92, cy + u * 0.2], fill=c(90), width=lw(u))
    for sx in (-1, 1):
        cx = w * 0.5 + sx * u * 0.24
        r = u * 0.1
        d.ellipse([cx - r, cy - r * 0.42, cx + r, cy + r * 0.42], outline=c(130), width=lw(u, 0.85))
        d.line([cx - r * 1.55, cy - r * 0.2, cx - r * 1.55, cy + r * 0.22], fill=c(70), width=lw(u, 0.7))
        d.line([cx + r * 1.55, cy - r * 0.2, cx + r * 1.55, cy + r * 0.22], fill=c(70), width=lw(u, 0.7))
    gr = u * 0.048
    d.line([(w * 0.5 - gr, cy - u * 0.16), (w * 0.5 + gr, cy - u * 0.16), (w * 0.5, cy - u * 0.075),
            (w * 0.5 - gr, cy - u * 0.16)], fill=c(120), width=lw(u, 0.8), joint="curve")
    d.line([w * 0.5, cy - u * 0.075, w * 0.5, cy + u * 0.02], fill=c(120), width=lw(u, 0.8))


def s_bottles(d, w, h, c, u, rnd):
    base = h * 0.72
    for i, off in enumerate((-1.6, -0.55, 0.55, 1.6)):
        bw = u * 0.05
        bh = u * (0.3 + (0.08 if i % 2 else 0))
        x = w * 0.5 + off * bw * 2.2
        a = 135 - abs(off) * 22
        d.line([(x - bw, base), (x - bw, base - bh * 0.55), (x - bw * 0.3, base - bh * 0.78),
                (x - bw * 0.3, base - bh), (x + bw * 0.3, base - bh), (x + bw * 0.3, base - bh * 0.78),
                (x + bw, base - bh * 0.55), (x + bw, base), (x - bw, base)],
               fill=c(int(a)), width=lw(u, 0.85), joint="curve")
    d.line([w * 0.1, base, w * 0.9, base], fill=c(70), width=lw(u, 0.8))


def s_celebrate(d, w, h, c, u, rnd):
    """Raised glasses — the events/occasions slot."""
    for sx, tilt in ((-1, -0.22), (1, 0.22)):
        cx = w * 0.5 + sx * u * 0.13
        cy = h * 0.46
        r = u * 0.085
        dx, dy = math.sin(tilt) * r, -math.cos(tilt) * r
        d.line([(cx - r * 0.75 + dx, cy - r * 0.9 + dy), (cx + r * 0.75 + dx, cy - r * 0.9 + dy),
                (cx + dx * 0.3, cy + r * 1.3), (cx - r * 0.75 + dx, cy - r * 0.9 + dy)],
               fill=c(145), width=lw(u), joint="curve")
        d.line([cx + dx * 0.3, cy + r * 1.3, cx + dx * 0.1, cy + r * 2.5], fill=c(145), width=lw(u))
        d.line([cx - r * 0.55, cy + r * 2.5, cx + r * 0.55, cy + r * 2.5], fill=c(145), width=lw(u))
    for _ in range(9):
        sx, sy = w * rnd.uniform(0.28, 0.72), h * rnd.uniform(0.2, 0.38)
        sr = u * rnd.uniform(0.006, 0.014)
        d.ellipse([sx - sr, sy - sr, sx + sr, sy + sr], fill=c(rnd.randint(70, 150)))


def s_monogram(d, w, h, c, u, rnd):
    """A restrained 'A' mark — for the widest hero-style crops."""
    cx, cy = w * 0.5, h * 0.52
    r = u * 0.2
    d.line([cx - r * 0.72, cy + r, cx, cy - r], fill=c(140), width=lw(u, 1.1))
    d.line([cx, cy - r, cx + r * 0.72, cy + r], fill=c(140), width=lw(u, 1.1))
    d.line([cx - r * 0.36, cy + r * 0.12, cx + r * 0.36, cy + r * 0.12], fill=c(140), width=lw(u, 1.1))
    d.ellipse([cx - r * 1.5, cy - r * 1.5, cx + r * 1.5, cy + r * 1.5], outline=c(45), width=lw(u, 0.7))


def s_pendant(d, w, h, c, u, rnd):
    """Hanging pendant lights over a bar — the interior/atmosphere slot."""
    for i, (x, drop) in enumerate(((0.32, 0.30), (0.5, 0.42), (0.68, 0.34))):
        cx, top = w * x, h * 0.1
        y = h * drop
        d.line([cx, top, cx, y], fill=c(70), width=lw(u, 0.7))
        sw = u * 0.062
        d.line([(cx - sw, y + u * 0.085), (cx - sw * 0.22, y), (cx + sw * 0.22, y),
                (cx + sw, y + u * 0.085), (cx - sw, y + u * 0.085)],
               fill=c(140 - i * 10), width=lw(u, 0.9), joint="curve")
        gr = u * 0.019
        d.ellipse([cx - gr, y + u * 0.1 - gr, cx + gr, y + u * 0.1 + gr], fill=c(150))
    d.line([w * 0.1, h * 0.8, w * 0.9, h * 0.8], fill=c(70), width=lw(u, 0.8))


def s_board(d, w, h, c, u, rnd):
    """Serving board — the sharing-platter slot."""
    cx, cy = w * 0.47, h * 0.52
    bw, bh = u * 0.27, u * 0.19
    d.rounded_rectangle([cx - bw, cy - bh, cx + bw, cy + bh], radius=u * 0.028,
                        outline=c(145), width=lw(u))
    hr = u * 0.028
    d.ellipse([cx + bw * 0.72 - hr, cy - hr, cx + bw * 0.72 + hr, cy + hr],
              outline=c(95), width=lw(u, 0.7))
    for i in range(3):
        x = cx - bw * 0.5 + i * bw * 0.34
        d.line([x, cy - bh * 0.55, x, cy + bh * 0.55], fill=c(85), width=lw(u, 0.75))
    d.line([cx - bw * 1.25, cy + bh * 1.5, cx + bw * 1.25, cy + bh * 1.5], fill=c(60), width=lw(u, 0.7))


def s_cutlery(d, w, h, c, u, rnd):
    """Fork and knife, laid as a place setting."""
    top, bot = h * 0.34, h * 0.68
    fx, kx = w * 0.44, w * 0.56
    # fork: handle plus three tines
    d.line([fx, top + u * 0.1, fx, bot], fill=c(140), width=lw(u, 0.9))
    for k in (-1, 0, 1):
        tx = fx + k * u * 0.028
        d.line([tx, top, tx, top + u * 0.085], fill=c(130), width=lw(u, 0.75))
    d.line([fx - u * 0.028, top + u * 0.085, fx + u * 0.028, top + u * 0.085],
           fill=c(130), width=lw(u, 0.75))
    # knife: handle plus a tapered blade
    d.line([kx, top + u * 0.14, kx, bot], fill=c(140), width=lw(u, 0.9))
    d.line([(kx, top + u * 0.14), (kx - u * 0.026, top + u * 0.06), (kx, top),
            (kx + u * 0.012, top + u * 0.07), (kx, top + u * 0.14)],
           fill=c(130), width=lw(u, 0.75), joint="curve")
    d.line([w * 0.28, bot + u * 0.07, w * 0.72, bot + u * 0.07], fill=c(60), width=lw(u, 0.7))


def s_skewer(d, w, h, c, u, rnd):
    """Two skewers — the grill/food slot."""
    for i, off in enumerate((-0.09, 0.09)):
        x0, y0 = w * (0.3 + off), h * (0.68 - off * 0.4)
        x1, y1 = w * (0.7 + off), h * (0.34 - off * 0.4)
        d.line([x0, y0, x1, y1], fill=c(95), width=lw(u, 0.8))
        for k in range(3):
            t = 0.22 + k * 0.26
            cx, cy = x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
            r = u * 0.042
            d.rounded_rectangle([cx - r, cy - r * 0.82, cx + r, cy + r * 0.82], radius=u * 0.012,
                                outline=c(140 - k * 12), width=lw(u, 0.8))


def s_chairs(d, w, h, c, u, rnd):
    """Two chairs at a small table — the dining-room slot."""
    base = h * 0.76
    tr = u * 0.1
    d.ellipse([w * 0.5 - tr, base - u * 0.2 - tr * 0.36, w * 0.5 + tr, base - u * 0.2 + tr * 0.36],
              outline=c(120), width=lw(u, 0.85))
    d.line([w * 0.5, base - u * 0.18, w * 0.5, base], fill=c(120), width=lw(u, 0.8))
    for sx in (-1, 1):
        cx = w * 0.5 + sx * u * 0.24
        bw = u * 0.056
        d.rounded_rectangle([cx - bw, base - u * 0.3, cx + bw, base - u * 0.12], radius=u * 0.02,
                            outline=c(135), width=lw(u, 0.85))
        d.line([cx - bw, base - u * 0.1, cx + bw, base - u * 0.1], fill=c(135), width=lw(u, 0.85))
        for lx in (-bw * 0.8, bw * 0.8):
            d.line([cx + lx, base - u * 0.1, cx + lx, base], fill=c(100), width=lw(u, 0.7))
    d.line([w * 0.08, base, w * 0.92, base], fill=c(60), width=lw(u, 0.7))


def s_candle(d, w, h, c, u, rnd):
    """Candlelight on a table — the evening-atmosphere slot."""
    cx, base = w * 0.5, h * 0.66
    cw, ch = u * 0.042, u * 0.2
    d.rounded_rectangle([cx - cw, base - ch, cx + cw, base], radius=u * 0.008,
                        outline=c(140), width=lw(u, 0.9))
    pts = []
    for side in (-1, 1):
        rng = range(19) if side == -1 else range(18, -1, -1)
        for i in rng:
            t = i / 18
            spread = math.sin(t * math.pi) * (1 - t) ** 0.5
            pts.append((cx + side * u * 0.03 * spread, base - ch - u * 0.09 * t))
    d.line(pts + [pts[0]], fill=c(175), width=lw(u, 0.8), joint="curve")
    d.line([cx - u * 0.3, base + u * 0.02, cx + u * 0.3, base + u * 0.02], fill=c(75), width=lw(u, 0.8))
    for _ in range(6):
        sx, sy = w * rnd.uniform(0.2, 0.8), h * rnd.uniform(0.18, 0.4)
        sr = u * rnd.uniform(0.005, 0.011)
        d.ellipse([sx - sr, sy - sr, sx + sr, sy + sr], fill=c(rnd.randint(60, 120)))


SUBJECTS = {n[2:]: f for n, f in list(globals().items()) if n.startswith("s_")}


# --------------------------------------------------------------------------- #
def render(path, size, tone, subject):
    rnd = random.Random(path)
    top, bottom, light, line = TONES[tone]
    w, h = size[0] * SS, size[1] * SS
    u = min(w, h)

    img = gradient((w, h), top, bottom, angle=rnd.choice([0, 10, -10]))
    glow(img, light, (rnd.uniform(0.34, 0.66), rnd.uniform(0.14, 0.4)), rnd.uniform(0.5, 0.72), 0.85)
    bokeh(img, light, rnd, count=rnd.randint(12, 20), strength=0.5)

    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    SUBJECTS[subject](ImageDraw.Draw(layer), w, h,
                      lambda a: (line[0], line[1], line[2], max(0, min(255, a))), u, rnd)
    layer = layer.filter(ImageFilter.GaussianBlur(max(w, h) * 0.0016))
    img = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")

    glow(img, light, (0.5, 0.95), 0.4, 0.3)
    vignette(img)
    img = grain(img.resize(size, Image.LANCZOS))

    dest = OUT / path
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=86, optimize=True, progressive=True)


HERO = (1920, 1080)
PORTRAIT = (1000, 1250)
FEATURE = (1000, 1200)
BANNER = (1800, 900)
TILE_W = (1200, 800)
TILE_S = (800, 800)

SPECS = [
    ("hero.jpg",        HERO,     "night", "table"),
    ("about.jpg",       PORTRAIT, "warm",  "pendant"),
    ("grill.jpg",       FEATURE,  "teal",  "grill"),
    ("occasion.jpg",    BANNER,   "night", "celebrate"),

    ("signature-1.jpg", FEATURE,  "deep",  "plate"),
    ("signature-2.jpg", FEATURE,  "warm",  "flame"),
    ("signature-3.jpg", FEATURE,  "teal",  "board"),

    ("gallery/food-1.jpg",       TILE_S, "deep",  "cutlery"),
    ("gallery/food-2.jpg",       TILE_S, "warm",  "skewer"),
    ("gallery/interior-1.jpg",   TILE_W, "ash",   "arch"),
    ("gallery/restaurant-1.jpg", TILE_S, "night", "chairs"),
    ("gallery/drinks-1.jpg",     TILE_S, "teal",  "glass"),
    ("gallery/drinks-2.jpg",     TILE_S, "deep",  "bottles"),
    ("gallery/experience-1.jpg", TILE_S, "warm",  "monogram"),
    ("gallery/event-1.jpg",      TILE_W, "night", "candle"),
]

if __name__ == "__main__":
    for spec in SPECS:
        render(*spec)
        print(f"  ✓ {spec[0]}")
    print(f"\n{len(SPECS)} placeholders written to {OUT}")
