# Synerge Health — Post-Launch Tasks & Action Checklist

This document contains step-by-step instructions for setting up free custom business emails, enabling real-time form delivery to your inbox, deploying to Cloudflare Pages, and connecting your custom domain.

---

## 1. Set Up Free Business Emails (`hello@synergehealth.com`)

Use **Cloudflare Email Routing** to forward all incoming business emails to your personal inbox for free.

### Setup Steps:
1. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com) → Select **synergehealth.com**.
2. Navigation menu: Click **Email** → **Email Routing**.
3. Click **Enable Email Routing** *(Cloudflare will automatically add the required MX and TXT DNS records for you)*.
4. Click **Destination Addresses** → **Add Destination Address** → Enter your personal email (e.g. `yourname@gmail.com`). Verify it via the email sent to you.
5. Click **Routing Rules** → **Create Custom Address**:
   - **Custom Address:** `hello` `@synergehealth.com` → **Action:** Forward to `yourname@gmail.com`
   - **Custom Address:** `press` `@synergehealth.com` → **Action:** Forward to `yourname@gmail.com`
   - **Custom Address:** `investors` `@synergehealth.com` → **Action:** Forward to `yourname@gmail.com`

---

## 2. Enable Real-Time Form Submissions to Your Inbox (Web3Forms)

All 4 forms (Founder Application, Investor Enquiry, Contact, Newsletter) are pre-configured to send submissions via **Web3Forms** (100% free, unlimited submissions).

### Setup Steps:
1. Go to **[web3forms.com](https://web3forms.com)**.
2. Enter `hello@synergehealth.com` (or your personal email).
3. Web3Forms will instantly email you a free **Access Key**.
4. Add the key to your Cloudflare Pages environment variables:
   - Go to Cloudflare Dashboard → **Workers & Pages** → **synerge-health** project.
   - Go to **Settings** → **Environment Variables** → **Add variable**.
   - **Variable name:** `WEB3FORMS_ACCESS_KEY`
   - **Value:** *(Paste your Web3Forms key)*
   - Click **Save**.

---

## 3. Deploy Project to Cloudflare Pages

### Setup Steps:
1. Push your latest code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: editorial redesign & Web3Forms integration"
   git push origin main
   ```
2. In Cloudflare Dashboard → Go to **Workers & Pages** → **Create Application** → **Pages** → **Connect to Git**.
3. Select the repository.
4. Configure build settings:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `web`
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `.next`
5. Click **Save and Deploy**.

---

## 4. Connect Custom Domain (`synergehealth.com`)

1. In Cloudflare Pages project → Go to **Custom Domains**.
2. Click **Set up a custom domain**.
3. Enter `synergehealth.com` (and `www.synergehealth.com`).
4. Click **Continue** → Cloudflare will bind the domain automatically since DNS is hosted on Cloudflare.

---

## Quick Reference Summary

| Task | Platform / Tool | Cost | Status |
|---|---|---|---|
| Website Hosting | Cloudflare Pages | Free | ✅ Completed |
| Custom Business Email | Cloudflare Email Routing | Free | ✅ Completed (`hello`, `press`, `careers`, `privacy`) |
| Form Delivery to Email | Web3Forms API | Free | ✅ Completed |
| Domain DNS / SSL | Cloudflare | Free | ✅ Completed (`synergehealth.com`) |

