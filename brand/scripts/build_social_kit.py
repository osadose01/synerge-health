#!/usr/bin/env python3
"""Builds the Synerge Health Social Media Production Kit.

Generates:
1. LinkedIn Multi-Slide Swipable Carousel (1080 × 1350px / 4:5 portrait)
   -> 5-slide PDF document (for LinkedIn document posts)
   -> 5 individual high-res PNGs (for Instagram carousels & X/Twitter threads)
2. Founder & Venture Announcement Card (1080 × 1080px / 1:1 square PNG)
3. Clinical / Market Telemetry Stat Card (1080 × 1080px / 1:1 square PNG)
4. LinkedIn Company Page Banner (1584 × 396px PNG)
5. X / Twitter Profile Header Banner (1500 × 500px PNG)
6. Social Profile Avatars (400 × 400px Dark & Light PNGs)
"""
import base64
import os
import shutil
import subprocess
from pathlib import Path

ROOT = Path("/Users/osadose/Documents/Synerge Health")
BRAND = ROOT / "brand"
SOCIAL = BRAND / "social"
EXPORTS = SOCIAL / "exports"
PUBLIC_BRAND = ROOT / "public/brand"
PUBLIC_SOCIAL = ROOT / "public/social"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")

def main():
    SOCIAL.mkdir(parents=True, exist_ok=True)
    EXPORTS.mkdir(parents=True, exist_ok=True)
    PUBLIC_SOCIAL.mkdir(parents=True, exist_ok=True)

    font_path = ROOT / "public/fonts/space-grotesk-latin.woff2"
    font_b64 = base64.b64encode(font_path.read_bytes()).decode("ascii")

    svg_primary = read_text(PUBLIC_BRAND / "logo-primary.svg")
    svg_icon_gradient = read_text(PUBLIC_BRAND / "logo-icon-gradient.svg")
    svg_icon_mono_white = read_text(PUBLIC_BRAND / "logo-icon-mono-white.svg")

    # Common CSS variables & styling
    common_css = f"""
@font-face {{
  font-family: 'Space Grotesk';
  src: url('data:font/woff2;base64,{font_b64}') format('woff2');
  font-weight: 300 700;
}}
:root {{
  --void: #060B09;
  --panel: #0D1815;
  --panel-card: #0F1D1A;
  --teal: #2BE0B0;
  --teal-deep: #12664D;
  --teal-glow: rgba(43, 224, 176, 0.12);
  --gold: #E3A83B;
  --ink: #F8FAFC;
  --body: #C2D1CB;
  --muted: #8FA39A;
  --border: rgba(43, 224, 176, 0.18);
}}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{
  background: var(--void);
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  position: relative;
  overflow: hidden;
}}
.bg-grid {{
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(43, 224, 176, 0.08) 1px, transparent 0),
    linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 36px 36px, 144px 144px, 144px 144px;
  pointer-events: none;
}}
.glow-aura {{
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(80px);
}}
"""

    # =========================================================
    # SLIDE TEMPLATES (5-Slide Carousel)
    # =========================================================
    slides_data = [
        # Slide 1: Hook / Cover
        {
            "num": "01 / 05",
            "section": "VENTURE STUDIO PERSPECTIVE",
            "content": f"""
              <div class="pill">AFRICA HEALTHTECH THESIS</div>
              <h1 class="slide-title" style="font-size: 64px; line-height: 1.15; margin-bottom: 28px;">
                Why African Healthtech Must Start From <span style="color: var(--teal);">Clinical Reality</span>.
              </h1>
              <p class="slide-desc" style="font-size: 24px; line-height: 1.5; color: var(--body); max-width: 880px; margin-bottom: 40px;">
                Importing Silicon Valley SaaS models fails in frontier markets. Real transformation starts at the dispensing counter, the distribution route, and offline clinics.
              </p>
              <div style="display: flex; gap: 20px; align-items: center;">
                <div style="background: rgba(43, 224, 176, 0.08); border: 1px solid var(--border); padding: 14px 24px; border-radius: 12px; font-family: monospace; font-size: 14px; color: var(--teal); letter-spacing: 0.1em;">
                  5-PART CLINICAL DECK
                </div>
                <div style="font-family: monospace; font-size: 13px; color: var(--muted); letter-spacing: 0.12em;">
                  SYNERGE HEALTH VENTURE STUDIO
                </div>
              </div>
            """,
            "footer_cta": "SWIPE TO EXPLORE →",
            "footer_left": "SYNERGE HEALTH STUDIO · THESIS"
        },
        # Slide 2: The Core Problem
        {
            "num": "02 / 05",
            "section": "01 // THE INFRASTRUCTURE GAP",
            "content": f"""
              <h2 class="slide-title" style="font-size: 52px; line-height: 1.18; margin-bottom: 32px;">
                The Three Realities of <span style="color: var(--teal);">Frontier Healthcare</span>.
              </h2>
              <div style="display: flex; flex-direction: column; gap: 20px;">
                <div style="background: var(--panel); border: 1px solid var(--border); border-left: 4px solid var(--teal); padding: 28px 32px; border-radius: 12px;">
                  <div style="font-family: monospace; font-size: 13px; color: var(--teal); letter-spacing: 0.14em; margin-bottom: 8px;">01 · DISPENSARY FRAGMENTATION</div>
                  <div style="font-size: 22px; font-weight: 600; color: var(--ink); margin-bottom: 6px;">80%+ of transactions occur in independent pharmacies</div>
                  <div style="font-size: 17px; color: var(--body); line-height: 1.45;">Generic marketplace apps fail because independent pharmacists rely on trust networks, credit books, and manual distributor reps.</div>
                </div>
                <div style="background: var(--panel); border: 1px solid var(--border); border-left: 4px solid var(--gold); padding: 28px 32px; border-radius: 12px;">
                  <div style="font-family: monospace; font-size: 13px; color: var(--gold); letter-spacing: 0.14em; margin-bottom: 8px;">02 · CONNECTIVITY & POWER DEFICIT</div>
                  <div style="font-size: 22px; font-weight: 600; color: var(--ink); margin-bottom: 6px;">Cloud-only systems break at the point of care</div>
                  <div style="font-size: 17px; color: var(--body); line-height: 1.45;">Systems must operate local-first with resilient offline sync, graceful degraded modes, and low-bandwidth telemetry.</div>
                </div>
                <div style="background: var(--panel); border: 1px solid var(--border); border-left: 4px solid var(--teal); padding: 28px 32px; border-radius: 12px;">
                  <div style="font-family: monospace; font-size: 13px; color: var(--teal); letter-spacing: 0.14em; margin-bottom: 8px;">03 · CLINICAL RIGOUR REQUIREMENT</div>
                  <div style="font-size: 22px; font-weight: 600; color: var(--ink); margin-bottom: 6px;">Healthtech is not rapid e-commerce</div>
                  <div style="font-size: 17px; color: var(--body); line-height: 1.45;">Safety, regulatory provenance, temperature logs, and counterfeit verification must be architected into the base protocol.</div>
                </div>
              </div>
            """,
            "footer_cta": "NEXT: MARKET DATA →",
            "footer_left": "CHALLENGE DIAGNOSIS"
        },
        # Slide 3: The Data / Telemetry Insight
        {
            "num": "03 / 05",
            "section": "02 // MARKET TELEMETRY",
            "content": f"""
              <div style="background: var(--panel); border: 1px solid var(--border); border-radius: 16px; padding: 40px; margin-bottom: 30px; position: relative;">
                <div style="font-family: monospace; font-size: 13px; color: var(--teal); letter-spacing: 0.15em; margin-bottom: 12px;">PRIMARY CARE SUPPLY AUDIT</div>
                <div style="font-size: 120px; font-weight: 700; color: var(--teal); line-height: 0.9; margin-bottom: 16px; letter-spacing: -0.04em;">84%</div>
                <div style="font-size: 26px; font-weight: 600; color: var(--ink); line-height: 1.35; margin-bottom: 16px;">
                  Of essential medicine stockouts stem from lack of local dispensary telemetry, not global manufacturing shortage.
                </div>
                <div style="display: flex; gap: 24px; border-top: 1px solid rgba(43,224,176,0.15); padding-top: 18px; font-family: monospace; font-size: 12px; color: var(--muted); letter-spacing: 0.1em;">
                  <div>FACILITIES AUDITED: 1,420</div>
                  <div>ONLINE TELEMETRY: 12%</div>
                  <div>SAMPLE REGION: EAST AFRICA</div>
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 22px 24px; border-radius: 12px;">
                  <div style="font-family: monospace; font-size: 12px; color: #E57373; letter-spacing: 0.12em; margin-bottom: 6px;">✕ CONVENTIONAL VIEW</div>
                  <div style="font-size: 16px; color: var(--body); line-height: 1.45;">"Frontier markets lack pharmaceutical inventory." (False assumption)</div>
                </div>
                <div style="background: rgba(43,224,176,0.04); border: 1px solid var(--border); padding: 22px 24px; border-radius: 12px;">
                  <div style="font-family: monospace; font-size: 12px; color: var(--teal); letter-spacing: 0.12em; margin-bottom: 6px;">✓ VERIFIED REALITY</div>
                  <div style="font-size: 16px; color: var(--ink); line-height: 1.45;">Stock exists in central hubs, but routing and reorder signals are blind.</div>
                </div>
              </div>
            """,
            "footer_cta": "NEXT: STUDIO MODEL →",
            "footer_left": "CLINICAL AUDIT EVIDENCE"
        },
        # Slide 4: The Studio Model
        {
            "num": "04 / 05",
            "section": "03 // THE VENTURE OPERATING SYSTEM",
            "content": f"""
              <h2 class="slide-title" style="font-size: 48px; line-height: 1.2; margin-bottom: 30px;">
                We Don't Accelerate.<br><span style="color: var(--teal);">We Co-Build From Scratch.</span>
              </h2>
              <div style="display: flex; flex-direction: column; gap: 18px;">
                <div style="background: var(--panel); border: 1px solid var(--border); padding: 24px 28px; border-radius: 12px; display: flex; gap: 24px; align-items: flex-start;">
                  <div style="background: rgba(43,224,176,0.1); color: var(--teal); font-family: monospace; font-size: 16px; font-weight: 700; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">01</div>
                  <div>
                    <div style="font-size: 20px; font-weight: 600; color: var(--ink); margin-bottom: 4px;">Institutional Capital & Pre-Seed Underwriting</div>
                    <div style="font-size: 16px; color: var(--body); line-height: 1.45;">We fund high-conviction clinical problems before traditional VCs understand the nuance.</div>
                  </div>
                </div>
                <div style="background: var(--panel); border: 1px solid var(--border); padding: 24px 28px; border-radius: 12px; display: flex; gap: 24px; align-items: flex-start;">
                  <div style="background: rgba(43,224,176,0.1); color: var(--teal); font-family: monospace; font-size: 16px; font-weight: 700; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">02</div>
                  <div>
                    <div style="font-size: 20px; font-weight: 600; color: var(--ink); margin-bottom: 4px;">Embedded Engineering & Design Muscle</div>
                    <div style="font-size: 16px; color: var(--body); line-height: 1.45;">Our core studio architects build alongside founders — from local-first sync to clinical POS hardware.</div>
                  </div>
                </div>
                <div style="background: var(--panel); border: 1px solid var(--border); padding: 24px 28px; border-radius: 12px; display: flex; gap: 24px; align-items: flex-start;">
                  <div style="background: rgba(43,224,176,0.1); color: var(--teal); font-family: monospace; font-size: 16px; font-weight: 700; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">03</div>
                  <div>
                    <div style="font-size: 20px; font-weight: 600; color: var(--ink); margin-bottom: 4px;">Direct Clinical & Regulatory Distribution</div>
                    <div style="font-size: 16px; color: var(--body); line-height: 1.45;">Instant access to verified pharmacy networks, hospital administrators, and licensing bodies.</div>
                  </div>
                </div>
              </div>
            """,
            "footer_cta": "NEXT: CALL TO FOUNDERS →",
            "footer_left": "STUDIO ARCHITECTURE"
        },
        # Slide 5: Outro / Founder Invitation
        {
            "num": "05 / 05",
            "section": "04 // CALL TO CO-FOUNDERS",
            "content": f"""
              <div style="text-align: center; display: flex; flex-direction: column; align-items: center; margin: auto 0;">
                <div style="width: 130px; height: 130px; margin-bottom: 36px; filter: drop-shadow(0 0 35px rgba(43, 224, 176, 0.35));">
                  {svg_icon_gradient}
                </div>
                <h2 style="font-size: 52px; font-weight: 700; color: var(--ink); line-height: 1.18; margin-bottom: 24px; max-width: 820px;">
                  Building Category-Defining Health Infrastructure in <span style="color: var(--teal);">Africa?</span>
                </h2>
                <p style="font-size: 22px; color: var(--body); max-width: 780px; line-height: 1.55; margin-bottom: 40px;">
                  We partner with technical founders, clinicians, and health operators ready to solve non-trivial structural challenges.
                </p>
                <div style="display: inline-block; background: var(--gold); color: var(--void); font-family: monospace; font-size: 16px; font-weight: 700; letter-spacing: 0.14em; padding: 22px 48px; border-radius: 40px; box-shadow: 0 10px 30px rgba(227, 168, 59, 0.35); margin-bottom: 30px;">
                  APPLY AS A CO-BUILDER · SYNERGEHEALTH.COM
                </div>
                <div style="font-family: monospace; font-size: 13px; color: var(--muted); letter-spacing: 0.14em;">
                  VENTURE INCUBATION · PRE-SEED BACKING · OPERATIONAL OS
                </div>
              </div>
            """,
            "footer_cta": "SYNERGEHEALTH.COM",
            "footer_left": "SYNERGE HEALTH VENTURE STUDIO"
        }
    ]

    # Build Individual Carousel Slide HTMLs and Master Carousel HTML
    master_carousel_slides_html = ""
    for idx, slide in enumerate(slides_data, start=1):
        slide_inner_html = f"""
        <div class="slide" id="slide-{idx}">
          <div class="header">
            <div class="header-badge">{slide['num']} · {slide['section']}</div>
            <div class="header-brand">{svg_icon_gradient}</div>
          </div>
          <div class="slide-content">
            {slide['content']}
          </div>
          <div class="footer">
            <div>{slide['footer_left']}</div>
            <div class="footer-cta">{slide['footer_cta']}</div>
          </div>
        </div>
        """
        master_carousel_slides_html += slide_inner_html

        single_slide_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
{common_css}
body {{
  width: 1080px;
  height: 1350px;
}}
.slide {{
  width: 1080px;
  height: 1350px;
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}}
.slide > * {{ position: relative; z-index: 2; }}
.header {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 24px;
}}
.header-badge {{
  font-family: monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--teal);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
}}
.header-badge::before {{
  content: '';
  width: 8px; height: 8px;
  background: var(--teal);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--teal);
}}
.header-brand svg {{ width: 32px; height: 32px; }}
.slide-content {{
  margin: auto 0;
}}
.pill {{
  display: inline-block;
  font-family: monospace;
  font-size: 13px;
  letter-spacing: 0.15em;
  color: var(--teal);
  background: rgba(43, 224, 176, 0.08);
  border: 1px solid var(--border);
  padding: 8px 18px;
  border-radius: 20px;
  margin-bottom: 24px;
}}
.footer {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border);
  padding-top: 24px;
  font-family: monospace;
  font-size: 13px;
  letter-spacing: 0.12em;
  color: var(--muted);
  text-transform: uppercase;
}}
.footer-cta {{ color: var(--teal); font-weight: 700; }}
</style>
</head>
<body>
<div class="bg-grid"></div>
<div class="glow-aura" style="top: -150px; right: -150px; width: 600px; height: 600px; background: rgba(43,224,176,0.12);"></div>
<div class="glow-aura" style="bottom: -150px; left: -150px; width: 600px; height: 600px; background: rgba(18,102,77,0.18);"></div>
{slide_inner_html}
</body>
</html>
"""
        (SOCIAL / f"carousel_slide_{idx}.html").write_text(single_slide_html, encoding="utf-8")

    master_carousel_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
{common_css}
@page {{
  size: 1080px 1350px;
  margin: 0;
}}
@media print {{
  .slide {{
    page-break-after: always;
    page-break-inside: avoid;
    break-after: page;
  }}
}}
.slide {{
  width: 1080px;
  height: 1350px;
  background-color: var(--void);
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}}
.slide::before {{
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(43, 224, 176, 0.08) 1px, transparent 0),
    linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 36px 36px, 144px 144px, 144px 144px;
  pointer-events: none;
}}
.slide > * {{ position: relative; z-index: 2; }}
.header {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 24px;
}}
.header-badge {{
  font-family: monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--teal);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
}}
.header-badge::before {{
  content: '';
  width: 8px; height: 8px;
  background: var(--teal);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--teal);
}}
.header-brand svg {{ width: 32px; height: 32px; }}
.slide-content {{
  margin: auto 0;
}}
.pill {{
  display: inline-block;
  font-family: monospace;
  font-size: 13px;
  letter-spacing: 0.15em;
  color: var(--teal);
  background: rgba(43, 224, 176, 0.08);
  border: 1px solid var(--border);
  padding: 8px 18px;
  border-radius: 20px;
  margin-bottom: 24px;
}}
.footer {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border);
  padding-top: 24px;
  font-family: monospace;
  font-size: 13px;
  letter-spacing: 0.12em;
  color: var(--muted);
  text-transform: uppercase;
}}
.footer-cta {{ color: var(--teal); font-weight: 700; }}
</style>
</head>
<body>
{master_carousel_slides_html}
</body>
</html>
"""
    (SOCIAL / "carousel_template.html").write_text(master_carousel_html, encoding="utf-8")

    # =========================================================
    # 2. FOUNDER / VENTURE ANNOUNCEMENT CARD (1080 × 1080)
    # Balanced vertical rhythm with full frame utilization
    # =========================================================
    announcement_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
{common_css}
body {{
  width: 1080px;
  height: 1080px;
  padding: 68px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}}
.header {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 20px;
  position: relative;
  z-index: 2;
}}
.header-badge {{
  font-family: monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--teal);
  display: flex;
  align-items: center;
  gap: 10px;
}}
.header-badge::before {{
  content: '';
  width: 8px; height: 8px;
  background: var(--teal);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--teal);
}}
.header-brand svg {{ width: 34px; height: 34px; }}
.card-content {{
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 34px 0 28px 0;
}}
.hero-block {{
  display: flex;
  flex-direction: column;
  gap: 14px;
}}
.hero-pill {{
  display: inline-block;
  font-family: monospace;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--gold);
  background: rgba(227, 168, 59, 0.08);
  border: 1px solid rgba(227, 168, 59, 0.25);
  padding: 6px 16px;
  border-radius: 20px;
  width: fit-content;
}}
.hero-title {{
  font-size: 58px;
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--ink);
}}
.hero-title span {{ color: var(--teal); }}
.venture-box {{
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 34px 40px;
  position: relative;
  overflow: hidden;
}}
.venture-box::before {{
  content: '';
  position: absolute;
  top: 0; left: 0; width: 6px; height: 100%;
  background: var(--teal);
}}
.venture-header {{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}}
.venture-name {{
  font-size: 34px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.01em;
}}
.venture-badge {{
  font-family: monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--teal);
  background: rgba(43,224,176,0.1);
  border: 1px solid var(--border);
  padding: 6px 14px;
  border-radius: 14px;
}}
.venture-thesis {{
  font-size: 20px;
  color: var(--body);
  line-height: 1.48;
  margin-bottom: 24px;
}}
.venture-metrics {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  border-top: 1px solid rgba(43,224,176,0.12);
  padding-top: 20px;
}}
.metric-col {{
  font-family: monospace;
}}
.metric-label {{
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.12em;
  margin-bottom: 4px;
}}
.metric-val {{
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
}}
.bottom-block {{
  display: flex;
  flex-direction: column;
  gap: 12px;
}}
.quote-strip {{
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 20px 28px;
  font-size: 18px;
  color: var(--body);
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 14px;
}}
.quote-strip::before {{
  content: '“';
  font-size: 36px;
  color: var(--teal);
  line-height: 0;
  font-family: serif;
}}
.footer {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border);
  padding-top: 20px;
  font-family: monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--muted);
  position: relative;
  z-index: 2;
}}
.footer-cta {{ color: var(--teal); font-weight: 700; }}
</style>
</head>
<body>
<div class="bg-grid"></div>
<div class="glow-aura" style="top: 250px; right: 50px; width: 500px; height: 500px; background: rgba(43,224,176,0.1);"></div>

<div class="header">
  <div class="header-badge">PORTFOLIO ANNOUNCEMENT // VENTURE CO-BUILD</div>
  <div class="header-brand">{svg_icon_gradient}</div>
</div>

<div class="card-content">
  <div class="hero-block">
    <div class="hero-pill">NEW VENTURE INCUBATION · PRE-SEED</div>
    <h1 class="hero-title">Welcoming Our Next<br><span>Clinical Venture</span>.</h1>
  </div>

  <div class="venture-box">
    <div class="venture-header">
      <div class="venture-name">METIS HEALTH</div>
      <div class="venture-badge">A SYNERGE HEALTH VENTURE</div>
    </div>
    <div class="venture-thesis">
      Decentralised clinical supply chain telemetry across East Africa, synchronising inventory signals directly between primary care dispensaries and regional distributors.
    </div>
    <div class="venture-metrics">
      <div class="metric-col">
        <div class="metric-label">NETWORK COVERAGE</div>
        <div class="metric-val">420+ DISPENSARIES</div>
      </div>
      <div class="metric-col">
        <div class="metric-label">PILOT MARKET</div>
        <div class="metric-val">NAIROBI · MOMBASA</div>
      </div>
      <div class="metric-col">
        <div class="metric-label">CORE INFRASTRUCTURE</div>
        <div class="metric-val">SYNERGE CONTROL PLANE</div>
      </div>
    </div>
  </div>

  <div class="bottom-block">
    <div class="quote-strip">
      Solving the last-mile clinical deficit through embedded telemetry rather than external marketplaces.
    </div>
  </div>
</div>

<div class="footer">
  <div>AFRICA'S HEALTHTECH STUDIO</div>
  <div class="footer-cta">SYNERGEHEALTH.COM</div>
</div>
</body>
</html>
"""
    (SOCIAL / "announcement_card.html").write_text(announcement_html, encoding="utf-8")

    # =========================================================
    # 3. CLINICAL / MARKET TELEMETRY STAT CARD (1080 × 1080)
    # Balanced vertical rhythm with full frame utilization
    # =========================================================
    stat_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
{common_css}
body {{
  width: 1080px;
  height: 1080px;
  padding: 68px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}}
.header {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 20px;
  position: relative;
  z-index: 2;
}}
.header-badge {{
  font-family: monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--teal);
  display: flex;
  align-items: center;
  gap: 10px;
}}
.header-badge::before {{
  content: '';
  width: 8px; height: 8px;
  background: var(--teal);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--teal);
}}
.header-brand svg {{ width: 34px; height: 34px; }}
.card-content {{
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 32px 0 24px 0;
}}
.stat-pill {{
  display: inline-block;
  font-family: monospace;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--teal);
  background: rgba(43, 224, 176, 0.08);
  border: 1px solid var(--border);
  padding: 6px 16px;
  border-radius: 20px;
  width: fit-content;
}}
.stat-metric {{
  font-size: 160px;
  font-weight: 700;
  color: var(--teal);
  line-height: 0.85;
  letter-spacing: -0.04em;
  text-shadow: 0 0 40px rgba(43, 224, 176, 0.25);
}}
.headline-block {{
  display: flex;
  flex-direction: column;
  gap: 12px;
}}
.stat-headline {{
  font-size: 38px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.22;
}}
.stat-desc {{
  font-size: 23px;
  color: var(--body);
  line-height: 1.48;
  max-width: 900px;
}}
.vital-strip {{
  display: flex;
  align-items: center;
  gap: 20px;
}}
.vital-trace {{
  width: 320px;
  height: 22px;
}}
.vital-tag {{
  font-family: monospace;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.12em;
}}
.telemetry-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px 28px;
}}
.tel-item {{
  font-family: monospace;
}}
.tel-label {{
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.12em;
  margin-bottom: 4px;
}}
.tel-value {{
  font-size: 17px;
  font-weight: 700;
  color: var(--teal);
}}
.source-tag {{
  font-family: monospace;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.12em;
}}
.footer {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border);
  padding-top: 20px;
  font-family: monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--muted);
  position: relative;
  z-index: 2;
}}
.footer-cta {{ color: var(--teal); font-weight: 700; }}
</style>
</head>
<body>
<div class="bg-grid"></div>
<div class="glow-aura" style="top: 200px; left: 100px; width: 600px; height: 600px; background: rgba(43,224,176,0.1);"></div>

<div class="header">
  <div class="header-badge">SYNERGE HEALTH INSIGHTS // CLINICAL FIELD DATA</div>
  <div class="header-brand">{svg_icon_gradient}</div>
</div>

<div class="card-content">
  <div>
    <div class="stat-pill" style="margin-bottom: 12px;">MARKET TELEMETRY REPORT</div>
    <div class="stat-metric">84%</div>
  </div>

  <div class="headline-block">
    <div class="stat-headline">Dispensary Stockouts in Primary Care</div>
    <div class="stat-desc">
      Stockouts in community dispensaries stem from lack of local point-of-dispense telemetry and offline paper ledgering — not regional drug manufacturing deficits.
    </div>
  </div>

  <div class="vital-strip">
    <svg class="vital-trace" viewBox="0 0 320 22">
      <path d="M0 11 L100 11 L110 3 L118 19 L126 0 L134 22 L142 5 L150 11 L320 11" 
            stroke="#2BE0B0" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div class="vital-tag">LIVE TELEMETRY TRACE · 1,420 AUDITED FACILITIES</div>
  </div>

  <div class="telemetry-grid">
    <div class="tel-item">
      <div class="tel-label">AUDITED FACILITIES</div>
      <div class="tel-value">1,420 SITES</div>
    </div>
    <div class="tel-item">
      <div class="tel-label">ONLINE TELEMETRY</div>
      <div class="tel-value">12.4% ADOPTION</div>
    </div>
    <div class="tel-item">
      <div class="tel-label">DATA INTEGRITY</div>
      <div class="tel-value">VERIFIED Q4 2026</div>
    </div>
  </div>

  <div class="source-tag">SOURCE: SYNERGE HEALTH CLINICAL SUPPLY AUDIT · SUB-SAHARAN AFRICA</div>
</div>

<div class="footer">
  <div>CONTEXT FIRST · CLINICAL RIGOUR</div>
  <div class="footer-cta">SYNERGEHEALTH.COM</div>
</div>
</body>
</html>
"""
    (SOCIAL / "stat_card.html").write_text(stat_html, encoding="utf-8")

    # =========================================================
    # 4. LINKEDIN COMPANY BANNER (1584 × 396)
    # Fixed SVG sizing and avatar safe zone
    # =========================================================
    linkedin_banner_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
{common_css}
body {{
  width: 1584px;
  height: 396px;
  padding: 48px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}}
.left-block {{
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 260px; /* Safe zone for round profile avatar on LinkedIn */
  position: relative;
  z-index: 2;
}}
.brand-strip {{
  display: flex;
  align-items: center;
  gap: 18px;
}}
.brand-icon-box {{
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}}
.brand-icon-box svg {{
  width: 44px !important;
  height: 44px !important;
}}
.brand-name {{
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
}}
.brand-name span {{ color: var(--teal); }}
.tagline {{
  font-family: monospace;
  font-size: 13px;
  letter-spacing: 0.18em;
  color: var(--gold);
}}
.descriptor {{
  font-size: 18px;
  color: var(--body);
  max-width: 580px;
  line-height: 1.4;
}}
.right-pillars {{
  display: flex;
  gap: 20px;
  position: relative;
  z-index: 2;
}}
.pillar-card {{
  background: rgba(13, 24, 21, 0.85);
  border: 1px solid var(--border);
  padding: 20px 24px;
  border-radius: 12px;
  min-width: 175px;
}}
.pillar-num {{
  font-family: monospace;
  font-size: 11px;
  color: var(--teal);
  letter-spacing: 0.15em;
  margin-bottom: 6px;
}}
.pillar-title {{
  font-size: 16px;
  font-weight: 600;
  color: var(--ink);
}}
</style>
</head>
<body>
<div class="bg-grid"></div>
<div class="glow-aura" style="top: -100px; right: 200px; width: 400px; height: 400px; background: rgba(43,224,176,0.15);"></div>

<div class="left-block">
  <div class="brand-strip">
    <div class="brand-icon-box">{svg_icon_gradient}</div>
    <div class="brand-name">SYNERGE <span>HEALTH</span></div>
  </div>
  <div class="tagline">AFRICA'S HEALTHTECH VENTURE STUDIO</div>
  <div class="descriptor">Co-building institutional software, physical distribution, and clinical telemetry for frontier markets.</div>
</div>

<div class="right-pillars">
  <div class="pillar-card">
    <div class="pillar-num">PILLAR 01</div>
    <div class="pillar-title">Venture Studio</div>
  </div>
  <div class="pillar-card">
    <div class="pillar-num">PILLAR 02</div>
    <div class="pillar-title">Clinical OS</div>
  </div>
  <div class="pillar-card">
    <div class="pillar-num">PILLAR 03</div>
    <div class="pillar-title">Supply Telemetry</div>
  </div>
</div>
</body>
</html>
"""
    (SOCIAL / "linkedin_banner.html").write_text(linkedin_banner_html, encoding="utf-8")

    # =========================================================
    # 5. X / TWITTER PROFILE BANNER (1500 × 500)
    # Fixed SVG sizing and avatar safe zone
    # =========================================================
    twitter_banner_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
{common_css}
body {{
  width: 1500px;
  height: 500px;
  padding: 60px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}}
.left-block {{
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 280px; /* Safe zone for round profile avatar on Twitter */
  position: relative;
  z-index: 2;
}}
.brand-strip {{
  display: flex;
  align-items: center;
  gap: 20px;
}}
.brand-icon-box {{
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}}
.brand-icon-box svg {{
  width: 48px !important;
  height: 48px !important;
}}
.brand-name {{
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
}}
.brand-name span {{ color: var(--teal); }}
.tagline {{
  font-family: monospace;
  font-size: 14px;
  letter-spacing: 0.2em;
  color: var(--gold);
}}
.descriptor {{
  font-size: 20px;
  color: var(--body);
  max-width: 620px;
  line-height: 1.45;
}}
.url-tag {{
  font-family: monospace;
  font-size: 13px;
  color: var(--teal);
  letter-spacing: 0.15em;
}}
.vital-box {{
  background: var(--panel);
  border: 1px solid var(--border);
  padding: 32px 36px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 2;
}}
</style>
</head>
<body>
<div class="bg-grid"></div>
<div class="glow-aura" style="top: -50px; right: 100px; width: 450px; height: 450px; background: rgba(43,224,176,0.18);"></div>

<div class="left-block">
  <div class="brand-strip">
    <div class="brand-icon-box">{svg_icon_gradient}</div>
    <div class="brand-name">SYNERGE <span>HEALTH</span></div>
  </div>
  <div class="tagline">AFRICA'S HEALTHTECH VENTURE STUDIO</div>
  <div class="descriptor">Building the clinical operating systems and distribution infrastructure powering Africa's next generation of healthcare ventures.</div>
  <div class="url-tag">SYNERGEHEALTH.COM · @SYNERGEHEALTH</div>
</div>

<div class="vital-box">
  <div style="font-family: monospace; font-size: 12px; color: var(--teal); letter-spacing: 0.15em;">CLINICAL TELEMETRY</div>
  <svg width="220" height="24" viewBox="0 0 220 24">
    <path d="M0 12 L70 12 L78 4 L84 20 L90 2 L96 22 L102 6 L108 12 L220 12" 
          stroke="#2BE0B0" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <div style="font-family: monospace; font-size: 11px; color: var(--muted); letter-spacing: 0.12em;">CONTEXT-FIRST ARCHITECTURE</div>
</div>
</body>
</html>
"""
    (SOCIAL / "twitter_banner.html").write_text(twitter_banner_html, encoding="utf-8")

    # =========================================================
    # 6. PROFILE AVATARS (400 × 400) - DARK & LIGHT
    # =========================================================
    avatar_dark_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{
  width: 400px;
  height: 400px;
  background: #060B09;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}}
.squircle {{
  width: 320px;
  height: 320px;
  background: #0D1815;
  border: 2px solid rgba(43, 224, 176, 0.35);
  border-radius: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 50px rgba(43, 224, 176, 0.2);
}}
.squircle svg {{
  width: 190px !important;
  height: 190px !important;
}}
</style>
</head>
<body>
<div class="squircle">
  {svg_icon_gradient}
</div>
</body>
</html>
"""
    (SOCIAL / "avatar_dark.html").write_text(avatar_dark_html, encoding="utf-8")

    avatar_light_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{
  width: 400px;
  height: 400px;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}}
.squircle {{
  width: 320px;
  height: 320px;
  background: #F4F8F6;
  border: 2px solid rgba(18, 102, 77, 0.25);
  border-radius: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}}
.squircle svg {{
  width: 190px !important;
  height: 190px !important;
}}
</style>
</head>
<body>
<div class="squircle">
  {svg_icon_gradient}
</div>
</body>
</html>
"""
    (SOCIAL / "avatar_light.html").write_text(avatar_light_html, encoding="utf-8")

    print("Generated all social HTML template source files.")

    # =========================================================
    # EXPORT COMMANDS VIA HEADLESS CHROME
    # =========================================================

    # 1. Master Swipable Carousel PDF for LinkedIn
    carousel_pdf = EXPORTS / "synerge_linkedin_carousel.pdf"
    subprocess.run([
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--run-all-compositor-stages-before-draw",
        "--no-pdf-header-footer",
        f"--print-to-pdf={carousel_pdf}",
        f"file://{SOCIAL / 'carousel_template.html'}"
    ], check=True)
    print(f"Generated Carousel PDF: {carousel_pdf}")

    # 2. Individual Carousel Slide PNGs (Slides 1 to 5)
    for idx in range(1, 6):
        out_png = EXPORTS / f"carousel_slide_{idx}.png"
        subprocess.run([
            CHROME,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--run-all-compositor-stages-before-draw",
            "--window-size=1080,1350",
            f"--screenshot={out_png}",
            f"file://{SOCIAL / f'carousel_slide_{idx}.html'}"
        ], check=True)
        print(f"Generated Carousel Slide {idx} PNG: {out_png}")

    # 3. 1:1 Square Venture Announcement Card
    announcement_png = EXPORTS / "venture_announcement_1080x1080.png"
    subprocess.run([
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--run-all-compositor-stages-before-draw",
        "--window-size=1080,1080",
        f"--screenshot={announcement_png}",
        f"file://{SOCIAL / 'announcement_card.html'}"
    ], check=True)
    print(f"Generated Announcement PNG: {announcement_png}")

    # 4. 1:1 Square Clinical Stat Card
    stat_png = EXPORTS / "clinical_stat_card_1080x1080.png"
    subprocess.run([
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--run-all-compositor-stages-before-draw",
        "--window-size=1080,1080",
        f"--screenshot={stat_png}",
        f"file://{SOCIAL / 'stat_card.html'}"
    ], check=True)
    print(f"Generated Clinical Stat PNG: {stat_png}")

    # 5. LinkedIn Banner (1584 × 396)
    linkedin_banner_png = EXPORTS / "linkedin_banner_1584x396.png"
    subprocess.run([
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--run-all-compositor-stages-before-draw",
        "--window-size=1584,396",
        f"--screenshot={linkedin_banner_png}",
        f"file://{SOCIAL / 'linkedin_banner.html'}"
    ], check=True)
    print(f"Generated LinkedIn Banner PNG: {linkedin_banner_png}")

    # 6. Twitter / X Banner (1500 × 500)
    twitter_banner_png = EXPORTS / "twitter_header_1500x500.png"
    subprocess.run([
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--run-all-compositor-stages-before-draw",
        "--window-size=1500,500",
        f"--screenshot={twitter_banner_png}",
        f"file://{SOCIAL / 'twitter_banner.html'}"
    ], check=True)
    print(f"Generated Twitter Banner PNG: {twitter_banner_png}")

    # 7. Avatars (Dark & Light 400 × 400)
    avatar_dark_png = EXPORTS / "avatar_dark_400x400.png"
    subprocess.run([
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--run-all-compositor-stages-before-draw",
        "--window-size=400,400",
        f"--screenshot={avatar_dark_png}",
        f"file://{SOCIAL / 'avatar_dark.html'}"
    ], check=True)

    avatar_light_png = EXPORTS / "avatar_light_400x400.png"
    subprocess.run([
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--run-all-compositor-stages-before-draw",
        "--window-size=400,400",
        f"--screenshot={avatar_light_png}",
        f"file://{SOCIAL / 'avatar_light.html'}"
    ], check=True)
    print("Generated Social Profile Avatars (Dark & Light).")

    # Mirror exports into public/social/ for instant live web access
    for f in EXPORTS.glob("*.*"):
        shutil.copy2(f, PUBLIC_SOCIAL / f.name)
    print(f"Mirrored all exports to {PUBLIC_SOCIAL}")

if __name__ == "__main__":
    main()
