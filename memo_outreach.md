---
status: ops
audience: both
updated: 2026-07-28
---

# Outreach stack memo (parallel to Vercel fulfillment)

**Purpose:** Split-system pointer (Vercel product vs Railway outreach) — not a mining runbook and not Active product doctrine.  
**Audience:** Operators and agents. Listed under [docs/INDEX.md](docs/INDEX.md) Operator runbooks (not Active).

## Two systems — do not merge

| System | Host | Database | Resend |
|--------|------|----------|--------|
| **PDF fulfillment** | Vercel `promptanatomy.online` | Upstash Redis | Transactional (`FULFILLMENT_FROM_EMAIL`) |
| **School outreach** | Railway | Supabase Postgres | Marketing (`OUTREACH_FROM_EMAIL` → **`hello@promptanatomy.blog`**) |

Outreach repo: **[github.com/DITreneris/outreach](https://github.com/DITreneris/outreach)** (local clone: sibling folder `cpb-school-outreach/`).

Fulfillment code paths are **change-controlled** while outreach is active: do not add outreach logic to `api/_lib/fulfillment.js`, `api/stripe-webhook.js`, or Vercel env used for Stripe/Upstash.

## Current status (2026-07-28)

- `pilot_50`: **paused** / `dry_run=true` (last first-touch **W39** NY50am / OH50aw).
- Follow-up **`sy2026_followup`**: **paused** / `dry_run=true` after **F1–F45** (**2250** sends). NJ/TX/MA/MI/MN/OH prior_sent remnants all &lt;50 — do not ship remnants.
- Sender: **`hello@promptanatomy.blog`**.
- **Cool-down:** 48h from F45 pause (~**2026-07-28 12:38 UTC** → earliest live **~2026-07-30 12:38 UTC**).
- **Next:** Track A — geo refresh + **W40** `ny50an` / `oh50ax` (50–100/day). Track B — GA Open Records → `run_ga_import.ps1` → **ga50** on a **separate** day. See [changelog_outreach.md](changelog_outreach.md).
- Privacy: product [`privacy.html`](privacy.html) discloses school outreach + separate Resend marketing sender.

Runbooks: `..\cpb-school-outreach\docs\pilot_sy2026_followup_runbook.md`, `..\cpb-school-outreach\docs\pilot_ga50_runbook.md`, `..\cpb-school-outreach\docs\ga_open_records_request.md`.  
Registry: [changelog_outreach.md](changelog_outreach.md).

## Vercel P0 before first outreach send

**Done (2026-05-19):** live fulfillment verified on `promptanatomy.online` (see [DEPLOY.md](DEPLOY.md) / [memo_pdf.md](memo_pdf.md)). For regressions, run locally:

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

Focus: **send-ready principal** quality and per-state batch pools. Large `ready` remainder for NY / NJ / OH / TX (see [changelog_outreach.md](changelog_outreach.md) pool snapshot). Follow-up selects from `send_log` prior `pilot_50` **sent**, not by flipping status back to `ready`.

Georgia: public address CSV is **catalog_only** (no email). Principal emails via Open Records → `ga_contacts_raw.csv` → `run_ga_import.ps1` (see `docs/ga_open_records_request.md` in outreach repo).

## Weekly geo refresh (NY / NJ / OH)

Drop fresh operator CSVs in **this repo root** (`NJPubSchool.csv`, NY CEO CSV, OH OEDS report), then in `cpb-school-outreach`:

```powershell
.\scripts\run_geo_official_refresh.ps1
```

Optional GA contacts copy when `ga_contacts_raw.csv` is in this root: same script with `-IncludeGA`, or automatic copy via `_geo_main_repo.ps1`.

Runbook: `..\cpb-school-outreach\docs\mining_cycle_runbook.md`. Catalog CSVs to ignore: `..\cpb-school-outreach\data\OPERATOR_CATALOG_IGNORE.md`.

## Four-state wave preflight (NY / NJ / OH / TX [+ GA when active])

Before prep + live on `.blog`, run in `cpb-school-outreach`:

```powershell
.\scripts\run_geo_wave_preflight.ps1
```

Covers bounce-domain file refresh, `unsendable_ready`, principal pool counts, and `verify_blog_from` (From `@promptanatomy.blog` + `pilot_50` personal copy). Live first-touch scripts auto-check cohort completion via `assert_batch_cohort.py`. Gate: `..\cpb-school-outreach\docs\promptanatomy_blog_sender_gate.md`.

W40 wrappers: `run_ny50an_prep.ps1` / `run_oh50ax_live.ps1` (after cool-down).  
Follow-up live: only after new first-touch creates ≥50 `prior_sent` (F46+); do not ship remnant &lt;50.

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
