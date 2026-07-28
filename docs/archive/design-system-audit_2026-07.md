---
status: archive
audience: both
updated: 2026-07-28
---

# Design system & content audit — July 2026 (v1.2.0)

**Snapshot:** Archived — do not edit.  
**DS truth:** [docs/STYLEGUIDE.md](../STYLEGUIDE.md). Context: [CHANGELOG.md](../../CHANGELOG.md) [1.2.0].  
**Not Active** — see [docs/INDEX.md](../INDEX.md).

**Product:** Classroom Prompt Builder v1.2.0  
**Scope:** Fall / back-to-school micro-polish — content, hero product visual, PDF trust de-dupe, Lucide sprite, visual regression  
**Baseline:** May 2026 audit ([design-system-audit_2026-05.md](design-system-audit_2026-05.md)) + DS 2.1.0

## Executive summary

v1.2.0 ships the max-ROI Fall pass without redesigning the navy/gold system: seasonal hero copy, one honest pilot quote, a real product preview in the desktop hero, a single shared PDF assurance strip, self-hosted Lucide icons (no unpkg), and Playwright screenshots for `#pdf-guides`.

## Changes vs May baseline

| Area | May 2026 | July 2026 (1.2.0) |
|------|----------|-------------------|
| Hero visual | Decorative chrome rows | Static product preview (modes + output) |
| PDF trust UI | Duplicated on each card | One `.pdf-guides-assurance` strip |
| Icons | Lucide UMD via unpkg + SRI | `assets/icons.svg` + `icons.js` |
| Testimonials | 3 anonymous + long note | 1 quote + short disclaimer |
| Mode labels | ALL CAPS (CSS + copy) | Sentence case |
| Visual regression | Not automated | `visual-pdf-commerce.spec.js` @ 320/768/1280 light+dark |

## Deferred (still open)

- Full `light-dark()` token migration (todo P3.1)
- Full `@layer` wrap of unlayered `style.css` rules
- Named / permissioned testimonials (Gate B)
- CSP enforce flip (still Report-Only)
- X handle / `twitter:site`

Mobile / pre-launch engineering gates (Lighthouse CI, WebKit smoke, axe, touch ≥44px, ops visual @375) are tracked in [mobile-prelaunch-audit_2026-07.md](mobile-prelaunch-audit_2026-07.md) — not deferred DS work.

## Quality gates

```bash
npm run test:mixed
npm run test:webkit
npm run test:lighthouse
```

Manual: re-check desktop hero at ≥1025px and PDF sticky CTA on a phone after deploy; PSI mobile baseline per the pre-launch audit.
