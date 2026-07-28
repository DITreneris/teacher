---
status: ops
audience: both
updated: 2026-07-28
---

# Mobile & pre-launch audit — July 2026

**Product:** Classroom Prompt Builder v1.2.0  
**Scope:** Mobile readiness, pre-launch engineering gates, adoption of 2026 CWV / Lighthouse / Safari practice  
**Scorecard role:** Operator scorecard (INDEX Operator runbooks — not Active doctrine).  
**Baseline:** [STYLEGUIDE.md](STYLEGUIDE.md), archived [archive/design-system-audit_2026-05.md](archive/design-system-audit_2026-05.md) / [archive/design-system-audit_2026-07.md](archive/design-system-audit_2026-07.md), [roadmap.md](roadmap.md)

## Executive verdict

Ops and mobile UX for the free builder + PDF storefront are **hardened** (320/375 overflow, PDF preview/`dvh`, visual regression on `#pdf-guides`, pa11y WCAG2AA). The business pre-launch bottleneck is **Gate A discovery** (X handle, pinned demo, UTM) — see [todo.md](../todo.md) Discover and [marketing_plan.md](marketing_plan.md) §3. Engineering adopts **thin gates** (Lighthouse CI warn-first, WebKit smoke, axe on open PDF UI, touch ≥44px, ops visual @375) without a design-system rewrite or catalog expansion.

## Scorecard

| Pillar | Status | Notes |
|--------|--------|-------|
| Responsive / viewport | Strong | `viewport-fit=cover`, safe-area tokens, smoke @ 320/375/768 |
| Touch targets | Strong (44px) | STYLEGUIDE / e2e fail &lt;44px; 48px Lighthouse soft-log only |
| Visual regression | Strong (PDF) + ops @375 | `#pdf-guides` + ops header snapshot |
| A11y | Strong | pa11y static + axe on preview dialog / TOC |
| Perf CI | Added | `npm run test:lighthouse` — a11y error ≥0.9; perf warn ≥0.7 |
| Field CWV | Operator | PSI mobile after large frontend deploys (table below) |
| Safari / WebKit | Lab smoke | `npm run test:webkit`; real-device Stripe still manual |
| CSP | Parked | Report-Only until clean production reports |
| GTM / Gate A | Open | Human-only; do not invent a parallel checklist |

## Coverage matrix

| Zone | smoke | mobile-pdf | visual-pdf | webkit smoke | axe dynamic | touch | ops visual |
|------|-------|------------|------------|--------------|-------------|-------|------------|
| `/` overflow 320–768 | Yes | — | — | Yes | — | — | — |
| Ops / mode switch | Yes | — | — | — | — | Yes | Yes @375 |
| `#pdf-guides` overflow | — | Yes | Yes | Yes | — | Yes | — |
| Preview dialog | — | Yes | — | Yes | Yes | — | — |
| TOC accordion | — | Yes | — | — | Yes | — | — |
| `success.html` poll | — | Yes | — | Yes | — | — | — |
| privacy / terms / success static a11y | pa11y | — | — | — | — | — | — |

## Adopted gates (this audit)

| Gate | Command | CI |
|------|---------|-----|
| Structure + docs + lint | `npm test` | `test:mixed` |
| Smoke + e2e (incl. axe, touch, ops visual) + pa11y | `npm run test:mixed` | Core job |
| WebKit mobile smoke | `npm run test:webkit` | Extra step after mixed |
| Lighthouse CI (mobile) | `npm run test:lighthouse` | Extra step; artifacts uploaded (SEO warn on `success.html` expected — page is `noindex`) |

## Non-goals

- Gate A X-account creation (operator; [todo.md](../todo.md))
- CSP Report-Only → enforce without clean reports
- Critical CSS / font-preload surgery until field LCP fails
- New PDF SKUs or classroom workflow OS ([roadmap.md](roadmap.md) non-go)
- Failing CI on Lighthouse performance score noise (warn only)

## Operator PSI baseline

After a large frontend deploy, run [PageSpeed Insights](https://pagespeed.web.dev/) **mobile** on:

1. `https://promptanatomy.online/`
2. `https://promptanatomy.online/#pdf-guides`

Record field data when available; otherwise lab. Thresholds: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 (p75).

| URL | Date | LCP | INP | CLS | Source (field/lab) | Notes |
|-----|------|-----|-----|-----|--------------------|-------|
| `/` | — | — | — | — | — | Fill after first post-merge check |
| `/#pdf-guides` | — | — | — | — | — | Fill after first post-merge check |

See also [DEPLOY.md](../DEPLOY.md) post-deploy note.

## Related

- [STYLEGUIDE.md](STYLEGUIDE.md) — living DS / mobile rules (480px, 44px, `dvh`)
- [archive/design-system-audit_2026-07.md](archive/design-system-audit_2026-07.md) — Fall DS / content pass (snapshot)
- [roadmap.md](roadmap.md) — discovery-led ambition through 2027-01-01  
- [todo.md](../todo.md) — Gate A Discover + Parked eng
