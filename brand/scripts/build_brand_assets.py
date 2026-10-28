#!/usr/bin/env python3
"""Builds the Synerge Health logo suite, app icons, Open Graph image and social templates.

Setup (from the repository root):
    python3 -m venv .venv && .venv/bin/pip install fonttools brotli pillow
Run:
    .venv/bin/python brand/scripts/build_brand_assets.py

Wordmark text is converted to outlines from the self-hosted Space Grotesk font, so the
logo files render identically everywhere without font dependencies. PNG exports are
rendered with Google Chrome (macOS path below).
"""
import subprocess
import tempfile
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
FONT = ROOT / "public/fonts/space-grotesk-latin.woff2"
PUBLIC = ROOT / "public"
BRAND_PUBLIC = PUBLIC / "brand"
TEMPLATES = ROOT / "brand/templates"
EXPORTS = ROOT / "brand/exports"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

VOID, PANEL, TEAL = "#060B09", "#0D1815", "#2BE0B0"
INK, MUTED, DIM = "#F8FAFC", "#C2D1CB", "#8FA39A"

DARK = dict(orbits=["#5FF5CC", "#7FCBF2", "#F2C877", "#A9E4F5"], core=TEAL, text=INK, accent=TEAL)
LIGHT = dict(orbits=["#1A9972", "#2B7DAA", "#C98A1F", "#4A9DBF"], core="#12664D", text=PANEL, accent="#12664D")
MONO_WHITE = dict(orbits=["#FFFFFF"] * 4, core="#FFFFFF", text="#FFFFFF", accent="#FFFFFF")
MONO_BLACK = dict(orbits=[VOID] * 4, core=VOID, text=VOID, accent=VOID)

ANGLES = [15, 60, 105, 150]
HALF = 76  # half the drawn extent of the mark in its 200-unit coordinate space
TRACKING = 0.05


def num(value):
    return f"{value:.2f}".rstrip("0").rstrip(".")


class Face:
    def __init__(self, weight):
        font = TTFont(FONT)
        instancer.instantiateVariableFont(font, {"wght": weight}, inplace=True)
        self.glyphs = font.getGlyphSet()
        self.cmap = font.getBestCmap()
        self.upm = font["head"].unitsPerEm

    def outline(self, text, size, x, y):
        """Returns (path data, advance including trailing tracking) for text on baseline y."""
        scale = size / self.upm
        cursor, parts = 0.0, []
        for char in text:
            glyph = self.glyphs[self.cmap[ord(char)]]
            pen = SVGPathPen(self.glyphs, ntos=num)
            glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, x + cursor, y)))
            command = pen.getCommands()
            if command:
                parts.append(command)
            cursor += glyph.width * scale + TRACKING * size
        return " ".join(parts), cursor


BOLD = Face(700)


def wordmark(size, x, baseline, palette):
    first, advance = BOLD.outline("SYNERGE ", size, x, baseline)
    second, advance_second = BOLD.outline("HEALTH", size, x + advance, baseline)
    visible = advance + advance_second - TRACKING * size
    markup = (
        f'<path d="{first}" fill="{palette["text"]}"/>'
        f'<path d="{second}" fill="{palette["accent"]}"/>'
    )
    return markup, visible


def wordmark_width(size):
    return wordmark(size, 0, 0, DARK)[1]


def gradient_defs(uid):
    colours = [("#5FF5CC", "#12664D"), ("#7FCBF2", "#1B5C7A"), ("#F2C877", "#8A5A16"), ("#A9E4F5", "#2E6E86")]
    stops = "".join(
        f'<linearGradient id="{uid}-r{i + 1}" x1="0" y1="0" x2="1" y2="1">'
        f'<stop offset="0%" stop-color="{a}"/><stop offset="100%" stop-color="{b}"/></linearGradient>'
        for i, (a, b) in enumerate(colours)
    )
    core = (
        f'<radialGradient id="{uid}-core"><stop offset="0%" stop-color="#FFFFFF"/>'
        f'<stop offset="50%" stop-color="{TEAL}"/><stop offset="100%" stop-color="#0E4B43"/></radialGradient>'
    )
    return stops + core


def mark(cx, cy, scale, palette=None, gradient=None, stroke=9, core_radius=11):
    """Orbit mark centred on (cx, cy). Pass a gradient uid to use the gradient rendering."""
    if gradient:
        strokes = [f"url(#{gradient}-r{i + 1})" for i in range(4)]
        core = f"url(#{gradient}-core)"
    else:
        strokes, core = palette["orbits"], palette["core"]
    ellipses = "".join(
        f'<ellipse rx="72" ry="40" transform="rotate({angle})" stroke="{colour}" stroke-width="{stroke}"/>'
        for angle, colour in zip(ANGLES, strokes)
    )
    return (
        f'<g transform="translate({num(cx)},{num(cy)}) scale({num(scale)})" fill="none" stroke-linecap="round">'
        f'{ellipses}<circle r="{core_radius}" fill="{core}" stroke="none"/></g>'
    )


def svg_doc(width, height, body, defs="", title=None, pixel_size=None):
    px_w, px_h = pixel_size or (round(width), round(height))
    heading = f"<title>{title}</title>" if title else ""
    defs_markup = f"<defs>{defs}</defs>" if defs else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{px_w}" height="{px_h}" '
        f'viewBox="0 0 {num(width)} {num(height)}" fill="none">{heading}{defs_markup}{body}</svg>\n'
    )


def horizontal_lockup(palette, size=98, gap=46):
    cap = size * 0.7
    x0 = 2 * HALF + gap
    text, text_width = wordmark(size, x0, HALF + cap / 2, palette)
    width = x0 + text_width
    return width, 2 * HALF, mark(HALF, HALF, 1, palette) + text


def stacked_lockup(palette, size=72, gap=40):
    text_width = wordmark_width(size)
    width = max(text_width, 2 * HALF)
    cap = size * 0.7
    baseline = 2 * HALF + gap + cap
    text, _ = wordmark(size, (width - text_width) / 2, baseline, palette)
    return width, baseline, mark(width / 2, HALF, 1, palette) + text


def backdrop(width, height, glow_x, glow_y, glow_r):
    return (
        '<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">'
        f'<stop offset="0" stop-color="{PANEL}"/><stop offset="1" stop-color="{VOID}"/></linearGradient>'
        '<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">'
        f'<path d="M48 0H0V48" fill="none" stroke="{TEAL}" stroke-opacity=".08" stroke-width="1"/></pattern>'
        f'<radialGradient id="glow"><stop offset="0" stop-color="{TEAL}" stop-opacity=".16"/>'
        f'<stop offset="1" stop-color="{TEAL}" stop-opacity="0"/></radialGradient></defs>'
        f'<rect width="{width}" height="{height}" fill="url(#bg)"/>'
        f'<rect width="{width}" height="{height}" fill="url(#grid)"/>'
        f'<circle cx="{glow_x}" cy="{glow_y}" r="{glow_r}" fill="url(#glow)"/>'
    )


def write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)


def render(svg, width, height, out, transparent=False):
    with tempfile.TemporaryDirectory() as tmp:
        folder = Path(tmp)
        (folder / "a.svg").write_text(svg)
        background = "transparent" if transparent else VOID
        (folder / "a.html").write_text(
            f'<!doctype html><meta charset="utf-8"><style>html,body{{margin:0;background:{background}}}'
            f'img{{display:block}}</style><img src="a.svg" width="{width}" height="{height}">'
        )
        shot = folder / "shot.png"
        subprocess.run(
            [
                CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                "--default-background-color=00000000", "--force-device-scale-factor=1",
                f"--window-size={max(width, 800)},{max(height, 800)}",
                f"--screenshot={shot}", f"file://{folder / 'a.html'}",
            ],
            check=True, capture_output=True,
        )
        image = Image.open(shot).convert("RGBA").crop((0, 0, width, height))
    out.parent.mkdir(parents=True, exist_ok=True)
    if out.suffix == ".jpg":
        image.convert("RGB").save(out, quality=90, optimize=True)
    else:
        image.save(out, optimize=True)


def build_logo_suite():
    variants = {
        "logo-primary": (horizontal_lockup, DARK, "Synerge Health logo"),
        "logo-primary-on-light": (horizontal_lockup, LIGHT, "Synerge Health logo for light backgrounds"),
        "logo-mono-white": (horizontal_lockup, MONO_WHITE, "Synerge Health logo, white"),
        "logo-mono-black": (horizontal_lockup, MONO_BLACK, "Synerge Health logo, black"),
        "logo-stacked": (stacked_lockup, DARK, "Synerge Health stacked logo"),
        "logo-stacked-on-light": (stacked_lockup, LIGHT, "Synerge Health stacked logo for light backgrounds"),
    }
    sizes = {}
    for name, (builder, palette, title) in variants.items():
        width, height, body = builder(palette)
        write(BRAND_PUBLIC / f"{name}.svg", svg_doc(width, height, body, title=title))
        sizes[name] = (width, height)

    icons = {
        "logo-icon": (DARK, None, "Synerge Health mark"),
        "logo-icon-on-light": (LIGHT, None, "Synerge Health mark for light backgrounds"),
        "logo-icon-mono-white": (MONO_WHITE, None, "Synerge Health mark, white"),
        "logo-icon-mono-black": (MONO_BLACK, None, "Synerge Health mark, black"),
        "logo-icon-gradient": (None, "sg", "Synerge Health mark, gradient"),
    }
    for name, (palette, gradient, title) in icons.items():
        body = mark(HALF, HALF, 1, palette, gradient=gradient, stroke=10 if gradient else 9)
        defs = gradient_defs(gradient) if gradient else ""
        write(BRAND_PUBLIC / f"{name}.svg", svg_doc(2 * HALF, 2 * HALF, body, defs, title))

    width, height, body = horizontal_lockup(DARK)
    pixel_height = 160
    pixel_width = round(width / height * pixel_height)
    render(svg_doc(width, height, body, pixel_size=(pixel_width, pixel_height)), pixel_width, pixel_height,
           BRAND_PUBLIC / "logo-primary.png", transparent=True)
    icon_svg = svg_doc(2 * HALF, 2 * HALF, mark(HALF, HALF, 1, DARK), pixel_size=(512, 512))
    render(icon_svg, 512, 512, BRAND_PUBLIC / "logo-icon.png", transparent=True)
    return sizes, (pixel_width, pixel_height)


def build_app_icons():
    for name, size in {"apple-touch-icon": 180, "icon-192": 192, "icon-512": 512}.items():
        body = (
            f'<rect width="{size}" height="{size}" fill="{VOID}"/>'
            + mark(size / 2, size / 2, size * 0.6 / (2 * HALF), DARK, stroke=11, core_radius=12)
        )
        render(svg_doc(size, size, body), size, size, PUBLIC / f"{name}.png")
    gradient = gradient_defs("sg")
    body = mark(16, 16, 31 / (2 * HALF), gradient="sg", stroke=12)
    render(svg_doc(32, 32, body, gradient), 32, 32, PUBLIC / "favicon-32.png", transparent=True)


def centred_lockup(cx, top, target_width, palette=DARK):
    width, height, body = horizontal_lockup(palette)
    scale = target_width / width
    group = f'<g transform="translate({num(cx - target_width / 2)},{num(top)}) scale({num(scale)})">{body}</g>'
    return group, height * scale


def banner(width, height, centre_x, lockup_width, tagline_size):
    lockup_height = 2 * HALF * lockup_width / horizontal_lockup(DARK)[0]
    block = lockup_height + 34 + tagline_size
    top = (height - block) / 2
    lockup, _ = centred_lockup(centre_x, top, lockup_width)
    tagline = (
        f'<text x="{num(centre_x)}" y="{num(top + lockup_height + 34 + tagline_size * 0.8)}" '
        f'text-anchor="middle" fill="{MUTED}" font-family="Arial, Helvetica, sans-serif" '
        f'font-size="{tagline_size}" letter-spacing="1">Africa\u2019s healthtech venture studio</text>'
    )
    return svg_doc(width, height, backdrop(width, height, width * 0.7, height * 0.2, height * 0.9) + lockup + tagline)


def open_graph():
    width, height = 1200, 630
    size = 64
    line_one, _ = BOLD.outline("Africa\u2019s healthtech", size, 88, 292)
    line_two, _ = BOLD.outline("venture studio.", size, 88, 292 + 80)
    lockup, _ = centred_lockup(88 + 200, 72, 400)
    text = 'font-family="Arial, Helvetica, sans-serif"'
    body = (
        backdrop(width, height, 1010, 200, 380)
        + lockup
        + mark(1000, 335, 2.4, DARK)
        + f'<path d="{line_one}" fill="{INK}"/><path d="{line_two}" fill="{TEAL}"/>'
        + f'<text x="88" y="466" fill="{MUTED}" {text} font-size="26">We work with founders to build healthcare</text>'
        + f'<text x="88" y="502" fill="{MUTED}" {text} font-size="26">ventures for African markets.</text>'
        + f'<text x="88" y="566" fill="{DIM}" {text} font-size="20" letter-spacing="3">SYNERGEHEALTH.COM</text>'
    )
    return svg_doc(width, height, body, title="Synerge Health \u2014 Africa\u2019s healthtech venture studio")


def build_templates():
    og = open_graph()
    write(PUBLIC / "og-image.svg", og)
    render(og, 1200, 630, PUBLIC / "og-image.jpg")

    linkedin = banner(1584, 396, 912, 640, 26)
    x_header = banner(1500, 500, 850, 700, 28)
    avatar = svg_doc(400, 400, f'<rect width="400" height="400" fill="{VOID}"/>' + mark(200, 200, 1.62, DARK))
    for name, svg, size in [
        ("linkedin-banner", linkedin, (1584, 396)),
        ("x-header", x_header, (1500, 500)),
        ("avatar", avatar, (400, 400)),
    ]:
        write(TEMPLATES / f"{name}.svg", svg)
        render(svg, *size, EXPORTS / f"{name}.png")
    print("headline width check:", round(BOLD.outline("Africa\u2019s healthtech", 64, 0, 0)[1]))


if __name__ == "__main__":
    logo_sizes, primary_png = build_logo_suite()
    build_app_icons()
    build_templates()
    print("logo viewBox sizes:", {k: (round(w), round(h)) for k, (w, h) in logo_sizes.items()})
    print("logo-primary.png:", primary_png)
