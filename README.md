# Synerge Health

Official web platform for Synerge Health — Africa's Digital Health Venture Studio. Built with Next.js (App Router), Tailwind CSS, and optimized for deployment on **Cloudflare Pages**.

---

## 🚀 Quick Start (Local Development)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Deployment to Cloudflare Pages

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "deploy: update website"
   git push origin main
   ```
2. Log into **[Cloudflare Dashboard](https://dash.cloudflare.com)** → **Workers & Pages** → **Connect to Git**.
3. Select your repository:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** *(leave blank / default)*
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `.next`
4. Click **Save and Deploy**.

---

## 📋 Features & Forms

- **Editorial Design System**: High-whitespace, minimal typography grid inspired by leading venture studios.
- **Form Endpoints**: Integrated with **Web3Forms** (`/api/apply`, `/api/contact`, `/api/invest`, `/api/newsletter`) to send form submissions directly to your email.
- **Action Checklist**: Refer to [`TASKS.md`](file:///Users/osadose/Downloads/Synerge%20Health/TASKS.md) for setting up free Cloudflare email routing (`hello@synergehealth.com`).
