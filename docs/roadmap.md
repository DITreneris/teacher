---
status: active
audience: both
updated: 2026-07-28
---

# Product roadmap — Classroom Prompt Builder

**Product:** [Classroom Prompt Builder](https://promptanatomy.online/) · **Brand:** Prompt Anatomy  
**Horizon:** 2026-07-28 → **2027-01-01**  
**Last updated:** 2026-07-28  
**Product status:** Active — discovery-led GTM; ops-ready product; Gate A open

This document owns **product + GTM ambition** through New Year. Channel tactics, compliance gates A/B/C detail, and the 30-day calendar live in [marketing_plan.md](marketing_plan.md). Weekly checkboxes live in [todo.md](../todo.md). Prior implied path (no prior `roadmap.md`): [archive/roadmap_implied_2026-07-28.md](archive/roadmap_implied_2026-07-28.md).

---

## 1. North star

US K–12 teachers **discover and use** the free, no-account prompt builder. Optional PDF sales ($4.99 / $9.99) follow from organic trust — not from catalog growth or a deeper workflow product.

---

## 2. In scope / out of scope

| In scope | Out of scope (non-go through 2027-01-01 unless a new roadmap says otherwise) |
|----------|-------------------------------------------------------------------------------|
| Gate A: X handle, pinned 30s lesson demo, UTM | New PDF SKUs / micro-PD catalog expansion |
| Organic X content cadence (see marketing_plan) | Classroom workflow OS / builder deep retention features |
| Gate B hygiene on **existing** Beginners + Advanced SKUs | Mandatory accounts, cloud sync, or AI API on this product |
| Light Prompt Anatomy brand-ladder CTAs (messaging only) | Merging school outreach into Vercel `api/**` / fulfillment |
| Capped parallel outreach in sibling `cpb-school-outreach` | Paid X/PDF ads before Gate C |
| Fulfillment incident response (DEPLOY / memo_pdf) | Usage-counter vanity metrics before ≥50 buyers |

**Commerce rule:** Keep the two live SKUs. Do not author SKU #3+ until organic sales or session proof justifies a roadmap revision.

---

## 3. Phases

```mermaid
flowchart LR
  P1[P1_Aug_Sep_Discover]
  P2[P2_Oct_Prove]
  P3[P3_Nov_Dec_Decide]
  P1 --> P2 --> P3
```

### P1 — Aug–Sep 2026 — Discover

**Goal:** Close Gate A and start measurable teacher traffic.

- X account: bio + link to `https://promptanatomy.online`
- Pinned post: 30s lesson-mode demo (no hype claims)
- UTM on all X links: `?utm_source=twitter&utm_medium=organic&utm_campaign=cpb`
- Cadence: 4–5 posts/week per [marketing_plan.md](marketing_plan.md) §7–8
- Measure free-tool sessions via Vercel Analytics

**Exit:** Gate A complete; analytics baseline available.

### P2 — Oct 2026 — Prove

**Goal:** Gate B hygiene and proof thresholds on current SKUs only.

- 3 permissioned testimonials → `config/sot.json#commerce.testimonials` (soften/remove `testimonialsNote`)
- Footer: counsel-approved legal entity / operator line
- `twitter:site` in `index.html` once handle exists
- Compare strip: keep qualified `often $100+` or cite a public source
- Hit Gate B proof: **3+ organic PDF sales** OR **50+ weekly free-tool sessions** ([marketing_plan.md](marketing_plan.md) §3)

**Exit:** Gate B product/copy blockers cleared **or** explicit deferral noted in [todo.md](../todo.md) with metric evidence.

### P3 — Nov–Dec 2026 — Decide / light scale

**Goal:** Choose paid-test vs organic-only; keep brand ladder light.

- If Gate B met → Gate C small paid test ($10–20/day) per marketing_plan §3 / §8
- If Gate B not met → organic-only; no paid spend
- Soft brand-ladder CTAs only (builder primary; parent brand / community secondary)
- School outreach remains parallel (sibling repo); not a product launch criterion

**Exit:** Written decision for the 2027-01-01 checkpoint (below).

### Checkpoint — 2027-01-01

Document a go/no-go in this file or a dated follow-on:

| Question | Default answer |
|----------|----------------|
| Continue discovery-led GTM? | **Yes** if sessions or organic PDF sales show traction |
| Expand PDF catalog? | **No** unless Gate B proof + organic demand for a third SKU |
| Build workflow OS depth? | **No** unless retention data shows the free wedge is the bottleneck |
| Scale paid ads? | Only if Gate C criteria held through any P3 test |

---

## 4. Success metrics

Aligned with [marketing_plan.md](marketing_plan.md) §8 stop/go where applicable:

| Signal | Healthy | Concern |
|--------|---------|---------|
| Bio / profile CTR (organic) | 2–5% | Sustained &lt; 1% |
| Session length on free tool | ≥ 45s | Bounce-only traffic |
| Organic PDF sales | ≥ 1/week after Gate B traffic | 0 after ~2k LP visits |
| Checkout completion (paid LP) | ≥ 2% of paid LP clicks | &lt; 0.5% |
| Refund rate (14d, if volume) | &lt; 10% | &gt; 20% |
| Fulfillment | 100% emails &lt; 2 min | Any failure pattern |
| CAC vs Beginners price (if ads) | CAC &lt; $4.99 | CAC ≥ price |

---

## 5. Roles

| Role | Owns |
|------|------|
| Orchestrator | Roadmap priority; 2027-01-01 checkpoint |
| Content | Trust/testimonial copy in SOT; X messaging per marketing_plan §5 |
| UI/UX | Only trust-related site edits (footer entity, `twitter:site`) when Gate B requires |
| Commerce / Ops | Fulfillment incidents; Stripe/env health — not catalog expansion |
| QA | Quality gates when code/docs change |
| Outreach (sibling repo) | School email waves; must not block Vercel product gates |

See [AGENTS.md](../AGENTS.md).

---

## 6. Related docs

| Doc | Role |
|-----|------|
| [marketing_plan.md](marketing_plan.md) | Gates A/B/C, messaging, 30-day calendar, compliance |
| [todo.md](../todo.md) | Weekly Discover / Trust now-board |
| [DEPLOY.md](../DEPLOY.md) | Deploy + fulfillment env |
| [CHANGELOG.md](../CHANGELOG.md) | What shipped |
| [AGENTS.md](../AGENTS.md) | Stage-gate roles |
| [`.cursor/skills/product-roadmap/SKILL.md`](../.cursor/skills/product-roadmap/SKILL.md) | Agent routing + audit lessons |
| [archive/roadmap_implied_2026-07-28.md](archive/roadmap_implied_2026-07-28.md) | Pre-roadmap implied strategy snapshot |

---

## 7. Maintenance

- Update **Last updated** when phase exit criteria or non-gos change.
- Keep Gate checklists in marketing_plan / todo — do not fork them here.
- At 2027-01-01 (or sooner if metrics force it), either extend this horizon or archive this file and write a successor under Active INDEX.
