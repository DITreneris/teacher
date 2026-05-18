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

## Hero progress model

| Width | Progress UI |
|-------|-------------|
| ≤768px (mobile) | `.header .header-steps` is **hidden**. The ops-center `.step-badge` ("1") together with the in-section `.journey-next-link` ("View generated prompt") is the canonical mobile progress. |
| 769–1024px (tablet) | `.header-steps` visible as the desktop pill row; connectors softened (`rgba(255,255,255,0.55)`); `.hero-prompt-card` still hidden. |
| ≥1025px (desktop) | Full grid: `.hero-content` left, `.hero-prompt-card` right (`width: clamp(260px, 22vw, 300px)`, glass + float). |

`.header-steps` DOM stays present at every width so anchor links remain crawlable and keyboard-reachable on tablet+.

Cache hint: bump `index.html` `<link rel="stylesheet" href="style.css?v=X.Y.Z">` whenever hero/layout CSS changes so returning mobile visitors do not see stale styles.

---

## Social preview (OG image)

| Aspect | Rule |
|--------|------|
| Source of truth | `scripts/generate-og-image.js` (Satori + sharp); regenerate with `npm run generate:og` or `npm run build:social`. Never hand-edit `og-image.png`. |
| Spec | 1200x630 PNG, ≤300 KB (enforced by `tests/structure.test.js`). |
| Safe area | ≥80px padding on every side. Nothing important within the outer 80px ring (mobile thumbnails crop aggressively). |
| Layout | Four elements only: top-left brand row (icon + wordmark) → H1 (≤3 lines) → gold accent line → bottom-left URL. |
| Typography | Inter Bold 96px (H1, line-height 1.04, letter-spacing -0.02em); Inter Medium 30–32px (brand wordmark + URL). |
| Colors | Background `--primary` (`#0F2A44`) + subtle gold radial highlight `rgba(245, 197, 24, 0.16)` top-right. H1 white. Brand wordmark `rgba(255, 255, 255, 0.92)`. Accent + URL `--accent-gold` (`#F5C518`). |
| Brand naming | Do **not** name AI vendors (ChatGPT, Claude, Gemini) on the OG image. They stay in body copy (`meta name=description`, `og:description`) per `docs/marketing_plan.md` §5; the OG surface is the most amplified and stays vendor-neutral. |
| Fonts on disk | `assets/fonts/Inter-Bold.woff` + `Inter-Medium.woff` (latin subset, SIL OFL 1.1; license: `assets/fonts/OFL.txt`). Satori's bundled opentype parser supports WOFF but not WOFF2. |

Post-deploy validation: Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Post Inspector (see `DEPLOY.md` §5).

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
