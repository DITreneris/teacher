---
name: pdf-fulfillment
description: Diagnose and fix Stripe PDF fulfillment on Classroom Prompt Builder (Vercel). Use when webhook fails, success.html shows session not found, no Resend email, domain mismatch (.app vs .online), or env misconfiguration.
---

# PDF fulfillment ops (Prompt Anatomy)

## When to use

- Buyer paid but no PDF / no email
- `success.html`: "We could not find this checkout session"
- Webhook returns 200 on one domain but buyer landed on another
- Before announcing paid PDFs on a new host

## Golden rule

**Same production host** for:

1. Payment Link success URL (`https://YOUR_DOMAIN/success.html?session_id={CHECKOUT_SESSION_ID}`)
2. Stripe webhook (`https://www.promptanatomy.online/api/stripe-webhook`)
3. Vercel Production env + Upstash Redis for that project

`.app` webhook + `.online` redirect = empty fulfillment lookup.

## Ordered checklist

1. Confirm buyer domain matches Vercel project (e.g. `www.promptanatomy.online`).
2. Stripe Dashboard: webhook on **that** domain only; events `checkout.session.completed`.
3. Vercel Production: full env set per `memo_pdf.md` §3 and `DEPLOY.md` (all or nothing).
4. `GET /api/fulfillment-health` → `ok: true`, `missing: []`.
5. Payment Link metadata: `product` = `beginners` | `advanced`.
6. Test `STRIPE_SECRET_KEY` with a real `cs_*` retrieve (signature verify is not enough).
7. After fix: **Replay** the Stripe event — do not re-charge the buyer.

## Product mapping priority

`metadata.product` → `STRIPE_PRICE_*` env → `amount_total` 499/999 cents. Never production with amount-only.

## Anti-patterns

- Partial env (some keys set → 500 or silent failure)
- Webhook signing secret from a different endpoint URL
- Expecting fulfillment on `.online` while webhook hits `.app`

## Repo references

- [`memo_pdf.md`](../../memo_pdf.md) — full deployment memo
- [`DEPLOY.md`](../../DEPLOY.md) — post-deploy checklist
- [`api/fulfillment-health.js`](../../api/fulfillment-health.js) — health probe
- [`tests/structure.test.js`](../../tests/structure.test.js) — fulfillment structure asserts
- Rule: [`.cursor/rules/cpb-fulfillment.mdc`](../rules/cpb-fulfillment.mdc)

## Commands

```bash
npm test
npm run check:fulfillment
```
