---
status: active
audience: both
updated: 2026-07-28
---

# Classroom Prompt Builder

A free, single-page AI prompt builder for K-12 teachers. Pick a mode, fill in a few fields, and copy a ready-made prompt for ChatGPT, Claude, or Gemini. Optional paid PDF guides are sold separately through Stripe-hosted checkout and delivered by secure email links.

| | |
|---|---|
| **Repository** | [github.com/DITreneris/teacher](https://github.com/DITreneris/teacher) |
| **Production** | [promptanatomy.online](https://promptanatomy.online/) |
| **Parent brand** | [promptanatomy.app](https://www.promptanatomy.app/) |
| **Status** | US MVP (v1.2.0) |

## Quick start

```bash
npx serve . -l 3000
```

Open [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

## Documentation

- [`docs/INDEX.md`](docs/INDEX.md) — doc navigation + intent → file routing table
- [`docs/roadmap.md`](docs/roadmap.md) — product + GTM ambition / non-gos through 2027-01-01
- [`todo.md`](todo.md) — weekly Discover / Trust now-board (operator scratch)
- [`docs/marketing_plan.md`](docs/marketing_plan.md) — US market & X/Twitter promotion plan (gates, messaging, 30-day calendar)
- [`DEPLOY.md`](DEPLOY.md) — **human + robot deployment reference** (Vercel, DNS, SEO files)
- [`memo_pdf.md`](memo_pdf.md) — Stripe + PDF fulfillment runbook
- [`CHANGELOG.md`](CHANGELOG.md) — release notes

School email outreach is a **separate sibling repo** (`cpb-school-outreach`) and is not required for product deploy. See the repo boundary in [`AGENTS.md`](AGENTS.md); optional operator pointer: [`memo_outreach.md`](memo_outreach.md).

## Deployment (summary)

**Hosting:** Vercel, static root plus serverless API routes, no build command.  
**Config:** [`vercel.json`](vercel.json)  
**SEO for crawlers:** [`robots.txt`](robots.txt), [`sitemap.xml`](sitemap.xml), [`humans.txt`](humans.txt)

## Paid PDF fulfillment

The paid guide flow uses Stripe Payment Links for checkout and Vercel API routes for fulfillment:

- `api/stripe-webhook.js` verifies Stripe webhook signatures and sends the buyer a signed download link.
- `api/download.js` validates the signed token and streams the PDF from private storage (7-day email link).
- `api/download-link.js` returns a short-lived in-page download URL for `success.html` after checkout.
- `api/fulfillment-health.js` — Production env / Redis / Blob probe for operators.
- `success.html` — post-purchase page; polls `/api/download-link` until the webhook completes.
- Commerce URLs and copy live in `config/sot.json` (`commerce`); see [AGENTS.md](AGENTS.md) and `.cursor/rules/`.
- PDF binaries must not be committed to the public site root. Use private object storage through `PDF_BEGINNERS_SOURCE_URL` and `PDF_ADVANCED_SOURCE_URL`.

Full checklist → **[DEPLOY.md](DEPLOY.md)** · Fulfillment runbook → **[memo_pdf.md](memo_pdf.md)**

```bash
git remote add origin https://github.com/DITreneris/teacher.git
git push -u origin main
```

## Quality gates

```bash
npm ci
npm run test:mixed
npm run check:fulfillment   # fulfillment/API changes
```
