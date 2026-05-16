# Deployment — Classroom Prompt Builder

**Canonical repository:** [github.com/DITreneris/teacher](https://github.com/DITreneris/teacher)  
**Production URL:** [promptanatomy.online](https://promptanatomy.online/)  
**Hosting:** Vercel (static files + serverless API routes, no build step)  
**Parent brand:** [promptanatomy.app](https://www.promptanatomy.app/)

---

## For humans — first-time setup

### 1. Push code to GitHub

```bash
git remote add origin https://github.com/DITreneris/teacher.git
# if origin already exists:
#   git remote set-url origin https://github.com/DITreneris/teacher.git
git push -u origin main
```

### 2. Connect Vercel

| Setting | Value |
|---------|--------|
| Import from | `DITreneris/teacher` |
| Framework Preset | **Other** |
| Root Directory | `./` |
| Build Command | *(leave empty)* |
| Output Directory | *(leave empty — files live at repo root)* |
| Install Command | *(leave empty)* |

### 3. Enable analytics

Vercel project → **Analytics** → Enable.

### 4. Add custom domain

Vercel project → **Domains** → Add `promptanatomy.online` (and optionally `www.promptanatomy.online`).

Configure DNS at your registrar (example — use values Vercel shows in the dashboard):

| Type | Name | Value |
|------|------|--------|
| A | `@` | Vercel IP (shown in Vercel UI) |
| CNAME | `www` | `cname.vercel-dns.com` |

### 5. Verify after deploy

- [ ] https://promptanatomy.online/ loads the app
- [ ] https://promptanatomy.online/privacy.html loads
- [ ] https://promptanatomy.online/terms.html loads
- [ ] https://promptanatomy.online/robots.txt is reachable
- [ ] https://promptanatomy.online/sitemap.xml is reachable
- [ ] Copy prompt → toast “Prompt copied.”
- [ ] PDF guide buttons open the correct Stripe Payment Links
- [ ] Stripe webhook endpoint is configured: `https://promptanatomy.online/api/stripe-webhook`
- [ ] Stripe Payment Links redirect to `https://promptanatomy.online/success.html?session_id={CHECKOUT_SESSION_ID}`
- [ ] Stripe customer email receipts are enabled
- [ ] Test purchase opens `success.html`, shows a one-click Download button within ~5 seconds, and sends a separate Resend email with a signed `/api/download?t=...` link
- [ ] Submit sitemap in [Google Search Console](https://search.google.com/search-console)

---

## For robots and search engines

| File | URL | Purpose |
|------|-----|---------|
| `robots.txt` | `/robots.txt` | Explicit policy for citation bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended, Bingbot, ClaudeBot, Applebot, ...) and training bots (GPTBot, CCBot, anthropic-ai, Bytespider, Diffbot, Amazonbot, cohere-ai); points to sitemap. Stance: allow all. Review quarterly. |
| `sitemap.xml` | `/sitemap.xml` | Lists `/`, `/privacy.html`, `/terms.html`; declares the Google image extension and references `og-image.png`. |
| `humans.txt` | `/humans.txt` | Human-readable site credits. |
| `llms.txt` | `/llms.txt` | Concise, machine-readable product brief for AI engines (operator, contact, pricing, paid PDF guides, audience, modes, limitations). |
| `.well-known/security.txt` | `/.well-known/security.txt` | RFC 9116 security contact. |
| `manifest.webmanifest` | `/manifest.webmanifest` | Web app manifest for browser / OS install hints. |
| `og-image.png` | `/og-image.png` | 1200 x 630 social preview. Served with `Cross-Origin-Resource-Policy: cross-origin` so Facebook / LinkedIn / X / Slack can embed it. |
| `apple-touch-icon.png` | `/apple-touch-icon.png` | 180 x 180 home-screen icon. |
| `404.html` | served by Vercel for unmatched routes | Branded 404 with `noindex, follow`. |
| Canonical | `<link rel="canonical">` on each HTML page | Always `https://promptanatomy.online/...`. |
| `meta robots` | `index, follow` on public pages | Indexable marketing + tool pages. |
| Structured data | JSON-LD in `<head>` | `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage` on `index.html`; `BreadcrumbList` on `privacy.html` and `terms.html`. |
| Security headers | `vercel.json` `/(.*)` block | HSTS (2 years, preload), COOP, CORP, CSP-Report-Only, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. |

**Important:** URLs use `.html` extensions (`privacy.html`, `terms.html`). `vercel.json` sets `cleanUrls: false` so canonical URLs, sitemap entries, and tests stay aligned.

**CSP rollout note:** the Content-Security-Policy header is currently `Content-Security-Policy-Report-Only`. After one week of clean reports in production, switch the header key to `Content-Security-Policy` to enforce it.

---

## Configuration files

| File | Role |
|------|------|
| [`vercel.json`](vercel.json) | Security headers, cache rules |
| [`api/stripe-webhook.js`](api/stripe-webhook.js) | Stripe webhook fulfillment endpoint |
| [`api/download.js`](api/download.js) | Token-validated PDF download endpoint (long-lived email link) |
| [`api/download-link.js`](api/download-link.js) | Returns a short-lived (15 min) in-page download URL by Stripe Checkout Session ID; powers `success.html` |
| [`success.html`](success.html) | Post-purchase success page; polls `/api/download-link` until the webhook has finished, then shows a one-click download |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | Runs `npm run test:mixed` on push/PR |

## Environment variables

Set these in Vercel Project Settings → Environment Variables. Do not commit secrets.

| Variable | Required | Purpose |
|----------|----------|---------|
| `STRIPE_SECRET_KEY` | Yes | Stripe API key used by the webhook to retrieve Checkout Sessions. |
| `STRIPE_WEBHOOK_SECRET` | Yes | Verifies events from `https://promptanatomy.online/api/stripe-webhook`. |
| `STRIPE_PRICE_BEGINNERS_PDF` | Yes | Stripe Price ID for the `$4.99` Beginners PDF Guide. |
| `STRIPE_PRICE_ADVANCED_PDF` | Yes | Stripe Price ID for the `$9.99` Advanced Educators PDF Guide. |
| `DOWNLOAD_TOKEN_SECRET` | Yes | HMAC secret for signed download links. Use a long random value. |
| `RESEND_API_KEY` | Yes | Sends transactional PDF delivery emails. |
| `FULFILLMENT_FROM_EMAIL` | Yes | Verified sender, for example `Prompt Anatomy <downloads@promptanatomy.online>`. |
| `UPSTASH_REDIS_REST_URL` | Yes | Redis REST URL for fulfillment records and active download tokens. |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Redis REST token. Legacy `KV_REST_API_*` and `VERCEL_KV_REST_API_*` names are also supported. |
| `SITE_URL` | Recommended | Canonical site URL used in emailed download links. Use `https://promptanatomy.online`. |
| `PDF_BEGINNERS_SOURCE_URL` | Production | Private storage URL for the Beginners PDF. |
| `PDF_ADVANCED_SOURCE_URL` | Production | Private storage URL for the Advanced Educators PDF. |
| `PDF_SOURCE_AUTH_TOKEN` | If needed | Bearer token for private PDF source fetches. |
| `PDF_SOURCE_AUTH_HEADER` | If needed | Custom private-source auth header in `Header-Name: value` format. |
| `DOWNLOAD_TOKEN_TTL_SECONDS` | Optional | Defaults to 7 days (long-lived email download link). |
| `IN_PAGE_DOWNLOAD_TOKEN_TTL_SECONDS` | Optional | Defaults to 15 minutes (short-lived in-page download link surfaced on `success.html`). |
| `FULFILLMENT_STATE_TTL_SECONDS` | Optional | Defaults to 90 days. |

### Stripe setup

1. Create two Stripe Products / Prices: Beginners PDF Guide (`$4.99`) and Advanced Educators PDF Guide (`$9.99`).
2. Create one Payment Link per product and paste those URLs into the PDF buttons in `index.html`.
3. **Set the success URL** on each Payment Link (Stripe Dashboard → Payment Link → After payment → "Don't show confirmation page → Redirect customers to your website") to:
   ```
   https://promptanatomy.online/success.html?session_id={CHECKOUT_SESSION_ID}
   ```
   The `{CHECKOUT_SESSION_ID}` literal is replaced by Stripe with the real session id and consumed by `success.html`.
4. **Enable Stripe receipts** for both products (Stripe Dashboard → Settings → Customer emails → Successful payments → ON). Optionally enable invoice creation on the Payment Link if you want a paid invoice PDF in addition to the receipt.
5. Add a live webhook endpoint for `https://promptanatomy.online/api/stripe-webhook`.
6. Subscribe to `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
7. Use Stripe CLI locally to forward events when testing webhook changes.

### PDF storage

Production PDFs should live in private object storage and be fetched server-side through `PDF_BEGINNERS_SOURCE_URL` and `PDF_ADVANCED_SOURCE_URL`. The public site root must not contain paid PDF binaries. Local-only PDF files can be placed in `api/_private/pdfs/`, but `*.pdf` files in that folder are ignored by git.

---

## Quality gates before push

```bash
npm ci
npm test
npm run test:smoke
npm run test:e2e
npm run test:a11y
```

---

## What is NOT deployed

- `docs/archive/` — historical docs only
- `node_modules/`, `test-results/` — dev dependencies
- `.cursor/`, `.vercel/` — local tooling

Vercel serves static files from the repository root automatically.
