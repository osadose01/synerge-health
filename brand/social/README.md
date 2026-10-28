# Synerge Health — Social Media Production Kit

This directory contains the production-ready social media assets, templates, and specifications for **Synerge Health** (`Africa's Healthtech Venture Studio`).

---

## 1. Asset Directory & Inventory

All production exports are located in [`brand/social/exports/`](file:///Users/osadose/Documents/Synerge%20Health/brand/social/exports/) and mirrored to [`public/social/`](file:///Users/osadose/Documents/Synerge%20Health/public/social/):

| Asset File | Format | Dimensions | Target Platform | Description |
| :--- | :--- | :--- | :--- | :--- |
| [`synerge_linkedin_carousel.pdf`](file:///Users/osadose/Documents/Synerge%20Health/brand/social/exports/synerge_linkedin_carousel.pdf) | PDF (5 Pages) | 1080 × 1350 px (4:5) | LinkedIn (Document Post) | Swipable executive thought leadership deck |
| [`carousel_slide_1.png`](file:///Users/osadose/Documents/Synerge%20Health/brand/social/exports/carousel_slide_1.png) to [`carousel_slide_5.png`](file:///Users/osadose/Documents/Synerge%20Health/brand/social/exports/carousel_slide_5.png) | High-Res PNG | 1080 × 1350 px (4:5) | Instagram / X Threads | Individual high-res slides for image carousels |
| [`venture_announcement_1080x1080.png`](file:///Users/osadose/Documents/Synerge%20Health/brand/social/exports/venture_announcement_1080x1080.png) | High-Res PNG | 1080 × 1080 px (1:1) | LinkedIn / X / Instagram Feed | Official co-build portfolio announcement card |
| [`clinical_stat_card_1080x1080.png`](file:///Users/osadose/Documents/Synerge%20Health/brand/social/exports/clinical_stat_card_1080x1080.png) | High-Res PNG | 1080 × 1080 px (1:1) | LinkedIn / X / Instagram Feed | Field audit & telemetry market intelligence tile |
| [`linkedin_banner_1584x396.png`](file:///Users/osadose/Documents/Synerge%20Health/brand/social/exports/linkedin_banner_1584x396.png) | High-Res PNG | 1584 × 396 px (4:1) | LinkedIn Company Page | Studio desktop & mobile safe header banner |
| [`twitter_header_1500x500.png`](file:///Users/osadose/Documents/Synerge%20Health/brand/social/exports/twitter_header_1500x500.png) | High-Res PNG | 1500 × 500 px (3:1) | X / Twitter Profile | Studio profile header banner with avatar safe zone |
| [`avatar_dark_400x400.png`](file:///Users/osadose/Documents/Synerge%20Health/brand/social/exports/avatar_dark_400x400.png) | High-Res PNG | 400 × 400 px (1:1) | All Platforms | Official Dark Squircle profile icon |
| [`avatar_light_400x400.png`](file:///Users/osadose/Documents/Synerge%20Health/brand/social/exports/avatar_light_400x400.png) | High-Res PNG | 400 × 400 px (1:1) | All Platforms | Official Light Squircle profile icon |

---

## 2. Platform Safe Zones & Dimensions

```
┌─────────────────────────────────────────────────────────────┐
│ 1584 × 396 px — LinkedIn Company Banner                     │
│ [Avatar Safe Zone (200px)]   SYNERGE HEALTH   [3 Pillars]   │
└─────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────┐
│ 1080 × 1350 px (4:5)                  │
│ LinkedIn Document & Instagram Swipe   │
│                                       │
│ [Header Badge // Live Teal Dot]       │
│                                       │
│                                       │
│   HERO TYPOGRAPHY                     │
│   (Space Grotesk Bold, 52-64px)       │
│                                       │
│   BODY CONTENT & METRIC CARDS         │
│   (Max-width 880px, Swiss Grid)       │
│                                       │
│                                       │
│ [Studio Tag]      [SWIPE TO EXPLORE →]│
└───────────────────────────────────────┘
```

- **LinkedIn Document Carousel:** Post `synerge_linkedin_carousel.pdf` directly using LinkedIn's "Add a document" feature. This activates native full-width horizontal swiping and significantly outperforms standard image attachments.
- **Instagram Feed:** Upload `carousel_slide_1.png` through `carousel_slide_5.png` as a 4:5 portrait carousel.
- **X / Twitter Threads:** Attach slides to individual posts in an insights thread, or use the 1:1 Square stat card as a standalone visual anchor.

---

## 3. Brand Design Standards for Social

1. **Color Tokens:**
   - **Void Dark:** `#060B09` (Primary background across all dark cards)
   - **Panel Deep:** `#0D1815` (Elevated card containers, borders: `rgba(43, 224, 176, 0.18)`)
   - **Mint / Teal:** `#2BE0B0` (Key focal metrics, action items, glowing live indicators)
   - **Deep Teal:** `#12664D` (Dividers, secondary accents, ECG traces)
   - **Clinical Gold:** `#E3A83B` (CTAs, venture badges, pre-seed status)
   - **Ink White:** `#F8FAFC` (Headings, primary typography)
   - **Muted Gray-Green:** `#8FA39A` (Monospace labels, timestamps, metadata)

2. **Typography System:**
   - **Headings & Key Metrics:** Space Grotesk Bold (`font-weight: 700`, `-0.02em` to `-0.04em` tracking).
   - **Body & Editorial Explanations:** System Sans / Helvetica Neue (`font-weight: 400-500`, 1.45–1.55 line height).
   - **Telemetry, Badges & Footers:** Monospace (`letter-spacing: 0.12em` to `0.18em`, uppercase).

3. **Graphic Motifs:**
   - **Precision Grid:** Subtle 36px radial dot grid overlay (`rgba(43, 224, 176, 0.08)`) with 144px vector gridlines (`rgba(255, 255, 255, 0.02)`).
   - **Vital Line Trace:** 2px vector ECG heartbeat curve representing live clinical telemetry.
   - **Glowing Aura:** 500–600px radial gradient blur (`rgba(43, 224, 176, 0.10)`) creating depth.

---

## 4. Re-Generating and Modifying Assets

To customize copy, stats, or venture announcements:
1. Edit the HTML template strings in [`brand/scripts/build_social_kit.py`](file:///Users/osadose/Documents/Synerge%20Health/brand/scripts/build_social_kit.py).
2. Run the generator script:
   ```bash
   python3 "/Users/osadose/Documents/Synerge Health/brand/scripts/build_social_kit.py"
   ```
3. All PNGs, PDFs, and web mirrors in `public/social/` will automatically recompile.
