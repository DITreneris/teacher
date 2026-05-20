# Design system & mobile audit — May 2026

**Product:** Classroom Prompt Builder v1.1.2  
**Scope:** Full site + PDF commerce block (`#pdf-guides`)  
**Baseline:** `npm test` 156/156 pass (2026-05-17)

## Executive summary

After the PDF storefront expansion (covers, compare strip, testimonials, preview lightbox, buyer FAQ), mobile CSS lagged behind desktop. This audit drove **P0 fixes** in `style.css` (480px/768px breakpoints), **CSS reorder** so product cards appear before social proof on narrow viewports, **preview dialog** `dvh` + horizontal scroll-snap on phones, and automated Playwright guards.

## Mobile audit matrix

| Zone | 320px | 375px | 768px | Finding (pre-fix) | Fix |
|------|-------|-------|-------|-------------------|-----|
| `#pdf-guides` document overflow | Pass | Pass | Pass | Whole-page test passed; section-level gaps | Section overflow tests added |
| Compare strip | Fail risk | Pass | Pass | `min-width: 130px` × 3 pills | Column stack, `min-width: 0` |
| Cover + CTA above fold | Fail | Fail | Partial | 220px-wide × 950 aspect ≈ 285px tall | 168px max-width, lighter shadow |
| Preview dialog | Partial | Pass | Pass | `100vh` + tall stacked pages | `100dvh`, horizontal snap @ 480px |
| Testimonials grid | Pass | Pass | Pass | `minmax(260px)` OK at 375+ | Force 1 col @ 480px |
| Buyer FAQ / author | Pass | Pass | Pass | Heavy padding | Reduced padding @ 480px |
| `success.html` | Pass | Pass | — | No mobile-specific rules | Full-width CTA, tighter padding |
| Hero / ops / nav | Pass | Pass | Pass | Existing 768/480 rules | Minor buyer-faq / author stack |
| Community CTA | Pass | Pass | Pass | Legacy green primary CTA off-brand | Gold DS tokens + 480px stack |

## Design system layers

| Layer | Source of truth | Status |
|-------|-----------------|--------|
| CSS tokens | `style.css` `:root` | Canonical for layout, radius, motion |
| Brand colors + theme runtime | `config/sot.json` | Synced; `--text-light` aligned to `textSecondary` |
| PDF print | `docs/pdf-source/pdf-print.css` | Manual sync with SOT hex (documented in STYLEGUIDE) |
| Human docs | `docs/STYLEGUIDE.md` v2.0.0 | Active (see INDEX.md) |

## P0 / P1 / P2 backlog (post-1.1.0)

- ~~**P1:** Sticky mini-CTA when main PDF CTA scrolls off-screen~~ — shipped in v1.1.2 (`pdf-sticky-cta`, mobile-only, `IntersectionObserver`).
- ~~**P1:** WebP covers (`todo.md` §5)~~ — shipped in v1.1.2 (`<picture>` + `scripts/optimize-pdf-covers.js`; ~70-80% size reduction).
- **P2:** Playwright visual regression screenshots for `#pdf-guides` @ 320px

See [`.cursor/plans/ds_p0-p3_micro-improvements_b250ea79.plan.md`](../.cursor/plans/ds_p0-p3_micro-improvements_b250ea79.plan.md) for the full v1.1.2 / v1.2.0 design-system rollout (color-scheme, prefers-contrast, content-visibility, Product JSON-LD, self-hosted fonts, color-mix tokens, clamp typography, container queries, dialog @starting-style, light-dark seed) and [`todo.md`](../todo.md) §9 for the deferred P3 follow-ups (full light-dark migration + Lucide sprite).

## Quality gates (release)

```bash
npm test
npm run test:smoke
npm run test:e2e
npm run test:a11y
```

Manual: Stripe test purchase on iOS Safari + Android Chrome ([todo.md](../todo.md) §2).
