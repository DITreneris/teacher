---
status: active
audience: both
updated: 2026-07-28
---

# Documentation index

The single documentation navigation hub after `README.md`.

## Canonical rule

- Active / archived status is decided only in this file.
- If a document is not listed under "Active", it is treated as archived.
- Archived files are not updated unless explicitly returned to the active zone.
- Operator runbooks below are navigable for discovery but are **not** Active — do not treat or update them as product doctrine unless explicitly promoted into an Active section.

## Doc routing

| If you need… | Open |
|--------------|------|
| Build priority / non-gos | [roadmap.md](roadmap.md) (+ skill `product-roadmap`) |
| This week’s checkboxes | [todo.md](../todo.md) |
| Gates / calendar / messaging | [marketing_plan.md](marketing_plan.md) |
| Deploy / DNS / SEO | [DEPLOY.md](../DEPLOY.md) |
| Stripe / PDF fulfillment broken | [memo_pdf.md](../memo_pdf.md) (+ skill `pdf-fulfillment`) |
| School email / Railway outreach | skill `outreach-boundary` → sibling `cpb-school-outreach` |
| Visual tokens / DS | [STYLEGUIDE.md](STYLEGUIDE.md) |
| Roles / which tests to run | [AGENTS.md](../AGENTS.md) |
| Sister-repo / clone checklist (not day-to-day) | [gold_legacy_standard.md](../gold_legacy_standard.md) |

## Active documents (lean)

- [README.md](../README.md) - the only entry point.
- [INDEX.md](INDEX.md) - canonical documentation index.
- [DEPLOY.md](../DEPLOY.md) - deployment for humans (Vercel, DNS) and robots (sitemap, robots.txt).
- [AGENTS.md](../AGENTS.md) - role-based work and quality rules.
- [gold_legacy_standard.md](../gold_legacy_standard.md) - sister-repo / clone gold baseline and drift checks.
- [CHANGELOG.md](../CHANGELOG.md) - release notes.
- [STYLEGUIDE.md](STYLEGUIDE.md) - Design System 2.1.0 (tokens, components, mobile rules, icon sprite).

## Active go-to-market

- [roadmap.md](roadmap.md) - Product + GTM ambition through 2027-01-01 (discovery-led; PDF catalog expansion and workflow OS non-go).
- [marketing_plan.md](marketing_plan.md) - US promotion readiness, X/Twitter plan, compliance gates, 30-day calendar; cross-links [DEPLOY.md](../DEPLOY.md) and the operator now-board (see plan §10).

## Product surfaces

- [privacy.html](../privacy.html) - US Privacy Policy.
- [terms.html](../terms.html) - Terms of Use + Responsible AI disclaimer + Classroom License (`#paid-pdf-license`) + 14-day refund clause.
- [success.html](../success.html) - Post-purchase confirmation; polls `/api/download-link` until fulfillment completes.
- [pdf-source/](pdf-source/) - HTML/CSS source for paid PDF guides; export via [pdf-source/README.md](pdf-source/README.md).

## Code navigation

Core product: [index.html](../index.html), [generator.js](../generator.js), [copy.js](../copy.js), [style.css](../style.css), [config/sot.json](../config/sot.json).

Icons: [icons.js](../icons.js) + [assets/icons.svg](../assets/icons.svg) (`npm run build:icons`).

Fulfillment API: `api/stripe-webhook.js`, `api/download.js`, `api/download-link.js`, `api/_lib/fulfillment.js`, `api/fulfillment-health.js`.

Tests / CI: see [AGENTS.md](../AGENTS.md) quality gates; CI runs `npm run test:mixed`, then `test:webkit` and `test:lighthouse`.

## Operator runbooks (navigation only — not active docs for hygiene)

Listed here for agent/operator discovery; not part of the lean active-doc set above.

- [memo_pdf.md](../memo_pdf.md) - Stripe + PDF fulfillment deployment memo (EN).
- [fulfillment-change-control.md](../scripts/fulfillment-change-control.md) - Change control for production fulfillment paths while outreach is active.
- [todo.md](../todo.md) - Maturity / GTM now-board (Discover / Trust checkboxes); operator scratch, not Active doctrine.
- [mobile-prelaunch-audit_2026-07.md](mobile-prelaunch-audit_2026-07.md) - Mobile / pre-launch scorecard, CWV operator table, thin engineering gates (LHCI, WebKit, axe, touch, ops visual).
- [memo_outreach.md](../memo_outreach.md) - split-system pointer (Vercel product vs sibling Railway outreach); not a product launch criterion.
- [changelog_outreach.md](../changelog_outreach.md) - outreach work log (sibling repo `cpb-school-outreach`; not part of lean active-doc set).
- [outreach_experience_memo_2026-05-17.md](outreach_experience_memo_2026-05-17.md) - sibling-repo contact-acquisition lessons; not part of product launch criteria.
