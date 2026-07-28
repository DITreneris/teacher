---
status: ops
audience: both
updated: 2026-07-28
---

# Outreach Experience Memo — 2026-05-17

**Purpose:** Sibling-repo contact-acquisition lessons — Operator navigation only, not Active product doctrine.  
**Audience:** operators, agents, and humans joining the project later.

This memo documents what we tried, what worked, what failed, and where the outreach system stands now.

## Executive Summary

We built and deployed a separate school outreach bot for Classroom Prompt Builder. The Railway deployment works; the main blocker is not deployment. The blocker is contact acquisition: the current district-only scraper finds too few unique, sustainable contacts to reliably reach 500 ready contacts quickly.

The most important operational rule:

**The outreach bot is separate from the Vercel deployment. Do not merge these systems.**

**Update 2026-05-27 (mining v4):** OH OEDS all-grades import (+2174 ready, OH principal **761**); MA DESE re-import (principal **250**). Total principal **14,318** (+2308). NY SEDREF tooling ready — operator COGNOS CSV still required. VA gap-fill smoke **0%** — STOP bulk scrape. See [`changelog_outreach.md` §0.2.0](../changelog_outreach.md#020---2026-05-26).

**Update 2026-05-23:** Official-first mining v2 validated at scale. Pool is now **~13.5k `ready` / ~8.5k `principal`** (was ~161 ready at district-only scrape pivot). Contact acquisition blocker is largely solved for principal-grade geo sends; remaining work is **send discipline** (bounce gates, role quality) and **targeted official imports** (NY SEDREF, OH non-HS pass), not bulk website scrape.

| System | Host | Database | Email | Purpose |
| --- | --- | --- | --- | --- |
| Product + PDF fulfillment | Vercel `promptanatomy.online` | Upstash Redis + Vercel Blob | Transactional fulfillment email | User-facing site, Stripe checkout, paid PDF delivery |
| School outreach bot | Railway `outreach-production-618a.up.railway.app` | Supabase Postgres | Resend marketing sender on `news.promptanatomy.online` | School contact collection and pilot outreach |

Do not add outreach logic to Vercel `api/**`, Stripe fulfillment, Upstash, or production PDF delivery paths.

## Current Situation

Local outreach repo:

```text
c:\Users\tomas\Desktop\Python Mokymai\cpb-school-outreach
```

Main product repo:

```text
c:\Users\tomas\Desktop\Python Mokymai\06_DI_Operacine_sistema_mokytojui
```

Outreach repository:

```text
https://github.com/DITreneris/outreach
```

Railway API:

```text
https://outreach-production-618a.up.railway.app/
```

Deployment status:

- Railway build/deploy/healthcheck works.
- `/` and `/health` are alive when environment variables are set.
- **Official state directory imports** are the production contact acquisition path (2026-05-23).
- Live sending must respect Resend bounce gates per sender domain (especially `promptanatomy.info` after VA11a/CA29a).

### Pool snapshot (2026-05-23, post official-first v2 + OH/MA)

| Metric | District-only era (2026-05-17) | Now |
| --- | ---: | ---: |
| `ready` total | ~161 | **~13,539** |
| `principal` ready | — | **~8,503** |
| TX `ready` / `principal` | — | ~7301 / ~7288 (geo send depleted) |
| MN `ready` / `principal` | — | **2681 / 288** (best MN50 track) |
| OH `ready` / `principal` | 16 / 0 | **621 / 605** (OEDS wide export) |
| MA `ready` / `principal` | 20 / 0 | **~282 / ~262** (DESE Profiles People Search) |
| FL `ready` / `principal` | — | 2272 / 60 (hold live — mostly `other`) |

Changelog detail: [`../changelog_outreach.md`](../changelog_outreach.md). Mining runbook: `..\cpb-school-outreach\docs\mining_cycle_runbook.md`.

### Historical baseline (district-only scrape, 2026-05-17)

Latest observed contact acquisition state during the failed district-only strategy:

```text
ready_cache: 161
target: 500
scraped: 900
added: 13
skipped: 887
collisions: 178
hit_rate: 1.44%
eta_minutes: 2954
```

Earlier diagnostics showed:

```text
contacts_total: 1150
ready_total: 156
skipped_total: 994
collision_total: 24
no_email_found_total: 970
```

Interpretation (2026-05-17 district-only era):

- The dominant failure was `no_email_found`, not deployment, Supabase, or Railway.
- Collision existed, but it was not the main blocker in the current dataset.
- The scraper reached sites, but most school/district sites did not expose usable email in static HTML.

**2026-05-23 update:** Official directory imports (TX AskTED, MN OrgView, OH OEDS, MA DESE Profiles) deliver principal emails at scale. Website scrape remains a **gated fallback** (smoke ≥8% hit rate); PA Phase 3 smoke was **2%**. Catalog pages (NYSED school lists, FL PK-12 publications, MA Organization Search) do **not** contain principal emails — use state export paths documented in [`../changelog_outreach.md`](../changelog_outreach.md).

## What Was Built

### Outreach Data Pipeline

Implemented in the separate outreach repo:

- `merge-nces`
  - Reads NCES `schools.csv`.
  - Filters High, Open, and WEBSITE schools.
  - Dedupes by domain.
  - Supports larger school pools such as 3,000 and 10,000.

- `import-schools`
  - Upserts schools into Supabase in batches.

- `enrich-contacts`
  - Scrapes school websites.
  - Extracts emails from visible text, `mailto:`, Cloudflare `data-cfemail`, and simple `[at]` / `[dot]` obfuscation.
  - Verifies email syntax and MX.
  - Keeps `contacts.email` unique.
  - Marks failed schools as `skipped` to avoid repeated scraping.
  - Writes progress JSON.

### Contact Quality Guards

Added or planned:

- `email unique` preserved to avoid duplicate sends to the same district mailbox.
- DNS timeout is not treated as `no_mx`.
- `mx_timeout` is accepted as lower-confidence, not rejected.
- Garbage email blocklist added.
- `no_email_found` and `email_already_used` reasons are tracked.
- Smoke mode added to prevent blindly running multi-hour jobs.
- Static sharding flags started for safe future parallel workers.

### Diagnostics

Created:

```text
scripts/enrich_diagnostics.py
```

Purpose:

- Summarize `ready`, `skipped`, collisions, and no-email failures.
- Show hit rate by state.
- Sample `no_email_found` and `email_already_used` schools.
- Help decide whether to improve scraper, pool selection, or strategy.

## Key Lessons

### 1. Deployment Was Not the Problem

Railway deployment succeeded. The API was healthy. We lost time treating the situation as a possible deploy issue when the real bottleneck was contact acquisition quality.

### 2. Schema Cardinality Mattered More Than Raw School Count

The `contacts.email` unique constraint means:

```text
1 mailbox = 1 outreach contact
```

That is correct for deliverability, but it means 10,000 schools do not imply 10,000 reachable contacts. Many schools share district-level inboxes.

We should always inspect schema constraints before setting numeric acquisition targets.

### 3. Smoke Samples Must Be Large Enough

A 30-school smoke test was misleading. It briefly showed around 20% hit rate, then the longer run collapsed to around 1-2%.

Future rule:

```text
Use smoke 100 minimum for contact acquisition decisions.
```

### 4. We Need Data Before More Scraper Code

The strongest diagnostic result:

```text
no_email_found_total: 970
collision_total: 24
```

So the next improvement should focus on finding emails that are not visible in the static pages currently fetched, not on collision handling first.

### 5. Parallel Processes Are Unsafe Without Sharding or Claiming

The current `_schools_without_contacts()` style can return the same pending schools to multiple workers. Running several uncoordinated processes would duplicate scraping and writes.

Parallelization must use one of:

- static shards: `--states`, `--domain-prefix`, `--worker-id`;
- or a database claim queue with `enrich_status`, `claimed_at`, and `claimed_by`.

For this pilot, static sharding is the preferred first step.

### 6. Catalog Pages Are Not Contact Sources (2026-05-23)

State accountability portals often list schools without staff email:

- [NYSED data.nysed.gov school lists](https://data.nysed.gov/lists.php?type=school) — report cards, enrollment
- [MA DESE Organization Search](https://profiles.doe.mass.edu/search/search.aspx?leftNavId=11238) — org browse without email in HTML results
- FL PK-12 school publications — counts only

Principal emails live in separate **export** workflows (NY SEDREF COGNOS, OH OEDS DataExtract, MA People Search → Export with `showEmail=Y`). Agents should probe for export endpoints before building scrapers.

### 7. Official Imports Beat Scrape When Available (2026-05-23)

Single operator actions delivered hundreds of principal contacts:

- OH OEDS wide report → **605** principal ready
- MA DESE Profiles export → **262** principal ready

Website scrape on the same states showed **0–17%** hit rates. Default mining policy: official export first, smoke-gated scrape second.

## Current Strategic Pivot

The active plan is:

```text
contact-strategy-pivot
```

Main decisions:

1. Stop treating the current district-only full run as production.
2. Use diagnostics to understand failure modes.
3. Improve scraper based on real `no_email_found` examples.
4. Run smoke 100.
5. Only if smoke passes, run parallel static shard workers.
6. If smoke fails, switch to hybrid contact strategy.

Updated implementation decision:

```text
official-directory-first
```

The first 500-contact list should be built primarily from official state education
directory exports and directly attributable staff/admin directory pages. NCES school
website scraping remains a fallback, not the production acquisition source. A contact
is not considered credible unless it has a unique organizational email, role/title
context, source metadata, syntax/MX verification, and no suppression match.

Priority sources for the first pass (updated 2026-05-23):

| Priority | Source | Status |
| --- | --- | --- |
| 1 | Texas TEA AskTED personnel data file | **Done** — bulk TX principals |
| 2 | Minnesota MDE OrgView (REC_REQ + SAC/SITE_VER supplement) | **Done** — 288 MN principal ready |
| 3 | Ohio OEDS Public Extract / wide report | **Done (HS)** — 605 OH principal ready; optional non-HS pass |
| 4 | Massachusetts DESE Profiles People Search (Principal) | **Done (HS)** — 262 MA principal ready |
| 5 | New York SEDREF principal email reports (#30/#31) | **Tooling ready** — `run_ny_sedref_import.ps1`; operator CSV pending (OAM) |
| 5b | Illinois ISBE `dir_ed_entities.xls` | **catalog_only** (2026-05) — NCES/RCDTS join; no email column |
| 5c | Illinois HS website scrape | **STOP** (2026-05) — smoke 50 hit **2%**; do not bulk-size Public School Lookup / Power BI |
| 5d | Michigan CEPI **EEM Data Report** | **active** (2026-05) — lead admin email on LEA schools; MDE landing URLs 404; operator CSV ~2462 rows |
| 6 | Florida private + district official dirs | **Imported** — 2272 ready but low principal ratio; audit before send |
| 7 | Virginia DOE / California CDE | Scrape/geo only — high bounce on `.info` sends |
| 8 | NCES website scraper | Fallback only; smoke gate ≥8% |

Reference implementations in `cpb-school-outreach/scripts/`:

- `prepare_tx_askted_personnel.py`, `prepare_mn_org_supplement.py`
- `prepare_oh_oeds_principals.py` (person-level + wide `PRINCIPAL EMAIL` report)
- `download_ma_profiles_principals.py`, `prepare_ma_profiles_principals.py`

## Recommended Next Technical Work

### Immediate (2026-05-23)

1. **P0:** Review `promptanatomy.info` bounce after VA11a (27%) and CA29a (22%) before next live geo batch.
2. **P1:** Prep **MN50**, **OH50**, **MA50** — runbooks + `run_*50_prep.ps1` wired (288 / ~605 / ~262 principal pool); hold live until `.info` review.
3. **P2:** NY **SEDREF** principal email CSV import ([school directory](https://p12.nysed.gov/irs/schoolDirectory/)).
4. Keep bulk website scrape **off** unless smoke ≥8% on a specific state.
5. Use `scripts/enrich_diagnostics.py` and `scripts/mining_inventory.py` after every import.

### Historical (district-only pivot, 2026-05-17)

1. Keep the current long district-only run stopped.
2. Import official state directory contacts before more NCES scraping.
3. Use `scripts/enrich_diagnostics.py` after every import or scraper change.
4. Improve scraper with high-ROI additions only after official source imports:
   - robust `mailto:` and URL-decoded email parsing;
   - internal link discovery from homepage;
   - sitemap URL discovery;
   - common school CMS route discovery;
   - additional obfuscation handling;
   - retry path for previous `skipped:no_email_found` schools.

### Then

Run:

```powershell
cpb-outreach enrich-contacts --target 9999 --school-batch 50 --smoke 100 --worker-id smoke100_pivot --retry-skipped-reasons no_email_found
```

Proceed only if:

```text
unique_added_hit_rate >= 8%
collision_rate <= 35%
no_email_rate <= 75%
```

If these gates fail, do not keep scraping for hours. Move to hybrid.

## Hybrid Fallback

If district-only cannot reach 500 sustainable contacts, use:

- district mailbox contacts already collected;
- plus explicit staff/admin contacts from staff pages;
- plus official state education directory principal/admin contacts;
- keep `contacts.email` unique;
- prioritize roles:
  1. principal
  2. assistant principal / administration
  3. media specialist / librarian
  4. office / generic contact

This keeps deliverability safer than duplicating the same district mailbox across many schools.

## Campaign Readiness

Do not start live outreach until all are true:

- Sufficient **`principal` + `mx_ok`** contacts exist for the target geo batch (500-contact campaign goal is met at pool level; batch selection quality matters more than raw `ready` count).
- Resend sender domain for the batch passes DNS verification and bounce review (`.info` gate after VA11a/CA29a).
- `RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET`, `UNSUBSCRIBE_SIGNING_SECRET`, and Railway env are set.
- `pilot_50` dry run sends 5 rows to `send_log` with no live email.
- One live self-test goes to the operator inbox.
- Unsubscribe link works and writes to `suppressions`.
- Bounce/complaint webhook is verified on Railway.

**Role quality gate (2026-05-23):** Prefer official principal imports (MN, OH, MA) over FL/CA scrape pools where `role_target=other` dominates.

## Send Plan

After readiness:

```text
50 emails/day × 10 days = 500 sends
```

Stop criteria:

- bounce rate > 5%;
- complaint rate > 0.1%;
- Resend quota or webhook failure;
- unexpected spike in unsubscribes or negative replies.

## Mining v3 (2026-05-23)

**North star:** `send_ready_principal` = `role_target=principal` + `verify_confidence=mx_ok` + official `email_source` + not suppressed.

**Phase gate:** +100 net-new send-ready principal per cycle **or** one state track with ≥50 principal eligible for XX50 batch prep.

| Component | Location |
|-----------|----------|
| Baseline | `scripts/capture_v3_baseline.py`, `data/mining_snapshots/baseline_v3*.txt` |
| Registry | `config/state_source_registry.json` |
| Cycle | `scripts/run_cycle_mining_v3.ps1` |
| NY path | SEDREF COGNOS #30/#31 → `prepare_ny_sedref_principals.py` |
| Send prep | `pilot_mn50/oh50/ma50_runbook.md`, `run_*50_prep.ps1` |
| Scrape STOP | TX, MN, FL, CA, VA, WI, NY, OK, OH, MA, PA (+ registry `scrape_allowed=false`) |

Deprecate raw `ready` total and FL `other` pool as primary success metrics. FL live sends remain on hold (60 principal vs 2199 `other`).

## Agent Guidance

When a future agent works on this:

1. Do not touch Vercel fulfillment or `api/**` in the main product repo.
2. Work in `cpb-school-outreach` for outreach code.
3. **Official directory first** — check state export paths before scrape (see [`../changelog_outreach.md` §Reference](../changelog_outreach.md#reference--mining--deliverability-insights)).
4. Distinguish **catalog** pages (NYSED lists, FL publications, MA Organization Search, **IL ISBE dir_ed_entities.xls**, **IL Public School Lookup → Power BI**) from **contact exports** (SEDREF, OEDS, DESE People Search).
5. **IL website scrape:** official XLS has websites but smoke 50 yielded **2%** principal-ready hits — treat like PA/WI scrape dead-ends unless a future smoke passes **8%**.
6. **MI CEPI EEM:** broken `michigan.gov/mde/services/data` probe ≠ no data — MICIP **EEM Data Report** CSV has lead-admin emails for LEA schools; use `import-state-directory`, not scrape.
5. Use smoke 50–100 before any bulk scrape; gate at **8%** unique added hit rate.
6. Do not run parallel workers without shards or claim logic.
7. Preserve `contacts.email` uniqueness for this pilot.
8. Do not pass duplicate filters to import (e.g. `--high-school-only` when prep already filtered HS).
9. Do not start live email sending before dry-run, self-test, and sender bounce gates.

## Related Files

- Outreach local repo: `..\cpb-school-outreach`
- Outreach changelog: [`../changelog_outreach.md`](../changelog_outreach.md)
- Existing split-system memo: [`../memo_outreach.md`](../memo_outreach.md)
- Active marketing plan: [`marketing_plan.md`](marketing_plan.md)
- Mining cycle runbook: `..\cpb-school-outreach\docs\mining_cycle_runbook.md`
- Deployment guide for product/Vercel: [`../DEPLOY.md`](../DEPLOY.md)
- Documentation index: [`INDEX.md`](INDEX.md)
