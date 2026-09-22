#!/usr/bin/env python3
"""
Generate on-brand placeholder artwork for every image path referenced in
`lib/data/*`, plus the hero poster and the two vibe panels.

These are abstract, palette-matched illustrations — deliberately not fake
photos. They exist so the site reads as finished before the shoot. Drop a real
JPG over any of them at the same path and nothing in the code changes.

    python3 scripts/generate_placeholders.py

Requires Pillow:  pip install Pillow

Motifs are assigned so that no two images visible on the same page share one.
"""

from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "media"

SS = 2  # supersample factor — Pillow's draw has no AA, so render big and shrink

# --------------------------------------------------------------------------- #
#  Palette (mirrors tailwind.config.ts)
# --------------------------------------------------------------------------- #
TONES = {
    "terracotta": {"top": (68, 31, 15), "bottom": (18, 10, 6),  "glow": (206, 104, 50), "ink": (243, 221, 170)},
    "ember":      {"top": (80, 35, 16), "bottom": (15, 9, 7),   "glow": (233, 110, 62), "ink": (247, 243, 236)},
    "gold":       {"top": (64, 47, 18), "bottom": (16, 13, 7),  "glow": (224, 178, 88), "ink": (250, 240, 214)},
    "foliage":    {"top": (30, 64, 38), "bottom": (10, 20, 13), "glow": (94, 178, 108), "ink": (219, 241, 224)},
    "night":      {"top": (40, 23, 52), "bottom": (10, 10, 13), "glow": (198, 100, 60), "ink": (243, 221, 170)},
    "charcoal":   {"top": (48, 45, 43), "bottom": (11, 11, 11), "glow": (128, 122, 116), "ink": (235, 233, 230)},
    "cream":      {"top": (76, 58, 38), "bottom": (18, 14, 10), "glow": (238, 206, 148), "ink": (250, 246, 238)},
}


# --------------------------------------------------------------------------- #
#  Compositing helpers
# --------------------------------------------------------------------------- #
def lerp(a: int, b: int, t: float) -> int:
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
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=int(255 * (1 - t) ** 1.8 * strength))
    mask = mask.filter(ImageFilter.GaussianBlur(r * 0.14))
    layer = Image.new("RGB", (w, h), color)
    img.paste(Image.composite(ImageChops.screen(img, layer), img, mask), (0, 0))


def bokeh(img, color, rnd, count=14, strength=0.55):
    """Out-of-focus highlights — the single biggest cue that reads as 'photo'."""
    w, h = img.size
    layer = Image.new("RGB", (w, h), (0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(count):
        r = min(w, h) * rnd.uniform(0.02, 0.085)
        cx = rnd.uniform(-0.05, 1.05) * w
        cy = rnd.uniform(-0.05, 0.75) * h
        v = rnd.uniform(0.25, 1.0) * strength
        d.ellipse([cx - r, cy - r, cx + r, cy + r],
                  fill=(int(color[0] * v), int(color[1] * v), int(color[2] * v)))
    layer = layer.filter(ImageFilter.GaussianBlur(min(w, h) * 0.022))
    img.paste(ImageChops.screen(img, layer), (0, 0))


def surface(img, rnd):
    """Dark plane across the lower third so dish shots sit on something."""
    w, h = img.size
    y = int(h * rnd.uniform(0.7, 0.78))
    band = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(band)
    d.rectangle([0, y, w, h], fill=170)
    band = band.filter(ImageFilter.GaussianBlur(h * 0.05))
    dark = Image.new("RGB", (w, h), (0, 0, 0))
    img.paste(Image.composite(Image.blend(img, dark, 0.55), img, band), (0, 0))


def vignette(img, amount=0.72):
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    for i in range(30):
        t = i / 30
        ix, iy = w * 0.5 * t, h * 0.5 * t
        d.ellipse([ix - w * 0.18, iy - h * 0.18, w - ix + w * 0.18, h - iy + h * 0.18],
                  fill=int(255 * (1 - t)))
    mask = mask.filter(ImageFilter.GaussianBlur(min(w, h) * 0.08))
    dark = Image.new("RGB", (w, h), (0, 0, 0))
    img.paste(Image.blend(dark, img, amount), (0, 0), ImageChops.invert(mask))


def grain(img, sigma=7.0):
    noise = Image.effect_noise(img.size, sigma).convert("RGB")
    return Image.blend(img, ImageChops.overlay(img, noise), 0.18)


# --------------------------------------------------------------------------- #
#  Shape helpers
# --------------------------------------------------------------------------- #
def leaf_poly(cx, cy, length, angle, fat=0.4):
    pts = []
    for side in (1, -1):
        rng = range(21) if side == 1 else range(20, -1, -1)
        for k in rng:
            t = k / 20
            wd = math.sin(t * math.pi) * length * fat * side
            pts.append((cx + math.cos(angle) * (t - 0.5) * length * 2 - math.sin(angle) * wd,
                        cy + math.sin(angle) * (t - 0.5) * length * 2 + math.cos(angle) * wd))
    return pts


def flame_poly(cx, base, w, h, wob):
    pts = []
    for side in (-1, 1):
        rng = range(29) if side == -1 else range(28, -1, -1)
        for i in rng:
            t = i / 28
            spread = math.sin(t * math.pi) * (1 - t) ** 0.55
            pts.append((cx + side * w * spread + math.sin(t * 6 + wob) * w * 0.18 * t, base - h * t))
    return pts


# --------------------------------------------------------------------------- #
#  Motifs — drawn onto an RGBA layer, then blurred slightly and composited
# --------------------------------------------------------------------------- #
def m_flame(d, w, h, c, r_):
    base, u = h * 0.86, min(w, h)
    for sw, sh, a in ((0.30, 0.62, 70), (0.21, 0.48, 120), (0.12, 0.33, 190)):
        d.polygon(flame_poly(w * 0.5, base, w * sw, h * sh, r_.uniform(0, 6)), fill=c(a))
    d.ellipse([w * 0.2, base - h * 0.04, w * 0.8, base + h * 0.06], fill=c(55))


def m_smoke(d, w, h, c, r_):
    u = min(w, h)
    d.ellipse([w * 0.26, h * 0.74, w * 0.74, h * 0.87], fill=c(70))
    d.rounded_rectangle([w * 0.34, h * 0.68, w * 0.66, h * 0.80], radius=u * 0.03, fill=c(150))
    for k in range(3):
        d.line([w * (0.39 + k * 0.09), h * 0.685, w * (0.39 + k * 0.09), h * 0.795],
               fill=c(60), width=int(u * 0.01))
    for i in range(3):
        x = w * (0.38 + i * 0.12)
        pts = [(x + math.sin(t * 3.4 + i) * u * 0.06, h * 0.76 - t * h * 0.5) for t in
               [k / 22 for k in range(23)]]
        d.line(pts, fill=c(95 - i * 18), width=int(u * 0.022), joint="curve")
    for _ in range(5):
        gx, gy = w * r_.uniform(0.3, 0.7), h * r_.uniform(0.76, 0.84)
        gr = u * r_.uniform(0.012, 0.025)
        d.ellipse([gx - gr, gy - gr, gx + gr, gy + gr], fill=c(200))


def m_grill(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.54, min(w, h)
    rr = u * 0.30
    d.ellipse([cx - rr, cy - rr * 0.62, cx + rr, cy + rr * 0.62], fill=(0, 0, 0, 150))
    d.ellipse([cx - rr, cy - rr * 0.62, cx + rr, cy + rr * 0.62], outline=c(110), width=int(u * 0.008))
    for i in range(7):
        y = cy - rr * 0.62 + rr * 1.24 * (i + 1) / 8
        half = rr * math.sqrt(max(0.0, 1 - ((y - cy) / (rr * 0.62)) ** 2))
        d.line([cx - half, y, cx + half, y], fill=c(90), width=int(u * 0.006))
    for _ in range(4):
        gx, gy = cx + r_.uniform(-.6, .6) * rr, cy + r_.uniform(-.3, .3) * rr
        gr = rr * r_.uniform(0.05, 0.1)
        d.ellipse([gx - gr, gy - gr, gx + gr, gy + gr], fill=c(200))


def m_chop(d, w, h, c, r_):
    u = min(w, h)
    for dx, dy, ang, s in ((-0.09, 0.06, -0.55, 1.0), (0.10, -0.04, -0.30, 0.88)):
        cx, cy = w * (0.46 + dx), h * (0.52 + dy)
        mr = u * 0.135 * s
        d.ellipse([cx - mr, cy - mr * 0.85, cx + mr, cy + mr * 0.85], fill=c(140))
        d.ellipse([cx - mr * 0.6, cy - mr * 0.5, cx + mr * 0.6, cy + mr * 0.5], fill=c(70))
        bx, by = cx + math.cos(ang) * mr * 0.8, cy + math.sin(ang) * mr * 0.8
        ex, ey = cx + math.cos(ang) * mr * 2.1, cy + math.sin(ang) * mr * 2.1
        d.line([bx, by, ex, ey], fill=c(200), width=int(u * 0.022))
        kr = u * 0.026 * s
        d.ellipse([ex - kr, ey - kr, ex + kr, ey + kr], fill=c(200))


def m_coil(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.5, min(w, h)
    pts = []
    for k in range(150):
        t = k / 149
        a = t * math.tau * 2.6
        rad = u * (0.07 + t * 0.2)
        pts.append((cx + math.cos(a) * rad, cy + math.sin(a) * rad * 0.82))
    d.line(pts, fill=c(140), width=int(u * 0.055), joint="curve")


def m_fish(d, w, h, c, r_):
    cx, cy, u = w * 0.48, h * 0.5, min(w, h)
    rr = u * 0.26
    d.polygon([(cx - rr, cy), (cx - rr * 0.2, cy - rr * 0.48), (cx + rr * 0.72, cy),
               (cx - rr * 0.2, cy + rr * 0.48)], fill=c(125))
    d.polygon([(cx + rr * 0.62, cy), (cx + rr * 1.15, cy - rr * 0.36), (cx + rr * 1.15, cy + rr * 0.36)],
              fill=c(125))
    e = rr * 0.08
    d.ellipse([cx - rr * 0.68 - e, cy - e, cx - rr * 0.68 + e, cy + e], fill=(0, 0, 0, 200))


def m_burger(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.5, min(w, h)
    rr = u * 0.26
    d.pieslice([cx - rr, cy - rr * 1.15, cx + rr, cy + rr * 0.35], 180, 360, fill=c(140))
    d.rounded_rectangle([cx - rr, cy - rr * 0.1, cx + rr, cy + rr * 0.28], radius=rr * 0.12, fill=c(95))
    d.rounded_rectangle([cx - rr * 1.05, cy + rr * 0.24, cx + rr * 1.05, cy + rr * 0.52],
                        radius=rr * 0.12, fill=c(175))
    d.rounded_rectangle([cx - rr, cy + rr * 0.5, cx + rr, cy + rr * 0.95], radius=rr * 0.2, fill=c(140))


def m_plate(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.5, min(w, h)
    rr = u * 0.31
    d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=c(30))
    d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], outline=c(130), width=int(u * 0.011))
    d.ellipse([cx - rr * .8, cy - rr * .8, cx + rr * .8, cy + rr * .8], outline=c(60), width=int(u * 0.005))
    n = r_.randint(4, 5)
    a0 = r_.uniform(0, math.tau)
    for i in range(n):
        a = a0 + i * math.tau / n
        dist = rr * 0.40
        br = rr * r_.uniform(0.19, 0.27)
        bx, by = cx + math.cos(a) * dist, cy + math.sin(a) * dist * 0.92
        d.ellipse([bx - br, by - br, bx + br, by + br], fill=c(r_.randint(110, 175)))
    for sx in (cx - rr * 1.38, cx + rr * 1.38):  # cutlery
        d.rounded_rectangle([sx - u * .012, cy - rr * .6, sx + u * .012, cy + rr * .6],
                            radius=u * .012, fill=c(85))


def m_egg(d, w, h, c, r_):
    u = min(w, h)
    for dx, dy, s in ((-0.11, 0.02, 1.0), (0.12, -0.05, 0.86)):
        cx, cy = w * (0.5 + dx), h * (0.5 + dy)
        rr = u * 0.2 * s
        d.ellipse([cx - rr, cy - rr * 0.8, cx + rr, cy + rr * 0.8], fill=c(160))
        yr = rr * 0.36
        d.ellipse([cx - yr, cy - yr, cx + yr, cy + yr], fill=c(235))


def m_pan(d, w, h, c, r_):
    cx, cy, u = w * 0.46, h * 0.52, min(w, h)
    rr = u * 0.27
    d.ellipse([cx - rr, cy - rr * 0.78, cx + rr, cy + rr * 0.78], fill=c(55))
    d.ellipse([cx - rr, cy - rr * 0.78, cx + rr, cy + rr * 0.78], outline=c(140), width=int(u * 0.016))
    d.rounded_rectangle([cx + rr * 0.9, cy - u * 0.022, cx + rr * 2.0, cy + u * 0.022],
                        radius=u * 0.022, fill=c(140))
    for _ in range(4):
        a, dist = r_.uniform(0, math.tau), r_.uniform(0, rr * 0.4)
        br = rr * r_.uniform(0.12, 0.2)
        bx, by = cx + math.cos(a) * dist, cy + math.sin(a) * dist * 0.75
        d.ellipse([bx - br, by - br * 0.85, bx + br, by + br * 0.85], fill=c(r_.randint(120, 190)))


def m_stack(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.60, min(w, h)
    rw, rh = u * 0.25, u * 0.052
    for i in range(3):
        y = cy - i * rh * 1.35
        d.rounded_rectangle([cx - rw, y - rh, cx + rw, y + rh], radius=rh, fill=c(118 + i * 24))
    top = cy - 2 * rh * 1.35
    d.ellipse([cx - rw * 0.34, top - rh * 1.15, cx + rw * 0.34, top - rh * 0.25], fill=c(215))
    for sx in (-0.62, 0.55):                 # syrup running down the side
        d.line([cx + rw * sx, top - rh * 0.2, cx + rw * sx, top + rh * r_.uniform(1.2, 2.0)],
               fill=c(175), width=int(u * 0.013))


def m_bowl(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.52, min(w, h)
    rr = u * 0.28
    lip = cy - rr * 0.1                      # the bowl's open rim line
    d.pieslice([cx - rr, lip - rr * 0.9, cx + rr, lip + rr * 0.9], 0, 180, fill=c(100))
    d.ellipse([cx - rr, lip - rr * 0.26, cx + rr, lip + rr * 0.26], fill=c(52))
    for i in range(5):                       # contents heaped above the rim
        a = -math.pi * (0.12 + i * 0.19)
        bx = cx + math.cos(a) * rr * 0.52
        by = lip + math.sin(a) * rr * 0.3
        br = rr * r_.uniform(0.22, 0.31)
        d.ellipse([bx - br, by - br * 0.9, bx + br, by + br * 0.9], fill=c(r_.randint(130, 190)))
    d.ellipse([cx - rr, lip - rr * 0.26, cx + rr, lip + rr * 0.26], outline=c(160), width=int(u * 0.01))
    d.ellipse([cx - rr * 0.58, cy + rr * 0.72, cx + rr * 0.58, cy + rr * 0.95], fill=c(80))


def m_cone(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.58, min(w, h)
    rr = u * 0.145
    d.polygon([(cx - rr * 0.92, cy), (cx + rr * 0.92, cy), (cx, cy + rr * 2.6)], fill=c(115))
    for k in (-1, 0, 1):                     # waffle texture, following the taper
        d.line([cx + k * rr * 0.52, cy + rr * 0.2, cx + k * rr * 0.16, cy + rr * 1.85],
               fill=c(60), width=int(min(w, h) * 0.006))
    for i in range(1, r_.randint(2, 4)):
        y = cy - rr * (0.12 + (i - 1) * 0.95)
        s = 0.95 - (i - 1) * 0.08
        d.ellipse([cx - rr * s, y - rr * s, cx + rr * s, y + rr * s], fill=c(175 - i * 20))


def m_tub(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.58, min(w, h)
    tw = u * 0.24
    d.polygon([(cx - tw, cy), (cx + tw, cy), (cx + tw * 0.76, cy + u * 0.26),
               (cx - tw * 0.76, cy + u * 0.26)], fill=c(95))
    d.ellipse([cx - tw, cy - u * 0.035, cx + tw, cy + u * 0.035], fill=c(130))
    for dx in (-0.55, 0.0, 0.55):
        sr = u * 0.085
        d.ellipse([cx + dx * tw - sr, cy - u * 0.05 - sr, cx + dx * tw + sr, cy - u * 0.05 + sr],
                  fill=c(175))


def m_swirl(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.62, min(w, h)
    rr = u * 0.13
    d.polygon([(cx - rr * 0.9, cy), (cx + rr * 0.9, cy), (cx, cy + rr * 2.4)], fill=c(105))
    for i in range(5):
        t = i / 4
        y = cy - rr * (0.1 + t * 1.7)
        s = rr * (0.95 - t * 0.6)
        x = cx + math.sin(t * 4.2) * rr * 0.16
        d.ellipse([x - s, y - s * 0.8, x + s, y + s * 0.8], fill=c(180 - i * 14))


def m_scoops(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.54, min(w, h)
    rr = u * 0.105
    d.ellipse([cx - u * 0.3, cy + rr * 0.55, cx + u * 0.3, cy + rr * 1.5], fill=c(70))
    for i, dx in enumerate((-1.05, 0.0, 1.05)):
        x = cx + dx * rr * 1.05
        y = cy - (rr * 0.35 if i == 1 else 0)
        d.ellipse([x - rr, y - rr, x + rr, y + rr], fill=c(180 - i * 18))
        hr = rr * 0.3
        d.ellipse([x - hr - rr * 0.3, y - hr - rr * 0.35, x - rr * 0.3, y - rr * 0.35], fill=c(225))


def m_sundae(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.52, min(w, h)
    gw = u * 0.155
    d.polygon([(cx - gw, cy - gw * 0.5), (cx + gw, cy - gw * 0.5),
               (cx + gw * 0.45, cy + gw * 1.5), (cx - gw * 0.45, cy + gw * 1.5)], fill=c(95))
    d.rectangle([cx - gw * 0.08, cy + gw * 1.45, cx + gw * 0.08, cy + gw * 2.3], fill=c(95))
    d.ellipse([cx - gw * 0.72, cy + gw * 2.2, cx + gw * 0.72, cy + gw * 2.55], fill=c(95))
    for dx, dy, s in ((-0.5, -0.5, 0.82), (0.5, -0.5, 0.82), (0.0, -1.05, 0.95)):
        sr = gw * 0.62 * s
        d.ellipse([cx + dx * gw - sr, cy + dy * gw - sr, cx + dx * gw + sr, cy + dy * gw + sr],
                  fill=c(185))
    d.line([cx + gw * 0.95, cy - gw * 2.3, cx + gw * 0.2, cy - gw * 1.5], fill=c(215),
           width=int(u * 0.018))


def m_cup(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.5, min(w, h)
    rr = u * 0.19
    d.rounded_rectangle([cx - rr, cy - rr * 0.55, cx + rr, cy + rr * 0.95], radius=rr * 0.25, fill=c(120))
    d.arc([cx + rr * 0.55, cy - rr * 0.25, cx + rr * 1.6, cy + rr * 0.65], -90, 90, fill=c(120),
          width=int(u * 0.022))
    d.ellipse([cx - rr * 0.82, cy - rr * 0.72, cx + rr * 0.82, cy - rr * 0.34], fill=c(195))
    for i in range(3):
        sx = cx + (i - 1) * rr * 0.5
        d.arc([sx - rr * 0.18, cy - rr * 1.6, sx + rr * 0.18, cy - rr * 0.9], 200, 340, fill=c(70),
              width=int(u * 0.012))


def m_glass(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.46, min(w, h)
    rr = u * 0.20
    d.polygon([(cx - rr, cy - rr * 0.75), (cx + rr, cy - rr * 0.75), (cx, cy + rr * 0.85)], fill=c(115))
    d.rectangle([cx - rr * 0.06, cy + rr * 0.8, cx + rr * 0.06, cy + rr * 1.75], fill=c(115))
    d.ellipse([cx - rr * 0.62, cy + rr * 1.66, cx + rr * 0.62, cy + rr * 1.95], fill=c(115))
    gx, gy = cx + rr * 0.72, cy - rr * 0.95
    d.ellipse([gx - rr * 0.2, gy - rr * 0.2, gx + rr * 0.2, gy + rr * 0.2], fill=c(190))


def m_wineglass(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.44, min(w, h)
    rr = u * 0.17
    d.pieslice([cx - rr, cy - rr * 1.25, cx + rr, cy + rr * 1.0], 0, 180, fill=c(110))
    d.ellipse([cx - rr, cy - rr * 1.4, cx + rr, cy - rr * 1.05], fill=c(150))
    d.rectangle([cx - rr * 0.07, cy + rr * 0.9, cx + rr * 0.07, cy + rr * 2.0], fill=c(110))
    d.ellipse([cx - rr * 0.7, cy + rr * 1.9, cx + rr * 0.7, cy + rr * 2.2], fill=c(110))


def m_tumbler(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.52, min(w, h)
    rw, rh = u * 0.17, u * 0.2
    d.rounded_rectangle([cx - rw, cy - rh, cx + rw, cy + rh], radius=u * 0.02, fill=c(70))
    d.rounded_rectangle([cx - rw, cy - rh, cx + rw, cy + rh], radius=u * 0.02, outline=c(150),
                        width=int(u * 0.011))
    d.rounded_rectangle([cx - rw * 0.9, cy - rh * 0.1, cx + rw * 0.9, cy + rh * 0.9], radius=u * 0.015,
                        fill=c(120))
    for dx, dy in ((-0.4, -0.2), (0.3, 0.15)):
        s = u * 0.05
        d.rounded_rectangle([cx + dx * rw - s, cy + dy * rh - s, cx + dx * rw + s, cy + dy * rh + s],
                            radius=u * 0.012, fill=c(205))
    wx, wy, wr = cx + rw * 0.72, cy - rh * 0.88, u * 0.058
    d.ellipse([wx - wr, wy - wr, wx + wr, wy + wr], fill=c(200))
    d.ellipse([wx - wr * 0.62, wy - wr * 0.62, wx + wr * 0.62, wy + wr * 0.62], fill=c(120))


def m_highball(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.52, min(w, h)
    rw, rh = u * 0.125, u * 0.28
    d.rounded_rectangle([cx - rw, cy - rh, cx + rw, cy + rh], radius=u * 0.018, fill=c(70))
    d.rounded_rectangle([cx - rw * 0.88, cy - rh * 0.55, cx + rw * 0.88, cy + rh * 0.92],
                        radius=u * 0.015, fill=c(125))
    d.rounded_rectangle([cx - rw, cy - rh, cx + rw, cy + rh], radius=u * 0.018, outline=c(155),
                        width=int(u * 0.011))
    d.line([cx + rw * 0.35, cy - rh * 1.3, cx - rw * 0.2, cy + rh * 0.6], fill=c(185), width=int(u * 0.018))
    for dy in (-0.25, 0.25):
        s = u * 0.042
        d.ellipse([cx - s, cy + dy * rh - s, cx + s, cy + dy * rh + s], fill=c(200))


def m_pint(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.53, min(w, h)
    tw, bw, hh = u * 0.165, u * 0.125, u * 0.25
    d.polygon([(cx - tw, cy - hh), (cx + tw, cy - hh), (cx + bw, cy + hh), (cx - bw, cy + hh)], fill=c(120))
    d.ellipse([cx - tw, cy - hh * 1.4, cx + tw, cy - hh * 0.72], fill=c(205))
    for _ in range(6):
        bx, by = cx + r_.uniform(-.7, .7) * bw, cy + r_.uniform(-.5, .8) * hh
        br = u * r_.uniform(0.008, 0.017)
        d.ellipse([bx - br, by - br, bx + br, by + br], fill=c(190))


def m_bottle(d, w, h, c, r_):
    cx, base, u = w * 0.5, h * 0.76, min(w, h)
    for off in (-1, 0, 1):
        bw = u * 0.085
        bh = u * (0.42 if off == 0 else 0.34)
        x = cx + off * bw * 2.6
        a = 105 - abs(off) * 20
        d.rounded_rectangle([x - bw, base - bh * 0.62, x + bw, base], radius=bw * 0.4, fill=c(a))
        d.rounded_rectangle([x - bw * 0.3, base - bh, x + bw * 0.3, base - bh * 0.55], radius=bw * 0.2,
                            fill=c(a))
        d.rounded_rectangle([x - bw * 0.34, base - bh * 1.06, x + bw * 0.34, base - bh * 0.94],
                            radius=bw * 0.1, fill=c(a + 60))


def m_leaf(d, w, h, c, r_):
    u = min(w, h)
    for _ in range(5):
        d.polygon(leaf_poly(w * r_.uniform(0.24, 0.76), h * r_.uniform(0.3, 0.7),
                            u * r_.uniform(0.1, 0.18), r_.uniform(0, math.tau), 0.4),
                  fill=c(r_.randint(60, 130)))


def m_palms(d, w, h, c, r_):
    u = min(w, h)
    d.line([0, h * 0.84, w, h * 0.84], fill=c(45), width=int(u * 0.008))
    for i in range(3):
        x = w * (0.26 + i * 0.24) + r_.uniform(-.02, .02) * w
        top = h * r_.uniform(0.3, 0.42)
        d.line([x, h * 0.86, x + r_.uniform(-.03, .03) * w, top], fill=c(105), width=int(u * 0.016))
        for k in range(6):
            a = math.pi * (0.08 + k * 0.17) + r_.uniform(-.06, .06)
            d.polygon(leaf_poly(x + math.cos(a + math.pi) * u * 0.11,
                                top + math.sin(a + math.pi) * u * 0.09,
                                u * r_.uniform(0.09, 0.13), a, 0.3), fill=c(r_.randint(75, 125)))


def m_sun(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.44, min(w, h)
    rr = u * 0.2
    d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=c(155))
    for i in range(12):
        a = i * math.tau / 12 + r_.uniform(-.05, .05)
        d.line([cx + math.cos(a) * rr * 1.3, cy + math.sin(a) * rr * 1.3,
                cx + math.cos(a) * rr * 1.75, cy + math.sin(a) * rr * 1.75],
               fill=c(100), width=int(u * 0.016))
    d.line([0, h * 0.79, w, h * 0.79], fill=c(70), width=int(u * 0.006))


def m_stage(d, w, h, c, r_):
    u = min(w, h)
    for i in range(4):
        ox = w * (0.18 + i * 0.22) + r_.uniform(-.02, .02) * w
        d.polygon([(ox, -h * 0.05), (ox + w * 0.035, -h * 0.05),
                   (ox + w * r_.uniform(0.16, 0.3), h * 0.9),
                   (ox - w * r_.uniform(0.1, 0.22), h * 0.9)], fill=c(r_.randint(30, 55)))
    y, x = h * 0.93, -w * 0.05
    while x < w * 1.05:
        hr = u * r_.uniform(0.035, 0.06)
        d.ellipse([x - hr, y - hr * 3.4, x + hr, y - hr * 1.4], fill=(0, 0, 0, 195))
        d.rounded_rectangle([x - hr * 1.7, y - hr * 1.7, x + hr * 1.7, y + hr * 3], radius=hr,
                            fill=(0, 0, 0, 195))
        x += hr * 2.4


def m_disc(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.5, min(w, h)
    rr = u * 0.32
    d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=(0, 0, 0, 170))
    for i in range(7):
        s = rr * (0.94 - i * 0.1)
        d.ellipse([cx - s, cy - s, cx + s, cy + s], outline=c(60 + i * 8), width=max(1, int(u * 0.005)))
    d.ellipse([cx - rr * .24, cy - rr * .24, cx + rr * .24, cy + rr * .24], fill=c(205))
    d.ellipse([cx - rr * .04, cy - rr * .04, cx + rr * .04, cy + rr * .04], fill=(0, 0, 0, 220))


def m_equalizer(d, w, h, c, r_):
    u = min(w, h)
    bars, bw = 9, w * 0.052
    gap = bw * 0.55
    total = bars * bw + (bars - 1) * gap
    x0 = (w - total) / 2
    base = h * 0.74
    for i in range(bars):
        bh = h * (0.12 + abs(math.sin(i * 1.1 + 0.4)) * 0.34)
        x = x0 + i * (bw + gap)
        d.rounded_rectangle([x, base - bh, x + bw, base], radius=bw * 0.42, fill=c(90 + int(bh / h * 220)))
        d.rounded_rectangle([x, base - bh - u * 0.035, x + bw, base - bh - u * 0.008],
                            radius=bw * 0.42, fill=c(215))
    d.line([w * 0.08, base + u * 0.02, w * 0.92, base + u * 0.02], fill=c(55), width=int(u * 0.006))


def m_mic(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.44, min(w, h)
    rr = u * 0.085
    d.rounded_rectangle([cx - rr, cy - rr * 1.9, cx + rr, cy + rr * 0.7], radius=rr, fill=c(155))
    d.arc([cx - rr * 1.9, cy - rr * 0.7, cx + rr * 1.9, cy + rr * 2.1], 0, 180, fill=c(155),
          width=int(u * 0.016))
    d.rectangle([cx - rr * 0.12, cy + rr * 1.9, cx + rr * 0.12, cy + rr * 4.4], fill=c(155))
    d.ellipse([cx - rr * 1.5, cy + rr * 4.2, cx + rr * 1.5, cy + rr * 4.8], fill=c(155))
    for i in range(3):
        s = rr * (2.8 + i * 1.1)
        d.arc([cx - s, cy - s, cx + s, cy + s], 190, 260, fill=c(max(12, 55 - i * 14)),
              width=int(u * 0.01))


def m_note(d, w, h, c, r_):
    u = min(w, h)
    for dx, dy, s in ((-0.13, 0.06, 1.0), (0.14, -0.06, 0.82)):
        cx, cy = w * (0.46 + dx), h * (0.56 + dy)
        hr = u * 0.075 * s
        d.ellipse([cx - hr * 1.25, cy - hr * 0.9, cx + hr * 1.25, cy + hr * 0.9], fill=c(165))
        d.rectangle([cx + hr * 0.95, cy - hr * 5.4, cx + hr * 1.3, cy], fill=c(165))
    d.polygon([(w * 0.46 - 0.13 * w + u * 0.075 * 0.95, h * 0.62 - u * 0.405),
               (w * 0.46 + 0.14 * w + u * 0.062 * 1.3, h * 0.5 - u * 0.332),
               (w * 0.46 + 0.14 * w + u * 0.062 * 1.3, h * 0.5 - u * 0.27),
               (w * 0.46 - 0.13 * w + u * 0.075 * 0.95, h * 0.62 - u * 0.343)], fill=c(165))


def m_guitar(d, w, h, c, r_):
    cx, cy, u = w * 0.5, h * 0.58, min(w, h)
    lower, upper = u * 0.17, u * 0.13
    d.ellipse([cx - lower, cy - lower * 0.85, cx + lower, cy + lower * 1.05], fill=c(130))
    d.ellipse([cx - upper, cy - u * 0.2 - upper * 0.9, cx + upper, cy - u * 0.2 + upper * 0.9], fill=c(130))
    d.rounded_rectangle([cx - u * 0.028, cy - u * 0.54, cx + u * 0.028, cy - u * 0.2],
                        radius=u * 0.012, fill=c(95))
    d.rounded_rectangle([cx - u * 0.045, cy - u * 0.6, cx + u * 0.045, cy - u * 0.52],
                        radius=u * 0.015, fill=c(150))
    hr = u * 0.052
    d.ellipse([cx - hr, cy - u * 0.05 - hr, cx + hr, cy - u * 0.05 + hr], fill=(0, 0, 0, 205))
    for i in range(4):
        sx = cx + (i - 1.5) * u * 0.012
        d.line([sx, cy - u * 0.56, sx, cy + u * 0.14], fill=c(70), width=max(1, int(u * 0.004)))


MOTIFS = {n[2:]: f for n, f in list(globals().items()) if n.startswith("m_")}


# --------------------------------------------------------------------------- #
#  Compositor
# --------------------------------------------------------------------------- #
def render(path: str, size, tone: str, motif: str, kind: str) -> None:
    rnd = random.Random(path)  # seeded by filename -> stable across runs
    t = TONES[tone]
    w, h = size[0] * SS, size[1] * SS

    img = gradient((w, h), t["top"], t["bottom"], angle=rnd.choice([0, 12, -12]))
    glow(img, t["glow"], (rnd.uniform(0.38, 0.62), rnd.uniform(0.16, 0.4)), rnd.uniform(0.58, 0.8), 1.0)
    if kind == "dish":
        surface(img, rnd)
    bokeh(img, t["glow"], rnd,
          count=20 if kind == "scene" else 11,
          strength=0.7 if kind == "scene" else 0.42)

    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ink = t["ink"]
    MOTIFS[motif](ImageDraw.Draw(layer), w, h, lambda a: (ink[0], ink[1], ink[2], max(0, min(255, a))), rnd)
    layer = layer.filter(ImageFilter.GaussianBlur(max(w, h) * 0.0022))
    img = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")

    glow(img, t["glow"], (0.5, 0.94), 0.42, 0.4)
    vignette(img)
    img = grain(img.resize(size, Image.LANCZOS))

    dest = OUT / path
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=84, optimize=True, progressive=True)


HERO, WIDE, EVENT, DISH = (1920, 1080), (1600, 1000), (1200, 800), (900, 900)

# (path, size, tone, motif, kind) — motifs are chosen so nothing repeats on a page.
SPECS = [
    # --- hero + vibe (home page) ---
    ("hero-poster.jpg",  HERO, "night",   "stage",     "scene"),
    ("vibe-day.jpg",     WIDE, "foliage", "palms",     "scene"),
    ("vibe-night.jpg",   WIDE, "night",   "equalizer", "scene"),

    # --- events ---
    ("events/afrobeat-fridays.jpg",     EVENT, "night",      "disc",   "scene"),
    ("events/live-band-saturdays.jpg",  EVENT, "terracotta", "guitar", "scene"),
    ("events/sunday-chill.jpg",         EVENT, "foliage",    "sun",    "scene"),
    ("events/jazz-grill.jpg",           EVENT, "gold",       "note",   "scene"),
    ("events/open-mic.jpg",             EVENT, "terracotta", "mic",    "scene"),
    ("events/family-braai.jpg",         EVENT, "foliage",    "grill",  "scene"),
    ("events/amapiano-takeover.jpg",    EVENT, "night",      "stage",  "scene"),
    ("events/gelato-vinyl.jpg",         EVENT, "gold",       "cone",   "scene"),

    # --- menu: breakfast ---
    ("menu/full-breakfast.jpg", DISH, "ember",      "plate", "dish"),
    ("menu/sadza-eggs.jpg",     DISH, "gold",       "egg",   "dish"),
    ("menu/shakshuka.jpg",      DISH, "terracotta", "pan",   "dish"),
    ("menu/pancakes.jpg",       DISH, "cream",      "stack", "dish"),
    ("menu/benedict.jpg",       DISH, "charcoal",   "plate", "dish"),
    ("menu/green-bowl.jpg",     DISH, "foliage",    "bowl",  "dish"),

    # --- menu: braai & mains ---
    ("menu/braai-platter.jpg", DISH, "ember",      "grill",  "dish"),
    ("menu/peri-chicken.jpg",  DISH, "terracotta", "flame",  "dish"),
    ("menu/short-rib.jpg",     DISH, "ember",      "smoke",  "dish"),
    ("menu/bream.jpg",         DISH, "charcoal",   "fish",   "dish"),
    ("menu/boerewors.jpg",     DISH, "terracotta", "coil",   "dish"),
    ("menu/cauliflower.jpg",   DISH, "foliage",    "leaf",   "dish"),
    ("menu/burger.jpg",        DISH, "gold",       "burger", "dish"),
    ("menu/lamb-chops.jpg",    DISH, "ember",      "chop",   "dish"),

    # --- menu: gelato ---
    ("menu/baobab-gelato.jpg",    DISH, "gold",     "cone",  "dish"),
    ("menu/macadamia-gelato.jpg", DISH, "cream",    "tub",   "dish"),
    ("menu/cocoa-gelato.jpg",     DISH, "charcoal", "swirl", "dish"),
    ("menu/mazoe-sorbet.jpg",     DISH, "ember",    "scoops", "dish"),
    ("menu/affogato.jpg",         DISH, "night",    "sundae", "dish"),
    ("menu/coconut-gelato.jpg",   DISH, "foliage",  "cone",   "dish"),

    # --- menu: drinks ---
    ("menu/sundowner.jpg",      DISH, "ember",      "glass",     "dish"),
    ("menu/old-fashioned.jpg",  DISH, "gold",       "tumbler",   "dish"),
    ("menu/spritz.jpg",         DISH, "terracotta", "wineglass", "dish"),
    ("menu/espresso.jpg",       DISH, "charcoal",   "cup",       "dish"),
    ("menu/lager.jpg",          DISH, "gold",       "pint",      "dish"),
    ("menu/baobab-cooler.jpg",  DISH, "foliage",    "highball",  "dish"),
    ("menu/bottle-service.jpg", DISH, "night",      "bottle",    "dish"),
]


if __name__ == "__main__":
    for spec in SPECS:
        render(*spec)
        print(f"  ✓ {spec[0]}")
    print(f"\n{len(SPECS)} placeholders written to {OUT}")
