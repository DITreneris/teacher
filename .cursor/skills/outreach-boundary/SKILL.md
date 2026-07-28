---
name: outreach-boundary
description: Route school outreach, Railway campaigns, contact mining, marketing Resend, or geo CSV refresh work to the sibling cpb-school-outreach repo. Use when the task mentions outreach, school email, contacts, campaigns, Supabase enrichment, or marketing senders — never implement outreach inside Vercel api/** or Stripe fulfillment.
---

# Outreach boundary (product repo router)

## When to use

- School outreach, Railway, Supabase contacts, campaign send/prep
- Marketing Resend / From `hello@promptanatomy.blog`
- Geo CSV refresh (NJ/NY/OH drops in this repo root)
- Bounce gates, pilot_50, sy2026_followup, W40 waves

## Ordered checklist

1. Confirm the task is outreach (not Stripe PDF fulfillment).
2. Stop editing this product repo for implementation — open sibling:

```text
..\cpb-school-outreach
```

3. Follow sibling `AGENTS.md`, `.cursor/rules/outreach-core.mdc`, and skills (`send-gate`, `mining-cycle`, `outreach-boundary`).
4. **Never** add outreach logic to `api/**`, Stripe webhook/fulfillment, Upstash Redis, Vercel Blob, product `.env`, or transactional Resend.
5. For operator status / UTM / CSV drop pointers only, read [`memo_outreach.md`](../../memo_outreach.md) in this repo — do not treat it as a mining runbook.

## Product-repo allowlist (thin)

- Update `memo_outreach.md` / `changelog_outreach.md` when the operator asks for product-side registry notes.
- Drop official CSVs in this repo root when the operator provides them; run refresh scripts from the sibling.

## Do not

- Merge outreach into Vercel fulfillment paths (see [`scripts/fulfillment-change-control.md`](../../scripts/fulfillment-change-control.md))
- Use fulfillment Resend keys/senders for cold email
- Flip live send from this repo
- Treat outreach as the product north star or a Vercel launch blocker — Active roadmap ([`docs/roadmap.md`](../../docs/roadmap.md)) keeps outreach **parallel / capped**; product priority is teacher discovery (skill `product-roadmap`)
