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

**Done (2026-05-19):** [todo.md](todo.md) §1b–§2 verified — live fulfillment on `promptanatomy.online`. For regressions, run locally:

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

## Contact target (2026-05)

Active collection goal: **1000** `ready` contacts (`cpb-outreach enrich-contacts --target 1000`, `check-readiness --target 1000`). Pilot send caps stay on `pilot_50` until operator flips `dry_run`.

## First 500 contacts (minimum pilot pool)

Use official state education directory exports before NCES website scraping. Each
`ready` contact should have a unique organizational email, role/title context,
source metadata, syntax/MX verification, and no suppression match.

Recommended source order:

1. Virginia DOE principal contact CSV.
2. Texas TEA AskTED personnel export.
3. California CDE School Directory Export.
4. Minnesota / Ohio official organization-contact extracts where practical.
5. NCES website scraping only as fallback.

Before live send, run outreach diagnostics and `cpb-outreach check-readiness --slug pilot_50 --target 500`.
