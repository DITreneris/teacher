---
status: scratch
audience: both
updated: 2026-07-28
---

# TODO — Product maturity & GTM now-board

Operator scratch; linked from [docs/INDEX.md](docs/INDEX.md) Operator runbooks, **not** Active doctrine.

**Strategy:** [docs/roadmap.md](docs/roadmap.md) (through 2027-01-01). This file is the weekly now-board only.

**Maturity:** ops-ready / GTM partial (Gate A open).

| Need | Go |
|------|-----|
| Ambition / phases | [docs/roadmap.md](docs/roadmap.md) |
| Strategy, gates, calendar | [docs/marketing_plan.md](docs/marketing_plan.md) §2–3 |
| Fulfillment broke? | [DEPLOY.md](DEPLOY.md) + [memo_pdf.md](memo_pdf.md) |
| What shipped? | [CHANGELOG.md](CHANGELOG.md) [1.1.1]–[1.2.0] |

---

## Ship (done)

Live Stripe Payment Links, Production fulfillment env, and checkout → `success.html` → Resend download email verified **2026-05-19** on `promptanatomy.online`. For incident replay or env drift, use [DEPLOY.md](DEPLOY.md) and [memo_pdf.md](memo_pdf.md) — do not re-checklist here.

---

## Discover — Gate A (open)

Ops prerequisites for Gate A are done (see [docs/marketing_plan.md](docs/marketing_plan.md) §3). Remaining:

- [ ] X account created, bio + link to `https://promptanatomy.online`
- [ ] Pinned post: 30s demo of lesson mode (no hype claims)
- [ ] UTM on all X links: `?utm_source=twitter&utm_medium=organic&utm_campaign=cpb`

---

## Trust — Gate B blockers (open)

Product / copy actions. Full Gate B (including proof thresholds) lives in [docs/marketing_plan.md](docs/marketing_plan.md) §3.

- [ ] Collect 3 permissioned testimonials (first-name + last-initial, grade band, state, one-line outcome) → `config/sot.json#commerce.testimonials`; soften or remove `commerce.testimonialsNote`
- [ ] Compare strip: keep qualified `often $100+` **or** cite a public source before any exact-dollar PD claim (`commerce.compareStrip`)
- [ ] Footer: legal entity / operator line (counsel-approved copy)
- [ ] After X handle exists: `twitter:site` meta in `index.html`

---

## Prove / Scale

Paid PDF promotion and paid X ads stay blocked until Gate B / Gate C in [docs/marketing_plan.md](docs/marketing_plan.md) §3.

---

## Parked eng

- Manual mobile Stripe E2E (iOS Safari + Android Chrome) after major commerce deploys — WebKit lab smoke (`npm run test:webkit`) does **not** replace real-device checkout
- CSP Report-Only → enforce in `vercel.json` after clean production reports ([DEPLOY.md](DEPLOY.md))
- Finish `light-dark()` token migration (P3.1); re-run `visual-pdf-commerce` + dark `mobile-pdf-commerce`
- Critical CSS — only if Lighthouse / field LCP still poor after WebP/fonts ([mobile-prelaunch-audit](docs/mobile-prelaunch-audit_2026-07.md) PSI table)
- Local PDF filenames under `api/_private/pdfs/` vs `getProductPdf` expected names (alias or rename)
- Usage counter API — defer until ≥50 buyers worth showing
- Stripe refund webhook revocation not implemented (manual Redis cleanup is not automated revocation)

### Shipped eng (mobile / pre-launch gates)

- Lighthouse CI warn-first (`npm run test:lighthouse`) + CI artifact
- WebKit mobile smoke (`npm run test:webkit`)
- axe on open PDF preview / TOC; touch targets ≥44px; ops visual @375 — see [docs/mobile-prelaunch-audit_2026-07.md](docs/mobile-prelaunch-audit_2026-07.md)
