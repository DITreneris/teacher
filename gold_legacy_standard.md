---
status: active
audience: both
updated: 2026-07-28
---

# Gold Legacy Standard - Classroom Prompt Builder

**Purpose:** Sister-repo / clone checklist — day-to-day agents prefer [`AGENTS.md`](AGENTS.md) + [`docs/STYLEGUIDE.md`](docs/STYLEGUIDE.md) + [`docs/roadmap.md`](docs/roadmap.md).  
**Product:** Classroom Prompt Builder  
**Production:** https://promptanatomy.online/  
**Repository:** https://github.com/DITreneris/teacher  
**Current gold baseline:** v1.2.0, July 2026  
**Audience:** sister repos adopting this stack; operators freezing a gold baseline.

This document freezes the current best version of the repo and site as the reference standard for handoff. If future work changes these principles, update this file together with the code, tests, and docs it references.

## 1. Product Standard

Classroom Prompt Builder is a free, no-account, single-page prompt builder for US K-12 teachers.

The free product must keep these invariants:

- Product copy is en-US.
- Primary user is a US K-12 teacher or instructional coach.
- The site does not call an AI API.
- Prompt work happens in-browser until the teacher copies text into ChatGPT, Claude, Gemini, or another tool.
- Saved sessions use browser `localStorage`.
- The five canonical modes are `LESSON`, `ASSESSMENT`, `TASKS`, `PRESENTATION`, and `STRATEGY`.
- The product promise is classroom readiness, not AI hype or guaranteed time savings.

Core files:

- `index.html`
- `generator.js`
- `copy.js`
- `style.css`
- `config/sot.json`

## 2. Source Of Truth Standard

`config/sot.json` is the source of truth for brand, mode labels, library prompts, rules, theme colors, PDF guide metadata, commerce copy, buyer FAQ, Stripe Payment Links, pricing, testimonials, and legal operator metadata.

Do not hardcode new commerce or buyer-facing marketing copy in HTML if a SOT section already exists.

Use SOT sections as follows:

- `brand` - product name, edition, positioning.
- `colors` and `theme` - brand palette and runtime theme tokens.
- `copy` - hero copy.
- `modes` - mode labels, descriptions, form IDs, fields.
- `libraryPrompts` - reusable prompt templates.
- `rules` - prompt quality principles.
- `pdfGuides` - paid guide chapter lists.
- `commerce` - Stripe URLs, pricing, delivery promise, compare strip, testimonials.
- `buyerFaq` - buyer FAQ and JSON-LD mirror.
- `legal` - operator line and address metadata.

Any sister repo should copy this pattern before adding new config files.

## 3. Design System Standard

Living DS truth: [`docs/STYLEGUIDE.md`](docs/STYLEGUIDE.md) (DS 2.1.0) + `style.css` + `config/sot.json` theme. Icons: self-hosted Lucide in `assets/icons.svg` via `icons.js` — no CDN.

Invariants for sister clones (details in STYLEGUIDE):

- Self-hosted fonts only (`Inter`, `JetBrains Mono`); no Google Fonts CDN.
- New `.pdf-*` / `.ops-*` UI needs `@media (max-width: 480px)`, touch ≥44px, no overflow at 320/375, dialogs `100dvh`.
- Archived audit snapshots (do not edit): `docs/archive/design-system-audit_2026-07.md`, `docs/archive/design-system-audit_2026-05.md`.

## 4. Frontend Flow Standard

The homepage flow is:

1. Hero introduces the free builder.
2. `#operationsCenter` is the primary work area.
3. Teacher selects grade and mode.
4. Form data generates a prompt into `#opsOutput`.
5. Teacher copies the prompt.
6. Optional local saved sessions preserve recent work.
7. Optional paid PDF guide section supports the free tool.

Frontend invariants:

- Keep `main#main-content`, skip link, live regions, and tab semantics.
- Keep mode tabs keyboard navigable.
- Keep output copy resilient with clipboard fallback.
- Keep saved sessions capped and restorable as currently tested.
- Keep mobile journey simple: on mobile, in-section progress is canonical; desktop/tablet may show richer stepper UI.

## 5. Paid PDF Commerce Standard

The paid PDFs are optional upsells, not required for the free tool.

Current products:

- Beginners - Prompt Anatomy, `$4.99`
- Advanced - Prompt Anatomy, `$9.99`

Commerce invariants:

- Stripe checkout uses Payment Links, not a custom cart.
- `config/sot.json#commerce.stripePaymentLinks` holds the live URLs.
- `commerce.allowPlaceholderCheckout` must be `false` in production.
- `index.html` must keep static `https://buy.stripe.com/...` href fallbacks for no-JS and pre-hydration checkout.
- `generator.js` must hydrate commerce from SOT, but checkout must still work before SOT fetch completes.
- Buyer copy must avoid overclaims:
  - no "under 60 seconds"
  - no fake precise PD price comparison like `~ $149`
  - no anonymous quotes presented as named endorsements
  - no guaranteed time-saving claims

Trust layer standard:

- Real cover images with explicit dimensions.
- WebP siblings for covers and preview pages.
- Watermarked 3-page preview.
- Classroom License linked to `terms.html#paid-pdf-license`.
- 14-day no-questions refund repeated in card, success page, email, and terms.
- Buyer FAQ mirrored in JSON-LD.

## 6. Fulfillment Standard

Paid PDF fulfillment uses:

- Stripe Payment Links
- `api/stripe-webhook.js`
- `api/_lib/fulfillment.js`
- Upstash Redis
- Vercel Blob private PDF storage
- Resend transactional email
- `api/download.js`
- `api/download-link.js`
- `success.html`
- `api/fulfillment-health.js`

Golden rule:

The Stripe Payment Link success URL, Stripe webhook URL, Vercel Production env, Redis store, and download APIs must all belong to the same buyer-facing production host.

For this repo, that host is:

```text
https://promptanatomy.online
```

Never point the webhook at `promptanatomy.app` while buyers return to `promptanatomy.online`.

Required fulfillment env set:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_BEGINNERS_PDF`
- `STRIPE_PRICE_ADVANCED_PDF`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `DOWNLOAD_TOKEN_SECRET`
- `RESEND_API_KEY`
- `FULFILLMENT_FROM_EMAIL`
- `PDF_BEGINNERS_SOURCE_URL`
- `PDF_ADVANCED_SOURCE_URL`
- `BLOB_READ_WRITE_TOKEN`
- `SITE_URL`

Product mapping priority:

1. Payment Link metadata `product=beginners|advanced`
2. Stripe Price IDs from env
3. Line-item amount
4. Session amount fallback

Download-token standard:

- Email link default TTL: 7 days.
- In-page success link default TTL: 15 minutes.
- Download route validates HMAC token, active Redis token, and fulfilled purchase state.
- Paid PDFs must not be committed to public site root.

## 7. Legal And Trust Standard

Legal pages are active product surfaces:

- `privacy.html`
- `terms.html`

They must stay en-US and aligned with current product behavior.

Current trust posture:

- No account required.
- No AI API is called by the site.
- Prompt builder uses browser-local workflow.
- Purchases are handled by Stripe.
- Delivery email is handled by Resend.
- Fulfillment state and tokens use Redis.
- Paid PDFs are delivered by secure, time-limited links.
- Teacher remains responsible for reviewing AI output before classroom use.

Before paid promotion, preserve or update:

- Legal operator line.
- Postal address.
- Classroom License.
- Refund clause.
- Responsible AI disclaimer.
- Provider disclosures.

## 8. SEO, GEO, And AI Visibility Standard

The current repo has a strong crawler and AI-discovery layer. Preserve it.

Canonical files:

- `robots.txt`
- `sitemap.xml`
- `humans.txt`
- `llms.txt`
- `llms-full.txt`
- `.well-known/security.txt`
- `manifest.webmanifest`
- `og-image.png`
- `apple-touch-icon.png`
- `404.html`

SEO/GEO invariants:

- Public pages use `lang="en-US"`.
- Canonical URLs use `.html` where applicable.
- `vercel.json` keeps `cleanUrls: false`.
- Public pages include JSON-LD.
- Homepage includes Organization, WebSite, SoftwareApplication, FAQPage, Product/Offer, and HowTo style signals where relevant.
- Legal pages include WebPage and BreadcrumbList graph nodes.
- `llms.txt` and `llms-full.txt` are part of the AI/search handoff.
- `og-image.png` is generated from `scripts/generate-og-image.js`; do not hand-edit it.
- If public HTML changes, run `npm run sitemap:update`.

## 9. Security And Deployment Standard

Hosting model:

- Vercel
- Static root
- Serverless API routes under `api/`
- No build command

Security headers live in `vercel.json`.

Current standards:

- HSTS enabled.
- API routes use `Cache-Control: private, no-store`.
- API routes set `X-Robots-Tag: noindex, nofollow`.
- HTML pages use must-revalidate cache.
- Static assets use immutable caching.
- CSP is currently Report-Only; enforcement is a deliberate future gate.
- Never commit `.env`, secrets, private PDF binaries, API keys, or credentials.

## 10. Documentation Standard

`docs/INDEX.md` is the documentation navigation authority.

Only docs listed in `docs/INDEX.md` are canonical. Operator scratch files (`todo.md`, `memo_pdf.md`, `memo_outreach.md`, `changelog_outreach.md`) may exist outside INDEX.

Core active docs (must match `docs/INDEX.md` Active sections):

- `README.md`
- `docs/INDEX.md`
- `AGENTS.md`
- `DEPLOY.md`
- `CHANGELOG.md`
- `gold_legacy_standard.md`
- `docs/STYLEGUIDE.md`
- `docs/roadmap.md`
- `docs/marketing_plan.md`

Operator / sibling runbooks (INDEX navigation only — not lean-active):

- `todo.md`
- `memo_pdf.md`
- `docs/mobile-prelaunch-audit_2026-07.md`
- `memo_outreach.md`
- `changelog_outreach.md`
- `docs/outreach_experience_memo_2026-05-17.md`

## 11. Sister Repo Boundary

This repo is the Vercel product and PDF fulfillment repo.

It owns:

- `promptanatomy.online`
- static product UI
- Stripe checkout and webhook fulfillment
- Upstash Redis fulfillment state
- Vercel Blob PDF storage
- Resend transactional delivery
- product/legal/SEO/GEO surfaces

The school outreach system is a sibling repo:

```text
..\cpb-school-outreach
```

Outreach repo owns:

- Railway deploy
- Supabase Postgres
- contact enrichment
- campaign sending
- marketing Resend on `news.promptanatomy.online`

Do not add outreach logic to this repo's `api/**`, Stripe fulfillment, Upstash, Blob, Vercel env, or transactional email paths.

## 12. Quality Gates

Canonical change-type → test matrix: [`AGENTS.md`](AGENTS.md) § Quality gates.  
CI: `npm run test:mixed`, then `test:webkit` and `test:lighthouse`. Mobile scorecard: [docs/mobile-prelaunch-audit_2026-07.md](docs/mobile-prelaunch-audit_2026-07.md).

Minimum acceptance for gold baseline:

- Structural + smoke (320/375/768) + e2e core-flow + mobile PDF commerce pass.
- Pa11y reports no blocking a11y issues.
- Stripe CTA hrefs are live `buy.stripe.com` links; no public paid PDF binaries committed.
- Fulfillment health reports complete env in production.

## 13. Drift Checklist

Before merging changes, ask:

- Did we edit SOT instead of hardcoding copy?
- Did product copy stay en-US and teacher-specific?
- Did any commerce claim become harder to prove?
- Do Stripe success URL, webhook URL, Redis, and `SITE_URL` still share one production host?
- Do no-JS Stripe href fallbacks still work?
- Did new `.pdf-*` or `.ops-*` UI get 480px mobile rules?
- Did public HTML changes update sitemap and JSON-LD freshness?
- Did legal, success page, email, and commerce card copy stay aligned?
- Did the change stay inside this repo's product/fulfillment boundary?
- Did the right quality gates run?

## 14. Current Known Follow-Ups

These are not blockers to the gold baseline, but should not be forgotten:

- Automatic Stripe refund webhook revocation is not implemented.
- CSP is still Report-Only.
- Real named testimonials are still needed before stronger paid promotion.
- Compare-strip exact PD price needs a source before using exact-dollar claims.
- Local private PDF filenames should be reconciled with fulfillment fallback names.
- Full `light-dark()` token migration remains deferred (see `todo.md` Parked eng).

## 15. Sister Repo Adoption Template

When a sister repo adopts this standard, copy the pattern, not the brand literals.

Required decisions:

```text
PROJECT:
BUYER_DOMAIN:
PRIMARY ICP:
PRODUCT LANGUAGE:
FREE WEDGE:
PAID PRODUCTS:
PAYMENT PROVIDER:
FULFILLMENT STORAGE:
TRANSACTIONAL EMAIL DOMAIN:
MARKETING EMAIL DOMAIN:
LEGAL CONTACT:
SUPPORT CONTACT:
```

Minimum copied practices:

- SOT JSON for brand, copy, commerce, FAQ, legal metadata.
- Same-domain checkout/webhook/success/Redis rule.
- Static checkout fallbacks.
- Private paid assets.
- Signed download links.
- Health endpoint.
- Active docs index.
- Quality-gate matrix.
- Mobile overflow tests.
- A11y tests.
- SEO/GEO files.
- Clear repo boundary between product fulfillment and outreach.
