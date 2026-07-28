---
name: product-roadmap
description: >-
  Routes product ambition and GTM priority for Classroom Prompt Builder through
  2027-01-01. Use when planning features, asking what to build next, proposing
  new PDF SKUs, workflow/OS depth, discovery/X Gate A–C work, or revising
  roadmap/todo/marketing priority. Enforces discovery-led north star and
  explicit non-gos (catalog expansion, workflow OS).
---

# Product roadmap priority (through 2027-01-01)

## When to use

- “What should we build / prioritize next?”
- New PDF guides, SKUs, or PD catalog ideas
- Builder “workflow OS”, accounts, sync, or AI API proposals
- Gate A / B / C, X organic, paid ads readiness
- Editing or interpreting [`docs/roadmap.md`](../../docs/roadmap.md)

## Doc routing (do not fork checklists)

Full intent → file map: [`docs/INDEX.md`](../../docs/INDEX.md) § Doc routing.

| Doc | Owns |
|-----|------|
| [`docs/roadmap.md`](../../docs/roadmap.md) | Ambition, phases P1–P3, in/out of scope, 2027-01-01 checkpoint |
| [`docs/marketing_plan.md`](../../docs/marketing_plan.md) | Gates A/B/C detail, messaging rules, 30-day calendar |
| [`todo.md`](../../todo.md) | Weekly Discover / Trust checkboxes only (INDEX Operator, not Active) |
| Archived implied path | [`docs/archive/roadmap_implied_2026-07-28.md`](../../docs/archive/roadmap_implied_2026-07-28.md) — do not update |

## North star

Teachers **discover and use** the free no-account builder. Optional PDF sales from organic trust — not catalog growth.

## Non-go (refuse or park unless roadmap is revised)

1. New PDF SKUs / micro-PD catalog expansion (keep Beginners + Advanced only)
2. Classroom workflow OS / deep retention builder features
3. Mandatory accounts, cloud sync, or AI API on this product
4. Merging school outreach into Vercel `api/**` / fulfillment (use `outreach-boundary`)
5. Paid ads before Gate C criteria in marketing_plan

## In scope (default yes)

- Gate A: X handle, pinned 30s lesson demo, UTM
- Organic teacher content per marketing_plan
- Gate B hygiene on **existing** two SKUs (testimonials, entity line, `twitter:site`)
- Light Prompt Anatomy brand-ladder CTAs (messaging only)
- Fulfillment incident work (`pdf-fulfillment` skill)

## Ordered checklist for feature proposals

1. Read Active [`docs/roadmap.md`](../../docs/roadmap.md) phase (P1 Discover / P2 Prove / P3 Decide).
2. If the ask is a **non-go**, say so, cite roadmap §2, and offer the discovery alternative.
3. If Gate A/B work, implement via marketing_plan + todo — do not invent parallel checklists.
4. Commerce copy stays in `config/sot.json#commerce`; no third product in SOT without a roadmap revision.
5. Outreach stays parallel/capped — route with `outreach-boundary`.

## Lessons (2026-07 audit)

- Ops/fulfillment is ready; the bottleneck is **distribution + proof**, not assortment or builder depth.
- Expanding the PDF catalog before Gate A/B traffic is a trap (polish a store with no visitors).
- Workflow OS before discovery builds product into an empty funnel — parked through 2027-01-01.
- School outreach is a parallel channel, not the product north star and not a Vercel launch blocker.
- Parent-brand ladder: light CTAs only; do not rebuild a multi-site franchise before discovery works.
- Fall v1.2.0 max-ROI was content + trust + hero product visual + Lucide sprite — not new PDF SKUs or a DS rewrite.
- `#pdf-guides` CSS is snapshot-gated (`tests/e2e/visual-pdf-commerce.spec.js`); update Playwright baselines when a visual change is intentional.

## Related

- Roles: [`AGENTS.md`](../../AGENTS.md) (Orchestrator owns roadmap priority)
- Always-on rule: [`.cursor/rules/cpb-core.mdc`](../rules/cpb-core.mdc)
- Commerce UI: [`.cursor/rules/cpb-pdf-commerce.mdc`](../rules/cpb-pdf-commerce.mdc)
- Skills: `pdf-fulfillment`, `outreach-boundary`
