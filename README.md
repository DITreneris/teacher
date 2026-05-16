# Classroom Prompt Builder

A free, single-page AI prompt builder for K-12 teachers. Pick a mode, fill in a few fields, and copy a ready-made prompt for ChatGPT, Claude, or Gemini. Optional paid PDF guides are sold separately through Stripe-hosted checkout and delivered by secure email links.

| | |
|---|---|
| **Repository** | [github.com/DITreneris/teacher](https://github.com/DITreneris/teacher) |
| **Production** | [promptanatomy.online](https://promptanatomy.online/) |
| **Parent brand** | [promptanatomy.app](https://www.promptanatomy.app/) |
| **Status** | US MVP (v1.0.1) |

## Quick start

```bash
npx serve . -l 3000
```

Open [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

## Documentation

- [`docs/INDEX.md`](docs/INDEX.md) — doc navigation
- [`DEPLOY.md`](DEPLOY.md) — **human + robot deployment reference** (Vercel, DNS, SEO files)
- [`CHANGELOG.md`](CHANGELOG.md) — release notes

## Deployment (summary)

**Hosting:** Vercel, static root plus serverless API routes, no build command.  
**Config:** [`vercel.json`](vercel.json)  
**SEO for crawlers:** [`robots.txt`](robots.txt), [`sitemap.xml`](sitemap.xml), [`humans.txt`](humans.txt)

## Paid PDF fulfillment

The paid guide flow uses Stripe Payment Links for checkout and Vercel API routes for fulfillment:

- `api/stripe-webhook.js` verifies Stripe webhook signatures and sends the buyer a signed download link.
- `api/download.js` validates the signed token and streams the PDF from private storage.
- PDF binaries must not be committed to the public site root. Use private object storage through `PDF_BEGINNERS_SOURCE_URL` and `PDF_ADVANCED_SOURCE_URL`.

Full checklist → **[DEPLOY.md](DEPLOY.md)**

```bash
git remote add origin https://github.com/DITreneris/teacher.git
git push -u origin main
```

## Quality gates

```bash
npm ci
npm test
npm run test:smoke
npm run test:e2e
npm run test:a11y
```
