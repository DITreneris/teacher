---
status: active
audience: both
updated: 2026-07-28
---

# Agent rules (Edu MVP)

Goal: a single clear working model for this educational MVP.

## Start here

This file owns **roles**, **stage-gate**, and the **canonical quality-gate table** (below). Doc routing map: [`docs/INDEX.md`](docs/INDEX.md).

| If you need… | Open |
|--------------|------|
| Build priority / non-gos | [`docs/roadmap.md`](docs/roadmap.md) (+ skill `product-roadmap`) |
| This week’s checkboxes | [`todo.md`](todo.md) |
| Gates / calendar | [`docs/marketing_plan.md`](docs/marketing_plan.md) |
| Deploy / DNS | [`DEPLOY.md`](DEPLOY.md) |
| Stripe / PDF broken | [`memo_pdf.md`](memo_pdf.md) (+ skill `pdf-fulfillment`) |
| School outreach | skill `outreach-boundary` → `..\cpb-school-outreach` |
| Visual / DS tokens | [`docs/STYLEGUIDE.md`](docs/STYLEGUIDE.md) |
| Sister-repo gold | [`gold_legacy_standard.md`](gold_legacy_standard.md) |

**Quality gates:** see § Quality gates below (single source). Cursor rules point here; do not fork a second full gate matrix in `cpb-core.mdc`.

## Roles and responsibilities

- **Orchestrator** — owns priority, writes the task brief, accepts the final result. Product ambition / phases through 2027-01-01: [`docs/roadmap.md`](docs/roadmap.md); US promotion gates and channels: [`docs/marketing_plan.md`](docs/marketing_plan.md). Check feature proposals against non-gos (catalog, workflow OS) via skill `product-roadmap`.
- **Content** — owns copy, prompt semantics, and teacher-context clarity. Product copy is **en-US**; edit [`config/sot.json`](config/sot.json) (`#commerce`, `#buyerFaq`, `#copy`) when possible. Marketing safety: [`docs/marketing_plan.md`](docs/marketing_plan.md) §4–5, §11. No new PDF SKUs or deep builder features while roadmap marks them non-go.
- **UI/UX** — owns user flow, mobile hierarchy, and a11y.
- **Commerce / Ops** — Stripe Payment Links, success URL, webhook domain (same host as checkout redirect), Vercel Production env, fulfillment mapping, incident replay. Files: [`DEPLOY.md`](DEPLOY.md), [`memo_pdf.md`](memo_pdf.md), [`config/sot.json`](config/sot.json), `api/stripe-webhook.js`, `api/_lib/fulfillment.js`, `api/fulfillment-health.js`. At Verify, pair with QA for fulfillment changes.
- **Outreach** — works in sibling repo `..\cpb-school-outreach` (Railway, Supabase, campaigns, marketing Resend). Does not add outreach logic to `api/**`, Stripe, Upstash, Blob, or transactional Resend. Status / UTM / CSV drop: [`memo_outreach.md`](memo_outreach.md); full harness in sibling `AGENTS.md` and skills. In this product repo: router only (see `.cursor/skills/outreach-boundary`).
- **QA** — runs quality gates and gives a release recommendation.

## Two-repo boundary / routing

This repo is the **Vercel product + PDF fulfillment** repo. It owns `promptanatomy.online`, the static product, Stripe PDF checkout, Upstash Redis, Vercel Blob, transactional Resend, and `api/**` fulfillment paths.

The outreach system is a separate sibling repo:

```text
..\cpb-school-outreach
```

The outreach repo owns Railway deploy, Supabase Postgres, contact enrichment, campaign sending, and marketing Resend (current From: `hello@promptanatomy.blog`). If the task involves school outreach, scrapers, Supabase contacts, campaign workers, or marketing email webhooks, the agent (**Outreach** role) must work in `..\cpb-school-outreach`, not this Vercel repo.

Do not add outreach logic to `api/**`, Stripe fulfillment, Upstash, Vercel Blob, product env, or transactional email paths. System split is documented in operator runbooks [`memo_outreach.md`](memo_outreach.md) and [`docs/outreach_experience_memo_2026-05-17.md`](docs/outreach_experience_memo_2026-05-17.md). Active GTM: ambition [`docs/roadmap.md`](docs/roadmap.md), promotion detail [`docs/marketing_plan.md`](docs/marketing_plan.md); outreach is not a product launch blocker (roadmap: parallel capped).

## Stage-gate workflow

1. **Intake (Orchestrator)**  
   Write a short task brief: goal, constraints, acceptance criteria, files touched.
2. **Implement (Content + UI/UX + Commerce/Ops by area)**  
   Implement changes and list documentation deltas.
3. **Verify (QA + Commerce/Ops for fulfillment)**  
   Run the test gates for the change type (table below).
4. **Release readiness (Orchestrator + QA)**  
   Close the task only when code, docs, and test gates pass.

## Quality gates

**CI source of truth:** [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs `npm run test:mixed`, then `test:webkit` and `test:lighthouse`. Locally before a PR — the same or a superset.

| Change type | Required | Recommended |
|-------------|----------|-------------|
| Any code / active docs | `npm test` | — |
| UX / flow / HTML interactions | `npm run test:smoke`, `npm run test:a11y` | — |
| Forms, generation, sessions, copy | `npm run test:e2e` (core-flow) | — |
| `.pdf-*` CSS / mobile PDF layout | `npm run test:e2e` (incl. mobile-pdf-commerce + visual-pdf-commerce + axe/touch/ops visual) | `npm run test:webkit` |
| Icon sprite (`icons.js` / `assets/icons.svg`) | `npm test` | `npm run build:icons` if regenerating |
| `api/**` fulfillment | `npm test` | `npm run check:fulfillment` |
| Commerce / marketing copy in SOT only | `npm test` (publish + copy safety) | `npm run test:smoke` |
| Mobile / pre-launch perf & Safari | — | `npm run test:lighthouse`, `npm run test:webkit` ([mobile-prelaunch-audit](docs/mobile-prelaunch-audit_2026-07.md)) |
| Before Production deploy | — | [DEPLOY.md](DEPLOY.md) + `npm run check:fulfillment` / `/api/fulfillment-health` |

**Cursor rules:** `.cursor/rules/cpb-core.mdc` (always), `cpb-pdf-commerce.mdc`, `cpb-fulfillment.mdc`. Skills: `product-roadmap`, `pdf-fulfillment`, `outreach-boundary`.

## Design system (DS 2.1.0)

- Canonical guide: [`docs/STYLEGUIDE.md`](docs/STYLEGUIDE.md). Colors / theme: [`config/sot.json`](config/sot.json) + [`style.css`](style.css).
- Icons: self-hosted Lucide subset — [`icons.js`](icons.js) + [`assets/icons.svg`](assets/icons.svg); rebuild `npm run build:icons`.
- New `.pdf-*` or `.ops-*` UI **must** include `@media (max-width: 480px)` rules (overflow, touch 44px, dialog `dvh`) before merge.
- PDF commerce mobile regression: `tests/e2e/mobile-pdf-commerce.spec.js` (320 / 375 px).
- PDF commerce visual regression: `tests/e2e/visual-pdf-commerce.spec.js` (`#pdf-guides`, 320 / 768 / 1280, light + dark) — update snapshots when a CSS change is intentional.
- Ops mobile visual: `tests/e2e/visual-ops-mobile.spec.js` (@375 light). WebKit smoke: `npm run test:webkit`. Lighthouse CI: `npm run test:lighthouse` (a11y error; perf warn).

## Operator runbooks (not Active)

These files appear in INDEX **Operator** navigation but are not Active doctrine (docs-hygiene):

- [`memo_pdf.md`](memo_pdf.md) — fulfillment deployment memo (EN)
- [`todo.md`](todo.md) — product maturity / GTM now-board (Discover / Trust); strategy: [`docs/roadmap.md`](docs/roadmap.md)
- [`docs/mobile-prelaunch-audit_2026-07.md`](docs/mobile-prelaunch-audit_2026-07.md) — mobile / pre-launch scorecard
- [`scripts/fulfillment-change-control.md`](scripts/fulfillment-change-control.md) — fulfillment path change control while outreach is active
- [`memo_outreach.md`](memo_outreach.md) — outreach split-system memo (Vercel vs Railway, Resend split, UTM)
- [`changelog_outreach.md`](changelog_outreach.md) — school outreach work log (sibling repo `..\cpb-school-outreach`); main [CHANGELOG.md](CHANGELOG.md) tracks only Vercel product / PDF / Stripe / marketing / DS
- [`DEPLOY.md`](DEPLOY.md) — deploy for humans and robots (also Active)

## Active documentation

The canonical Active document list lives only in `docs/INDEX.md`.

- If a file is not marked Active in `docs/INDEX.md`, treat it as archived.
- Do not update archive files unless they are explicitly returned to the Active zone.
