# Outreach Experience Memo — 2026-05-17

**Audience:** operators, agents, and humans joining the project later.

This memo documents what we tried, what worked, what failed, and where the outreach system stands now.

## Executive Summary

We built and deployed a separate school outreach bot for Classroom Prompt Builder. The Railway deployment works; the main blocker is not deployment. The blocker is contact acquisition: the current district-only scraper finds too few unique, sustainable contacts to reliably reach 500 ready contacts quickly.

The most important operational rule:

**The outreach bot is separate from the Vercel deployment. Do not merge these systems.**

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
- Contact enrichment/import is the problem area.
- Live sending must not start until contact acquisition and Resend readiness gates pass.

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

Interpretation:

- The dominant failure is `no_email_found`, not deployment, Supabase, or Railway.
- Collision exists, but it is not the main blocker in the current dataset.
- The scraper reaches sites, but most school/district sites do not expose usable email in static HTML.

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

Priority sources for the first pass:

1. Virginia DOE school principal contact CSV.
2. Texas TEA AskTED personnel data file.
3. California CDE School Directory Export.
4. Minnesota / Ohio official organization-contact extracts where practical.
5. NCES website scraper only for gaps after official imports.

## Recommended Next Technical Work

### Immediate

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

- 500 `ready` contacts exist.
- Resend domain `news.promptanatomy.online` passes DNS verification.
- `RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET`, `UNSUBSCRIBE_SIGNING_SECRET`, and Railway env are set.
- `pilot_50` dry run sends 5 rows to `send_log` with no live email.
- One live self-test goes to the operator inbox.
- Unsubscribe link works and writes to `suppressions`.
- Bounce/complaint webhook is verified on Railway.

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

## Agent Guidance

When a future agent works on this:

1. Do not touch Vercel fulfillment or `api/**` in the main product repo.
2. Work in `cpb-school-outreach` for outreach code.
3. Start with diagnostics, not more scraping.
4. Use smoke 100 before full runs.
5. Do not run parallel workers without shards or claim logic.
6. Preserve `contacts.email` uniqueness for this pilot.
7. Treat `no_email_found` as the main current blocker.
8. Do not start live email sending before dry-run and self-test gates.

## Related Files

- Outreach local repo: `..\cpb-school-outreach`
- Existing split-system memo: [`../memo_outreach.md`](../memo_outreach.md)
- Active marketing plan: [`marketing_plan.md`](marketing_plan.md)
- Deployment guide for product/Vercel: [`../DEPLOY.md`](../DEPLOY.md)
- Documentation index: [`INDEX.md`](INDEX.md)
