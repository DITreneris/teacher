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
- [ ] [Bing Webmaster Tools](https://www.bing.com/webmasters) — add site, submit `https://promptanatomy.online/sitemap.xml`
- [ ] Google Search Console — URL Inspection for `https://promptanatomy.online/` (request indexing after SEO metadata deploy)
- [ ] Social preview sanity (after `og-image.png` deploy):
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — Scrape Again for `https://promptanatomy.online/`
  - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator) — verify `summary_large_image` renders the new headline + brand row without clipping
  - Slack / Discord — paste the URL, verify the navy preview thumbnail (no broken glyph in upper-left, URL fully visible in lower-left)
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) — `SoftwareApplication` + both `FAQPage` entities on home URL
- [ ] CSP remains `Content-Security-Policy-Report-Only` until one week of clean production reports; then promote to enforcing `Content-Security-Policy` in `vercel.json` (see [todo.md](todo.md) §7)

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
| `og-image.png` | `/og-image.png` | 1200 x 630 social preview (target &lt; 300 KB). Canonical generator: `npm run generate:og` (Satori + sharp, hydrated from `config/sot.json` brand colors + a static minimal layout). `npm run build:social` runs the generator then `optimize:social` as a size-budget safety net. Regenerate after any change to `sot.colors.deepBlue`, `primaryYellow`, the brand wordmark, or `scripts/generate-og-image.js`. Served with `Cross-Origin-Resource-Policy: cross-origin` so Facebook / LinkedIn / X / Slack can embed it. |
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
| `SITE_URL` | Yes | Canonical site URL used in emailed download links. Use `https://promptanatomy.online`. |
| `PDF_BEGINNERS_SOURCE_URL` | Yes | Private storage URL for the Beginners PDF. |
| `PDF_ADVANCED_SOURCE_URL` | Yes | Private storage URL for the Advanced Educators PDF. |
| `BLOB_READ_WRITE_TOKEN` | Yes | Required for server-side reads from private Vercel Blob PDF URLs. |
| `PDF_SOURCE_AUTH_TOKEN` | If needed | Bearer token for private PDF source fetches. |
| `PDF_SOURCE_AUTH_HEADER` | If needed | Custom private-source auth header in `Header-Name: value` format. |
| `DOWNLOAD_TOKEN_TTL_SECONDS` | Optional | Defaults to 7 days (long-lived email download link). |
| `IN_PAGE_DOWNLOAD_TOKEN_TTL_SECONDS` | Optional | Defaults to 15 minutes (short-lived in-page download link surfaced on `success.html`). |
| `FULFILLMENT_STATE_TTL_SECONDS` | Optional | Defaults to 90 days. |

### Stripe setup

1. Create two Stripe Products / Prices: Beginners PDF Guide (`$4.99`) and Advanced Educators PDF Guide (`$9.99`).
2. Create one Payment Link per product and paste those URLs into [`config/sot.json`](config/sot.json) under `commerce.stripePaymentLinks.beginners` / `.advanced`. Then flip `commerce.allowPlaceholderCheckout` to `false` so `npm test` enforces the publish gate (no `YOUR_` placeholders, must match `https://buy.stripe.com/`). `index.html` keeps static `buy.stripe.com` `href` fallbacks for no-JS and pre-hydration checkout; `generator.js` `initCommerce()` re-hydrates those CTAs from SOT at runtime.
   - On **each** Payment Link, add **Metadata**: key `product`, value `beginners` or `advanced` (Stripe Dashboard → Payment Link → Additional options → Metadata). This is the most reliable product mapping for fulfillment.
   - Copy each Payment Link's **Price ID** (`price_...`) into Vercel as `STRIPE_PRICE_BEGINNERS_PDF` / `STRIPE_PRICE_ADVANCED_PDF`. If these env vars are missing or point at a different Price than the Payment Link uses, the webhook cannot match the product unless metadata or the `$4.99` / `$9.99` amount fallback applies.
3. **Set the success URL** on each Payment Link (Stripe Dashboard → Payment Link → After payment → "Don't show confirmation page → Redirect customers to your website") to:
   ```
   https://promptanatomy.online/success.html?session_id={CHECKOUT_SESSION_ID}
   ```
   The `{CHECKOUT_SESSION_ID}` literal is replaced by Stripe with the real session id and consumed by `success.html`.
4. **Enable Stripe receipts** for both products (Stripe Dashboard → Settings → Customer emails → Successful payments → ON). Optionally enable invoice creation on the Payment Link if you want a paid invoice PDF in addition to the receipt.
5. Add a live webhook endpoint for **`https://promptanatomy.online/api/stripe-webhook`** (not `promptanatomy.app` unless that domain is the **same** Vercel project and shares the same Redis env vars).
6. Subscribe to `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
7. Use Stripe CLI locally to forward events when testing webhook changes.

**Critical:** Payment Links redirect buyers to `promptanatomy.online/success.html` and the download API is `promptanatomy.online/api/download-link`. Fulfillment state is stored in the **promptanatomy.online** Vercel project's Redis. A webhook pointing at `https://www.promptanatomy.app/api/stripe-webhook` (or any other host) will return `200` but the buyer will still see *"We could not find this checkout session"* on `.online` because that deployment never wrote `fulfillment:cs_...`.

### PDF storage (Vercel Blob — recommended)

1. Vercel → **Storage** → **Create Database / Store** → **Blob** → connect to the **promptanatomy.online** project (`BLOB_READ_WRITE_TOKEN` is added automatically).
2. Locally, add `BLOB_READ_WRITE_TOKEN` to `.env` (or run `vercel env pull`).
3. Generate PDFs and upload:

```bash
npm run pdf:export
npm run pdf:upload-blob
```

4. Paste printed `PDF_BEGINNERS_SOURCE_URL`, `PDF_ADVANCED_SOURCE_URL`, and `BLOB_READ_WRITE_TOKEN` into Vercel **Production** env, then redeploy.

Private Blob URLs require `BLOB_READ_WRITE_TOKEN` when the webhook fetches PDFs (handled in `api/_lib/fulfillment.js`).

Production PDFs must not live in the public site root. Local-only copies may sit in `api/_private/pdfs/` (gitignored).

### Troubleshooting: paid but no PDF / `success.html` says "could not find this checkout session"

This means the Stripe webhook never wrote `fulfillment:cs_...` to **promptanatomy.online's** Redis (or used the wrong Stripe mode). The buyer still paid; fix fulfillment and **replay** the event.

**First check:** Stripe → Webhooks → which URL received `checkout.session.completed`? If it is `promptanatomy.app` (or any host other than `promptanatomy.online`), add a second endpoint for `https://promptanatomy.online/api/stripe-webhook`, paste its signing secret into the **promptanatomy.online** Vercel env as `STRIPE_WEBHOOK_SECRET`, then **Resend** the event to the `.online` endpoint.

1. **Stripe Dashboard → Developers → Webhooks** → your `https://promptanatomy.online/api/stripe-webhook` endpoint → open the `checkout.session.completed` event. Read the response body (`fulfillment` or `detail` field) and HTTP status. A `200` with only `{ "received": true }` and no `fulfillment` field on the **wrong host** does not help `.online`.
2. **Vercel → Project → Settings → Environment Variables** (Production): confirm all of `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_BEGINNERS_PDF`, `STRIPE_PRICE_ADVANCED_PDF`, `DOWNLOAD_TOKEN_SECRET`, `RESEND_API_KEY`, `FULFILLMENT_FROM_EMAIL`, `UPSTASH_REDIS_REST_*`, `PDF_BEGINNERS_SOURCE_URL`, `PDF_ADVANCED_SOURCE_URL`, `BLOB_READ_WRITE_TOKEN`, and `SITE_URL=https://promptanatomy.online` are set. `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` must be **live** keys if the Payment Link is live (not test).
3. **Payment Link metadata**: each link should have `product` = `beginners` or `advanced`.
4. **Resend**: domain/sender `FULFILLMENT_FROM_EMAIL` must be verified; check Resend dashboard for bounces.
5. After fixing env/metadata, **Replay** the event in Stripe (Webhooks → event → Resend). Or run locally: `stripe events resend evt_...`.
6. **Manual buyer support**: email `info@promptanatomy.app` with the buyer's address and the `session_id` from `success.html?session_id=cs_...` after replay succeeds.

---

## Quality gates before push

```bash
npm ci
npm run test:mixed
```

Equivalent explicit local gates:

```bash
npm test
npm run test:smoke
npm run test:e2e
npm run test:a11y
```

For fulfillment/API changes, also run:

```bash
npm run check:fulfillment
```

If `config/sot.json#colors` (deepBlue / primaryYellow) or the OG layout in `scripts/generate-og-image.js` changed in this commit, also run:

```bash
npm run build:social
```

and commit the regenerated `og-image.png`. The static structure tests enforce 1200x630 + ≤300 KB but do not auto-regenerate.

If `index.html`, `privacy.html`, or `terms.html` changed in this commit, also run:

```bash
npm run sitemap:update
```

and commit the regenerated `sitemap.xml` (and bumped `index.html` `dateModified`). The script is idempotent — re-running with no file mtime changes is a no-op.

---

## What is NOT deployed

- `docs/archive/` — historical docs only
- `node_modules/`, `test-results/` — dev dependencies
- `.cursor/`, `.vercel/` — local tooling

Vercel serves static files from the repository root automatically.
