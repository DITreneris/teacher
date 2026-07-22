# Outreach stack memo (parallel to Vercel fulfillment)

**Audience:** Operators and agents. Not indexed in [docs/INDEX.md](docs/INDEX.md).

## Two systems — do not merge

| System | Host | Database | Resend |
|--------|------|----------|--------|
| **PDF fulfillment** | Vercel `promptanatomy.online` | Upstash Redis | Transactional (`FULFILLMENT_FROM_EMAIL`) |
| **School outreach** | Railway | Supabase Postgres | Marketing (`OUTREACH_FROM_EMAIL` → **`hello@promptanatomy.blog`**) |

Outreach repo: **[github.com/DITreneris/outreach](https://github.com/DITreneris/outreach)** (local clone: sibling folder `cpb-school-outreach/`).

Fulfillment code paths are **change-controlled** while outreach is active: do not add outreach logic to `api/_lib/fulfillment.js`, `api/stripe-webhook.js`, or Vercel env used for Stripe/Upstash.

## Current status (2026-07-22)

- `pilot_50`: **paused** / `dry_run=true`; W39 rewarm done (**NY50am** / **OH50aw**, both ~**6%** bounce).
- Follow-up campaign: **`sy2026_followup`** seeded; F1 selection at `docs/sy2026_followup_f1_batch`; live after Railway deploy of `prior_sent` (~Aug 5–20).
- Sender: **`hello@promptanatomy.blog`**.
- Hold **NJ** until Homeroom/pool refresh; hold aggressive **TX**.
- Privacy: product [`privacy.html`](privacy.html) discloses school outreach + separate Resend marketing sender.

Runbook: `..\cpb-school-outreach\docs\pilot_sy2026_followup_runbook.md`.  
Registry: [changelog_outreach.md](changelog_outreach.md).

## Vercel P0 before first outreach send

**Done (2026-05-19):** [todo.md](todo.md) §1b–§2 verified — live fulfillment on `promptanatomy.online`. For regressions, run locally:

```bash
npm test
npm run check:fulfillment   # if Upstash env present locally
```

## Resend split

- Fulfillment: existing domain/sender on Vercel.
- Outreach: current From `hello@promptanatomy.blog` (prior domains: `.online` / `.help` / `.ceo` / `.info` / `.cloud`); webhook → Railway `POST /webhooks/resend`.
- Prefer a separate Resend API key for outreach in Railway env only.

## UTM for campaigns

`https://promptanatomy.online/?utm_source=email&utm_medium=outreach&utm_campaign=<slug>`

| Campaign | `utm_campaign` |
|----------|----------------|
| First-touch | `school_pilot_50_2026` (campaign slug `pilot_50`) |
| Follow-up | `sy2026_followup` |

See [docs/marketing_plan.md](docs/marketing_plan.md) for messaging rules (no unsourced time-savings claims in email body).

## Contact target

Focus: **send-ready principal** quality and per-state batch pools. Large `ready` remainder after W38 (NY / NJ / OH / TX — see [changelog_outreach.md](changelog_outreach.md) pool snapshot). Follow-up selects from `send_log` prior `pilot_50` **sent**, not by flipping status back to `ready`.

## Weekly geo refresh (NY / NJ / OH)

Drop fresh operator CSVs in **this repo root** (`NJPubSchool.csv`, NY CEO CSV, OH OEDS report), then in `cpb-school-outreach`:

```powershell
.\scripts\run_geo_official_refresh.ps1
```

Runbook: `..\cpb-school-outreach\docs\mining_cycle_runbook.md`. Catalog CSVs to ignore: `..\cpb-school-outreach\data\OPERATOR_CATALOG_IGNORE.md`.

## Four-state wave preflight (NY / NJ / OH / TX)

Before prep + live on `.blog`, run in `cpb-school-outreach`:

```powershell
.\scripts\run_geo_wave_preflight.ps1
```

Covers bounce-domain file refresh, `unsendable_ready`, principal pool counts, and `verify_blog_from` (From `@promptanatomy.blog` + `pilot_50` personal copy). Live first-touch scripts auto-check cohort completion via `assert_batch_cohort.py`. Gate: `..\cpb-school-outreach\docs\promptanatomy_blog_sender_gate.md`.

Follow-up live: `.\scripts\run_sy2026_followup_f1_prep.ps1` then `.\scripts\run_sy2026_followup_f1_live.ps1` (selection + `eligibility=prior_sent`; no quarantine).

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
