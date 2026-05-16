# Outreach stack memo (parallel to Vercel fulfillment)

**Audience:** Operators and agents. Not indexed in [docs/INDEX.md](docs/INDEX.md).

## Two systems — do not merge

| System | Host | Database | Resend |
|--------|------|----------|--------|
| **PDF fulfillment** | Vercel `promptanatomy.online` | Upstash Redis | Transactional (`FULFILLMENT_FROM_EMAIL`) |
| **School outreach** | Railway | Supabase Postgres | Marketing (`OUTREACH_FROM_EMAIL` on `news.promptanatomy.online`) |

Outreach repo: **[github.com/DITreneris/outreach](https://github.com/DITreneris/outreach)** (local clone: sibling folder `cpb-school-outreach/`).

Fulfillment code paths are **change-controlled** while outreach is active: do not add outreach logic to `api/_lib/fulfillment.js`, `api/stripe-webhook.js`, or Vercel env used for Stripe/Upstash.

## Vercel P0 before first outreach send

Complete [todo.md](todo.md) §1b (Production env on `.online`) and §2 (Stripe test-mode E2E + refund). Run locally:

```bash
npm test
npm run check:fulfillment   # if Upstash env present locally
```

## Resend split

- Fulfillment: existing domain/sender on Vercel.
- Outreach: verify `news.promptanatomy.online` (or chosen subdomain) in Resend; webhook → Railway `POST /webhooks/resend`.
- Prefer a separate Resend API key for outreach in Railway env only.

## UTM for campaigns

`https://promptanatomy.online/?utm_source=email&utm_medium=outreach&utm_campaign=<slug>`

See [docs/marketing_plan.md](docs/marketing_plan.md) for messaging rules (no unsourced time-savings claims in email body).
