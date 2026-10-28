#!/usr/bin/env python3
"""Generates the Synerge Health Visual Identity Guidelines & Mockup Deck PDF.

Presentation-Grade 16:9 Widescreen (1920 × 1080 px).
Calibrated with high-impact, presentation-scale typography (14px to 135px)
so all elements and text are immediately visible and legible in any standard
PDF viewer without requiring manual zooming.
"""
import base64
import os
import subprocess
from pathlib import Path

ROOT = Path("/Users/osadose/Documents/Synerge Health")
BRAND = ROOT / "brand"
EXPORTS = BRAND / "exports"
DECK_ASSETS = BRAND / "deck_assets"
PUBLIC_BRAND = ROOT / "public/brand"
PUBLIC = ROOT / "public"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

def to_base64(path: Path, mime: str = "image/jpeg") -> str:
    if not path.exists():
        return ""
    data = path.read_bytes()
    b64 = base64.b64encode(data).decode("ascii")
    return f"data:{mime};base64,{b64}"

def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")

def main():
    EXPORTS.mkdir(parents=True, exist_ok=True)
    
    font_path = ROOT / "public/fonts/space-grotesk-latin.woff2"
    font_b64 = base64.b64encode(font_path.read_bytes()).decode("ascii")
    
    img_stationery = to_base64(DECK_ASSETS / "mockup-stationery.jpg", "image/jpeg")
    img_letterhead = to_base64(DECK_ASSETS / "mockup-letterhead.jpg", "image/jpeg")
    img_dossier = to_base64(DECK_ASSETS / "mockup-dossier.jpg", "image/jpeg")
    img_devices = to_base64(DECK_ASSETS / "mockup-devices.jpg", "image/jpeg")
    img_expo = to_base64(DECK_ASSETS / "mockup-expo.jpg", "image/jpeg")
    img_office = to_base64(DECK_ASSETS / "mockup-office.jpg", "image/jpeg")
    img_merch = to_base64(DECK_ASSETS / "mockup-merch.jpg", "image/jpeg")
    
    svg_primary = read_text(PUBLIC_BRAND / "logo-primary.svg")
    svg_primary_on_light = read_text(PUBLIC_BRAND / "logo-primary-on-light.svg")
    svg_mono_black = read_text(PUBLIC_BRAND / "logo-mono-black.svg")
    svg_icon_gradient = read_text(PUBLIC_BRAND / "logo-icon-gradient.svg")
    svg_icon_on_light = read_text(PUBLIC_BRAND / "logo-icon-on-light.svg")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Synerge Health · Visual Identity Guidelines</title>
<style>
@font-face {{
  font-family: 'Space Grotesk';
  src: url('data:font/woff2;base64,{font_b64}') format('woff2');
  font-weight: 300 700;
  font-style: normal;
}}

:root {{
  --void: #060B09;
  --dark-navy: #0A1411;
  --teal: #2BE0B0;
  --teal-deep: #12664D;
  --gold: #E3A83B;
  --sky: #3FA9E0;
  --soft-gray: #F8FAFC;
  --border-light: #E2E8F0;
  --text-dark: #0D1815;
  --text-muted: #64748B;
}}

* {{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}}

body {{
  background-color: #E2E8F0;
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-dark);
  -webkit-font-smoothing: antialiased;
}}

@page {{
  size: 1920px 1080px;
  margin: 0;
}}

@media print {{
  html, body {{
    width: 1920px;
    height: 1080px;
    background: #FFF;
  }}
  .slide {{
    page-break-after: always;
    page-break-inside: avoid;
    break-after: page;
  }}
}}

.slide {{
  position: relative;
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  background-color: #FFFFFF;
}}

/* Universal Running Footer */
.deck-running-footer {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E2E8F0;
  padding: 14px 70px;
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: #94A3B8;
  text-transform: uppercase;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: inherit;
  z-index: 10;
}}

/* =========================================================
   PAGE 1: MINIMALIST MASTER WORDMARK (PURE CONFIDENCE)
   ========================================================= */
.slide-1 {{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
}}

.p1-center {{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto 0;
}}

.p1-wordmark {{
  font-size: 135px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text-dark);
  display: flex;
  gap: 0.25em;
  align-items: baseline;
  justify-content: center;
  line-height: 1;
}}

.p1-wordmark span.teal {{
  color: var(--teal-deep);
}}

.p1-tagline {{
  font-family: monospace;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.22em;
  color: #64748B;
  text-transform: uppercase;
  margin-top: 36px;
}}

/* =========================================================
   PAGE 2: DUAL CONTRAST SPLIT
   ========================================================= */
.slide-2 {{
  display: flex;
  flex-direction: column;
}}

.p2-top {{
  height: 50%;
  background-color: var(--void);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid rgba(43, 224, 176, 0.15);
}}

.p2-wordmark-dark {{
  font-size: 120px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #FFFFFF;
  display: flex;
  gap: 0.25em;
  align-items: baseline;
  justify-content: center;
  line-height: 1;
}}

.p2-wordmark-dark span.teal {{
  color: var(--teal);
}}

.p2-subtag-dark {{
  font-family: monospace;
  font-size: 16px;
  letter-spacing: 0.2em;
  color: var(--gold);
  text-transform: uppercase;
  margin-top: 24px;
}}

.p2-bottom {{
  height: 50%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
}}

.p2-bottom svg {{
  width: 920px;
  height: auto;
}}

/* =========================================================
   PAGE 3: BRAND LOGO REPRESENTATION (FLUENCIT MINIMALIST SCALE)
   ========================================================= */
.slide-3 {{
  padding: 44px 70px 60px 70px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}}

.p3-header {{
  border-bottom: 3px solid #000000;
  padding-bottom: 12px;
}}

.p3-main-title {{
  font-size: 50px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #000000;
  line-height: 1.1;
}}

.p3-sub-title {{
  font-size: 22px;
  font-weight: 500;
  color: #334155;
  margin-top: 6px;
}}

.p3-sub-title span.brand {{
  font-weight: 700;
  color: #000000;
}}

.p3-section-title {{
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 12px;
}}

/* Top Grid: Primary Logos + The Icon */
.p3-grid-top {{
  display: grid;
  grid-template-columns: 2.1fr 1fr;
  gap: 60px;
  align-items: flex-start;
  margin-top: 18px;
}}

.p3-logos-row {{
  display: grid;
  grid-template-columns: 1fr 1.3fr 1.1fr;
  gap: 28px;
  align-items: center;
  margin-top: 8px;
}}

.p3-logo-item-label {{
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #64748B;
  text-transform: uppercase;
  margin-bottom: 10px;
}}

.p3-wordmark-small {{
  font-size: 38px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text-dark);
  line-height: 1.1;
}}

.p3-wordmark-small span.teal {{
  color: var(--teal-deep);
}}

.p3-logomark-wrap svg {{
  width: 100%;
  max-width: 440px;
  height: auto;
}}

.p3-caption {{
  font-size: 15px;
  color: #64748B;
  margin-top: 14px;
}}

.p3-icon-box {{
  border-left: 2px solid #E2E8F0;
  padding-left: 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}}

.p3-squircles-row {{
  display: flex;
  gap: 24px;
  margin: 8px 0 14px 0;
}}

.p3-brandmark-tile {{
  width: 125px;
  height: 125px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}}

.p3-brandmark-tile.dark {{
  background: var(--void);
}}

.p3-brandmark-tile.light {{
  background: #FFFFFF;
  border: 2px solid #CBD5E1;
}}

.p3-brandmark-tile svg {{
  width: 82px;
  height: 82px;
}}

.p3-brandmark-desc {{
  font-size: 15px;
  line-height: 1.48;
  color: #475569;
  max-width: 320px;
}}

.p3-brandmark-desc strong {{
  color: #000000;
  font-weight: 700;
}}

/* Middle Section: Color Palette & Blends */
.p3-middle-section {{
  border-top: 2px solid #000000;
  padding-top: 18px;
  margin-top: 18px;
}}

.p3-colors-grid {{
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 60px;
  align-items: center;
}}

.p3-swatches-row {{
  display: flex;
  gap: 36px;
  margin-top: 8px;
}}

.p3-swatch-item {{
  display: flex;
  flex-direction: column;
  align-items: center;
}}

.p3-swatch-circle {{
  width: 82px;
  height: 82px;
  border-radius: 50%;
  margin-bottom: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}}

.p3-swatch-circle.c-teal {{ background-color: #2BE0B0; }}
.p3-swatch-circle.c-navy {{ background-color: #060B09; }}
.p3-swatch-circle.c-slate {{ background-color: #12664D; }}
.p3-swatch-circle.c-gray {{ background-color: #FFFFFF; border: 2px solid #CBD5E1; }}

.p3-swatch-name {{
  font-size: 13px;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}}

.p3-swatch-hex {{
  font-family: monospace;
  font-size: 15px;
  font-weight: 700;
  color: #334155;
  margin-top: 2px;
}}

.p3-swatch-rgb {{
  font-family: monospace;
  font-size: 11.5px;
  font-weight: 500;
  color: #64748B;
  margin-top: 2px;
}}

.p3-gradient-box {{
  display: flex;
  flex-direction: column;
  gap: 8px;
}}

.p3-gradient-title {{
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #000000;
  text-transform: uppercase;
}}

.p3-gradient-bar {{
  width: 100%;
  height: 54px;
  border-radius: 27px;
  background: linear-gradient(90deg, #12664D 0%, #2BE0B0 50%, #A9E4F5 100%);
  box-shadow: 0 4px 16px rgba(43, 224, 176, 0.25);
}}

/* Bottom Section: Logo Usage & Exclusion Zone */
.p3-bottom-section {{
  border-top: 2px solid #000000;
  padding-top: 18px;
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}}

.p3-usage-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 8px;
}}

.p3-usage-card {{
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}}

.p3-usage-card.light {{ background-color: #FFFFFF; }}
.p3-usage-card.dark {{ background-color: #060B09; }}

.p3-usage-card svg {{
  width: 75%;
  height: auto;
}}

.p3-badge {{
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 18px;
  font-weight: 700;
}}
.p3-badge.correct {{ color: #10B981; }}
.p3-badge.wrong {{ color: #EF4444; }}

.p3-usage-label {{
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  margin-top: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}}
.p3-usage-label.correct {{ color: #000000; }}
.p3-usage-label.wrong {{ color: #DC2626; }}

.p3-exclusion-box {{
  border-left: 2px solid #E2E8F0;
  padding-left: 48px;
}}

.p3-exclusion-content {{
  display: flex;
  gap: 36px;
  align-items: center;
  margin-top: 12px;
}}

.p3-clearspace-diagram {{
  position: relative;
  background: #F8FAFC;
  border: 2px dashed #0284C7;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}}

.p3-clearspace-diagram svg {{
  width: 250px;
  height: auto;
}}

.p3-cs-label {{
  position: absolute;
  font-size: 11px;
  font-weight: 700;
  color: #0284C7;
}}

.p3-cs-top {{ top: 2px; left: 50%; transform: translateX(-50%); }}
.p3-cs-bottom {{ bottom: 2px; left: 50%; transform: translateX(-50%); }}

.p3-size-specs {{
  font-size: 15px;
  line-height: 1.55;
  color: #334155;
}}

.p3-size-specs strong {{
  color: #000000;
  display: block;
  font-size: 16px;
  margin-bottom: 4px;
}}

/* =========================================================
   PAGE 4: 100% UNIQUE 4-QUADRANT EXECUTIVE COLLATERAL
   ========================================================= */
.slide-4 {{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #FFFFFF;
  padding: 24px 36px 60px 36px;
}}

.p4-gallery-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 18px;
  flex: 1;
}}

.p4-quadrant {{
  position: relative;
  overflow: hidden;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FAFAFA;
  padding: 10px;
}}

.p4-quadrant img {{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}}

/* =========================================================
   PAGE 5: 6-TILE 360° BRAND ACTIVATION (FLUENCIT HIGH-SCALE)
   ========================================================= */
.slide-5 {{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #FFFFFF;
  padding: 24px 36px 60px 36px;
}}

.p5-tiles-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 18px;
  flex: 1;
}}

.p5-tile {{
  position: relative;
  overflow: hidden;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 22px 26px;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
}}

.p5-tile-title {{
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 14px;
}}

.p5-tile-photo {{
  flex: 1;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F8FAFC;
}}

.p5-tile-photo img {{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}}

/* Tile 1: Color Palette & Blends */
.p5-palette-demo {{
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  justify-content: center;
}}

.p5-color-pill {{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.05em;
}}

.p5-color-pill.void {{ background: #060B09; color: #FFFFFF; }}
.p5-color-pill.teal {{ background: #2BE0B0; color: #060B09; }}
.p5-color-pill.deep {{ background: #12664D; color: #FFFFFF; }}
.p5-color-pill.gold {{ background: #E3A83B; color: #060B09; }}

.p5-blend-pill {{
  height: 38px;
  border-radius: 19px;
  background: linear-gradient(90deg, #12664D 0%, #2BE0B0 50%, #3FA9E0 100%);
  margin-top: 4px;
}}

/* Tile 3: Social Media & Graphics */
.p5-social-demo {{
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  justify-content: center;
}}

.p5-social-card {{
  background: #060B09;
  border-radius: 12px;
  padding: 20px;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}}

.p5-social-header {{
  display: flex;
  align-items: center;
  gap: 12px;
}}

.p5-social-header-avatar {{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #0D1815;
  border: 1px solid #2BE0B0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}}

.p5-social-header-avatar svg {{
  width: 24px !important;
  height: 24px !important;
}}

.p5-social-name {{
  font-size: 16px;
  font-weight: 700;
  color: #FFFFFF;
}}

.p5-social-handle {{
  font-size: 12px;
  color: #2BE0B0;
  font-family: monospace;
}}

.p5-social-visual {{
  height: 110px;
  background: linear-gradient(135deg, #0A1411 0%, #060B09 100%);
  border: 1px solid rgba(43,224,176,0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}}

.p5-social-visual svg {{
  width: 60px;
  height: 60px;
  filter: drop-shadow(0 0 15px rgba(43, 224, 176, 0.4));
}}

.p5-social-banner {{
  height: 48px;
  background: linear-gradient(90deg, #060B09 0%, #0D1815 100%);
  border: 1px solid rgba(43,224,176,0.25);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}}

.p5-social-banner-text {{
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #2BE0B0;
}}

/* Tile 6: Digital & UI Icons */
.p5-digital-demo {{
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
  justify-content: center;
}}

.p5-app-icons-row {{
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}}

.p5-app-icon-item {{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}}

.p5-icon-squircle {{
  width: 85px;
  height: 85px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
}}

.p5-icon-squircle.dark {{ background: #060B09; border: 1px solid rgba(43, 224, 176, 0.3); }}
.p5-icon-squircle.light {{ background: #FFFFFF; border: 2px solid #CBD5E1; }}

.p5-icon-squircle svg {{
  width: 55px;
  height: 55px;
}}

.p5-icon-sublabel {{
  font-family: monospace;
  font-size: 11px;
  font-weight: 700;
  color: #64748B;
  letter-spacing: 0.08em;
}}

.p5-browser-tab-demo {{
  background: #F1F5F9;
  border-radius: 8px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
}}

.p5-tab-pill {{
  background: #FFFFFF;
  border-radius: 6px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #0F172A;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  width: 100%;
}}

.p5-tab-pill svg {{
  width: 20px !important;
  height: 20px !important;
  flex-shrink: 0;
}}

.p5-splash-item {{
  background: #060B09;
  border-radius: 8px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #FFFFFF;
  font-family: monospace;
  font-size: 14px;
  letter-spacing: 0.1em;
}}

.p5-splash-item svg {{
  width: 24px !important;
  height: 24px !important;
}}
</style>
</head>
<body>

<!-- SLIDE 1: MINIMALIST MASTER WORDMARK (PURE CONFIDENCE) -->
<div class="slide slide-1">
  <div class="p1-center">
    <div class="p1-wordmark">
      <span>SYNERGE</span>
      <span class="teal">HEALTH</span>
    </div>
    <div class="p1-tagline">AFRICA'S HEALTHTECH VENTURE STUDIO</div>
  </div>
  <div class="deck-running-footer">
    <span>SYNERGE HEALTH · BRAND IDENTITY GUIDELINES</span>
    <span>CONFIDENTIAL · FOR INTERNAL & PARTNER USE ONLY</span>
    <span>PAGE 01 / 05</span>
  </div>
</div>

<!-- SLIDE 2: DUAL CONTRAST SPLIT -->
<div class="slide slide-2">
  <div class="p2-top">
    <div class="p2-wordmark-dark">
      <span>SYNERGE</span>
      <span class="teal">HEALTH</span>
    </div>
    <div class="p2-subtag-dark">VENTURE STUDIO · DARK ARCHITECTURE</div>
  </div>
  <div class="p2-bottom">
    {svg_primary_on_light}
  </div>
  <div class="deck-running-footer">
    <span>SYNERGE HEALTH · CONTRAST EXECUTION & ARCHITECTURE</span>
    <span>CONFIDENTIAL · FOR INTERNAL & PARTNER USE ONLY</span>
    <span>PAGE 02 / 05</span>
  </div>
</div>

<!-- SLIDE 3: BRAND LOGO REPRESENTATION -->
<div class="slide slide-3">
  <div>
    <div class="p3-header">
      <h1 class="p3-main-title">BRAND LOGO REPRESENTATION</h1>
      <div class="p3-sub-title"><span class="brand">SYNERGE HEALTH</span> | Visual Identity Guidelines</div>
    </div>

    <!-- Top Grid: Primary Logos + The Icon -->
    <div class="p3-grid-top">
      <div>
        <div class="p3-section-title">The Primary Logos</div>
        <div class="p3-logos-row">
          <div>
            <div class="p3-logo-item-label">PRIMARY WORDMARK</div>
            <div class="p3-wordmark-small">
              SYNERGE <span class="teal">HEALTH</span>
            </div>
          </div>
          <div>
            <div class="p3-logo-item-label">PRIMARY LOGOMARK</div>
            <div class="p3-logomark-wrap">
              {svg_primary_on_light}
            </div>
          </div>
          <div>
            <div class="p3-logo-item-label">1-COLOR MONOCHROME</div>
            <div class="p3-logomark-wrap" style="max-width: 260px;">
              {svg_mono_black}
            </div>
          </div>
        </div>
        <div class="p3-caption">For general brand recognition, digital platforms, and corporate applications.</div>
      </div>

      <div class="p3-icon-box">
        <div class="p3-section-title">The Icon / Logomark</div>
        <div class="p3-squircles-row">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
            <div class="p3-brandmark-tile dark">
              {svg_icon_gradient}
            </div>
            <span style="font-family: monospace; font-size: 11px; font-weight: 700; color: #64748B;">DARK ICON</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
            <div class="p3-brandmark-tile light">
              {svg_icon_on_light}
            </div>
            <span style="font-family: monospace; font-size: 11px; font-weight: 700; color: #64748B;">LIGHT ICON</span>
          </div>
        </div>
        <div class="p3-brandmark-desc">
          <strong>THE BRANDMARK / ICON.</strong><br>
          Used for app icons, favicons, social avatars, and compact spaces.
        </div>
      </div>
    </div>

    <!-- Middle Section: Color Palette & Blends -->
    <div class="p3-middle-section">
      <div class="p3-colors-grid">
        <div>
          <div class="p3-section-title">Color Palette &amp; Blends</div>
          <div class="p3-swatches-row">
            <div class="p3-swatch-item">
              <div class="p3-swatch-circle c-teal"></div>
              <span class="p3-swatch-name">MINT TEAL</span>
              <span class="p3-swatch-hex">#2BE0B0</span>
              <span class="p3-swatch-rgb">RGB 43, 224, 176</span>
            </div>
            <div class="p3-swatch-item">
              <div class="p3-swatch-circle c-navy"></div>
              <span class="p3-swatch-name">VOID DARK</span>
              <span class="p3-swatch-hex">#060B09</span>
              <span class="p3-swatch-rgb">RGB 6, 11, 9</span>
            </div>
            <div class="p3-swatch-item">
              <div class="p3-swatch-circle c-slate"></div>
              <span class="p3-swatch-name">DEEP TEAL</span>
              <span class="p3-swatch-hex">#12664D</span>
              <span class="p3-swatch-rgb">RGB 18, 102, 77</span>
            </div>
            <div class="p3-swatch-item">
              <div class="p3-swatch-circle c-gray"></div>
              <span class="p3-swatch-name">PURE WHITE</span>
              <span class="p3-swatch-hex">#FFFFFF</span>
              <span class="p3-swatch-rgb">RGB 255, 255, 255</span>
            </div>
          </div>
        </div>
        <div class="p3-gradient-box">
          <div class="p3-gradient-title">Gradient &amp; Color Blends</div>
          <div class="p3-gradient-bar"></div>
        </div>
      </div>
    </div>

    <!-- Bottom Section: Logo Usage & Exclusion Zone -->
    <div class="p3-bottom-section">
      <div>
        <div class="p3-section-title">Logo Usage (Do's &amp; Don'ts)</div>
        <div class="p3-usage-grid">
          <div>
            <div class="p3-usage-card light">
              <span class="p3-badge correct">✓</span>
              {svg_primary_on_light}
            </div>
            <div class="p3-usage-label correct">ON LIGHT BACKGROUND</div>
          </div>
          <div>
            <div class="p3-usage-card dark">
              <span class="p3-badge correct">✓</span>
              {svg_primary}
            </div>
            <div class="p3-usage-label correct">ON DARK BACKGROUND</div>
          </div>
          <div>
            <div class="p3-usage-card light">
              <span class="p3-badge wrong">✕</span>
              <div style="transform: scaleX(1.35) skewX(-10deg); display: flex; align-items: center; justify-content: center; width: 75%;">
                {svg_primary_on_light}
              </div>
            </div>
            <div class="p3-usage-label wrong">INCORRECT / DISTORTED</div>
          </div>
          <div>
            <div class="p3-usage-card light">
              <span class="p3-badge wrong">✕</span>
              <div style="filter: hue-rotate(140deg) saturate(3); display: flex; align-items: center; justify-content: center; width: 75%;">
                {svg_primary_on_light}
              </div>
            </div>
            <div class="p3-usage-label wrong">INCORRECT / UNAPPROVED COLOR</div>
          </div>
        </div>
      </div>

      <div class="p3-exclusion-box">
        <div class="p3-section-title">Exclusion Zone &amp; Minimum Size</div>
        <div class="p3-exclusion-content">
          <div class="p3-clearspace-diagram">
            <span class="p3-cs-label p3-cs-top">&frac14; X CLEAR SPACE</span>
            {svg_primary_on_light}
            <span class="p3-cs-label p3-cs-bottom">&frac14; X CLEAR SPACE</span>
          </div>
          <div class="p3-size-specs">
            <strong>EXCLUSION ZONE</strong>
            Keep clear space equal to &frac14; icon height around all perimeter edges.<br><br>
            <strong>MINIMUM SIZE</strong>
            Print: 32mm width &nbsp;|&nbsp; Digital: 120px width
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="deck-running-footer">
    <span>SYNERGE HEALTH · CORE BRAND IDENTITY STANDARDS</span>
    <span>CONFIDENTIAL · FOR INTERNAL & PARTNER USE ONLY</span>
    <span>PAGE 03 / 05</span>
  </div>
</div>

<!-- SLIDE 4: 100% UNIQUE 4-QUADRANT EXECUTIVE COLLATERAL -->
<div class="slide slide-4">
  <div class="p4-gallery-grid">
    <div class="p4-quadrant">
      <img src="{img_stationery}" alt="Executive Stationery & Business Cards">
    </div>
    <div class="p4-quadrant">
      <img src="{img_letterhead}" alt="Corporate Letterhead & Envelopes">
    </div>
    <div class="p4-quadrant">
      <img src="{img_dossier}" alt="Founder Onboarding Dossier Box">
    </div>
    <div class="p4-quadrant">
      <img src="{img_devices}" alt="Apple Hardware Display">
    </div>
  </div>
  <div class="deck-running-footer">
    <span>SYNERGE HEALTH · EXECUTIVE COLLATERAL & HARDWARE SUITE</span>
    <span>CONFIDENTIAL · FOR INTERNAL & PARTNER USE ONLY</span>
    <span>PAGE 04 / 05</span>
  </div>
</div>

<!-- SLIDE 5: 6-TILE 360° BRAND ACTIVATION (FLUENCIT HIGH-SCALE) -->
<div class="slide slide-5">
  <div class="p5-tiles-grid">
    <!-- Tile 1: Color Palette & Blends -->
    <div class="p5-tile">
      <div class="p5-tile-title">Color Palette &amp; Blends</div>
      <div class="p5-palette-demo">
        <div class="p5-color-pill void">
          <span>Void Dark</span>
          <span style="font-family: monospace;">#060B09</span>
        </div>
        <div class="p5-color-pill teal">
          <span>Mint Teal</span>
          <span style="font-family: monospace;">#2BE0B0</span>
        </div>
        <div class="p5-color-pill deep">
          <span>Deep Teal</span>
          <span style="font-family: monospace;">#12664D</span>
        </div>
        <div class="p5-color-pill gold">
          <span>Clinical Gold</span>
          <span style="font-family: monospace;">#E3A83B</span>
        </div>
        <div class="p5-blend-pill"></div>
      </div>
    </div>

    <!-- Tile 2: Branded Apparel -->
    <div class="p5-tile">
      <div class="p5-tile-title">Branded Apparel</div>
      <div class="p5-tile-photo">
        <img src="{img_merch}" alt="Synerge Technical Merch">
      </div>
    </div>

    <!-- Tile 3: Social Media & Graphics -->
    <div class="p5-tile">
      <div class="p5-tile-title">Social Media &amp; Graphics</div>
      <div class="p5-social-demo">
        <div class="p5-social-card">
          <div class="p5-social-header">
            <div class="p5-social-header-avatar">
              {svg_icon_gradient}
            </div>
            <div>
              <div class="p5-social-name">Synerge Health</div>
              <div class="p5-social-handle">@synergehealth · Official</div>
            </div>
          </div>
          <div class="p5-social-visual">
            {svg_icon_gradient}
          </div>
        </div>
        <div class="p5-social-banner">
          <span class="p5-social-banner-text">AFRICA'S HEALTHTECH STUDIO</span>
          <span style="font-family: monospace; font-size: 12px; color: #94A3B8;">SYNERGEHEALTH.COM</span>
        </div>
      </div>
    </div>

    <!-- Tile 4: Event & Exhibition Gear -->
    <div class="p5-tile">
      <div class="p5-tile-title">Event &amp; Exhibition Gear</div>
      <div class="p5-tile-photo">
        <img src="{img_expo}" alt="Summit Exhibition Setup">
      </div>
    </div>

    <!-- Tile 5: Office & Environmental Branding -->
    <div class="p5-tile">
      <div class="p5-tile-title">Office &amp; Environmental</div>
      <div class="p5-tile-photo">
        <img src="{img_office}" alt="Headquarters 3D Reception Signage">
      </div>
    </div>

    <!-- Tile 6: Digital & UI Icons -->
    <div class="p5-tile">
      <div class="p5-tile-title">Digital &amp; UI Icons</div>
      <div class="p5-digital-demo">
        <div class="p5-app-icons-row">
          <div class="p5-app-icon-item">
            <div class="p5-icon-squircle dark">
              {svg_icon_gradient}
            </div>
            <span class="p5-icon-sublabel">DARK APP ICON</span>
          </div>
          <div class="p5-app-icon-item">
            <div class="p5-icon-squircle light">
              {svg_icon_on_light}
            </div>
            <span class="p5-icon-sublabel">LIGHT APP ICON</span>
          </div>
        </div>

        <div class="p5-browser-tab-demo">
          <div class="p5-tab-pill">
            <div style="width: 20px; height: 20px; display: flex; align-items: center;">{svg_icon_gradient}</div>
            <span>Synerge Health · Venture Studio</span>
            <span style="margin-left: auto; color: #64748B; font-size: 12px;">✕</span>
          </div>
        </div>

        <div class="p5-splash-item">
          <div style="width: 24px; height: 24px; display: flex; align-items: center;">{svg_icon_gradient}</div>
          <span>Loading Studio OS...</span>
        </div>
      </div>
    </div>
  </div>

  <div class="deck-running-footer">
    <span>SYNERGE HEALTH · 360° BRAND ACTIVATION & ENVIRONMENT</span>
    <span>CONFIDENTIAL · FOR INTERNAL & PARTNER USE ONLY</span>
    <span>PAGE 05 / 05</span>
  </div>
</div>

</body>
</html>
"""

    html_file = EXPORTS / "brand_guidelines_deck.html"
    pdf_file = EXPORTS / "synerge_health_brand_guidelines.pdf"
    
    html_file.write_text(html_content, encoding="utf-8")
    print(f"Written HTML deck to: {html_file}")
    
    # Run Google Chrome Headless to compile PDF
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--run-all-compositor-stages-before-draw",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_file}",
        f"file://{html_file}"
    ]
    
    print("Compiling high-resolution PDF with Google Chrome headless...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        print(f"Successfully generated PDF at: {pdf_file}")
        print(f"PDF size: {pdf_file.stat().st_size} bytes")
        
        # Mirror to public folder
        (PUBLIC / "synerge_health_brand_guidelines.pdf").write_bytes(pdf_file.read_bytes())
        (PUBLIC / "brand_guidelines_deck.html").write_bytes(html_file.read_bytes())
        print("Mirrored to public/ directory.")
    else:
        print("Error compiling PDF:")
        print(result.stderr)

if __name__ == "__main__":
    main()
