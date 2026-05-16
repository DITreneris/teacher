# Classroom Prompt Builder — Styleguide (Design System 2.0.0)

**Version:** Design System 2.0.0 (product release 1.1.0)  
**Last updated:** May 2026  
**Locale:** en-US  
**Implementation:** [`style.css`](../style.css) + [`config/sot.json`](../config/sot.json)

---

## Brand palette

| Token / SOT key | Hex | Usage |
|-----------------|-----|--------|
| `--primary` / `colors.deepBlue` | `#0F2A44` | Headings, nav, output panel |
| `--primary-light` / `colors.softBlue` | `#2F6FED` | Links, dark-theme primary |
| `--accent-gold` / `colors.primaryYellow` | `#F5C518` | CTA background, badges |
| `--surface-0` / `lightBlueBackground` | `#F4F7FB` | Page background |
| `--surface-1` | `#FFFFFF` | Cards |
| `--text` / `textPrimary` | `#1C2B3A` | Body |
| `--text-light` / `textSecondary` | `#6B7A8C` | Muted text |
| `--border` | `#E6ECF2` | Hairlines |

CTA pair: `--cta-bg` `#F5C518` on `--cta-text` `#0F2A44`.

---

## Layout tokens

| Token | Value | Use |
|-------|-------|-----|
| `--r-card` | 16px | Cards, dialogs |
| `--r-btn` | 12px | Buttons, inputs |
| `--r-badge` | 10px | Chips, specs |
| `--r-hero` | 24px | Hero |
| `--space-8` … `--space-48` | 8–48px | Vertical rhythm |
| `--duration-fast/normal/slow` | 150/250/400ms | Motion |
| `--shadow-soft/medium/elevated` | — | Elevation |

---

## Typography

- **Family:** Inter (Google Fonts), system fallback.
- **Body:** 16px, `line-height: 1.6`.
- **Headings:** tight leading (`--leading-tight`), negative letter-spacing on h1/h2.

---

## Icons

- **Library:** Lucide 0.460.0 (CDN + SRI on `index.html`).
- **Sizes:** `.icon--sm` 16px, default 20px, `.icon--lg` 24px.

---

## Theme (light / dark)

- Toggle sets `data-theme="light|dark"` on `<html>`.
- Runtime palette from `config/sot.json#theme` applied via `generator.js` `setTheme()`.
- Dark overrides live in `[data-theme="dark"]` blocks in `style.css`.

---

## PDF commerce components (`.pdf-*`)

| Class | Role |
|-------|------|
| `.pdf-guides` | Section wrapper |
| `.pdf-guides-grid` | Two-column product grid (1 col ≤768px) |
| `.pdf-guide-card` | Product card |
| `.pdf-guide-card-cover` | Cover image (Letter ratio 734×950) |
| `.pdf-guide-specs` | Length / format metadata |
| `.pdf-guide-cta` | Stripe checkout link |
| `.pdf-compare-strip` | PD vs guide pricing |
| `.pdf-testimonials` | Social proof |
| `.pdf-preview-dialog` | Sample-page lightbox |

### Mobile rules (required for new `.pdf-*` / `.ops-*` blocks)

All new commerce or operations UI **must** include rules under `@media (max-width: 480px)`:

- No horizontal overflow; use `min-width: 0`, `overflow-wrap`, column stacks.
- Touch targets ≥ 44px on interactive controls.
- Prefer `100dvh` with `100vh` fallback for full-viewport dialogs.
- PDF section order on ≤768px: header → pilot meta → **cards** → compare → testimonials (CSS `order` on `.pdf-guides` flex children).

See [`design-system-audit_2026-05.md`](design-system-audit_2026-05.md) for audit notes.

---

## Community section

| Class | Role | Tokens |
|-------|------|--------|
| `.community-cta-primary` | Primary (Telegram) | `--cta-bg` / `--cta-text`; hover `--cta-hover` |
| `.community-cta-secondary` | Outline (parent brand) | `--primary` border, transparent background |

Do **not** use `--green` for community CTA backgrounds; green is reserved for success/status UI (toast, refund icon).

Mobile (≤480px): `.community-actions` stacks CTAs full-width (`max-width: 280px`, `min-height: 48px`).

---

## Print / PDF source

Paid guide HTML uses [`pdf-source/pdf-print.css`](pdf-source/pdf-print.css). Brand hex must match this guide and `config/sot.json`.

---

## Quality gates

- `npm test` — structure + SOT sync assertions.
- UX changes: `npm run test:smoke`, `npm run test:e2e` (includes `mobile-pdf-commerce.spec.js`), `npm run test:a11y`.
