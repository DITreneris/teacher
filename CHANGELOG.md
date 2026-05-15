# Changelog

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/); versioning follows [Semantic Versioning](https://semver.org/).

## [1.0.0-us-mvp] - 2026-05-15 - US MVP launch: Classroom Prompt Builder

First English-language release. Targets US K-12 teachers under the Prompt Anatomy parent brand. Deploys to Vercel at `promptanatomy.online` from the `DITreneris/teacher` repository.

### Added

#### Product
- US Edition rebrand to **Classroom Prompt Builder** (by Prompt Anatomy).
- English UI across every visible surface: top nav, hero, mode tabs, grade selector, all 5 form panels, output zone, sessions panel, library, rules, community, footer, toasts, AI tool launchers.
- English prompt builders in `generator.js` for all 5 modes (LESSON, ASSESSMENT, TASKS, PRESENTATION, STRATEGY). Grade context renders as `Grade N`.
- English library (6 templates) and quality rules (5 principles) in `config/sot.json`.
- Telegram community CTA -> `https://t.me/prompt_anatomy`.

#### Trust and legal
- `privacy.html` - US Privacy Policy (no personal data, localStorage disclosure, Vercel Analytics, FERPA-friendly stance, no student PII statement). Uses `style.css` design tokens.
- `terms.html` - Terms of Use with a prominent Responsible AI callout: verify AI outputs, not for high-stakes decisions, no warranty. Uses `style.css` design tokens.
- Footer links to Privacy and Terms on every page.

#### SEO and metadata
- `lang="en"`, meta description, canonical, Open Graph (title, description, url, image, locale, site_name), Twitter card.
- `robots.txt` with sitemap reference.
- `sitemap.xml` covering `/`, `/privacy.html`, `/terms.html`.
- Brand identity `meta theme-color`.

#### Deployment and infra
- `vercel.json` with security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`), long cache for static assets, must-revalidate cache for HTML, `cleanUrls: false` (so `.html` URLs match canonical and sitemap entries exactly).
- `.vercel/` added to `.gitignore`.
- README documents the migration to `DITreneris/teacher`, Vercel project setup, and quality-gate commands.

### Changed
- Hero CTAs: "Build a lesson prompt" and "Browse templates"; meta line "Made for K-12 teachers. By Prompt Anatomy."
- Top navigation brand short form `DPK` -> `CPB`.
- Grade selector: `1 klasė ... 12 klasė` -> `Grade 1 ... Grade 12`; class badge text uses `Grade N`.
- Session date locale: `lt-LT` -> `en-US`.
- Community section title and copy now in English; primary CTA opens Telegram; secondary CTA still points to `https://www.promptanatomy.app/` as parent brand.
- Footer: brand line "By Prompt Anatomy. Contact: info@promptanatomy.app"; tags "Prompt builder / For teachers / 5 modes / Grades 1-12"; copyright "(C) 2026 Tomas Staniulis. Educational tool. All rights reserved."
- Toasts/aria labels in English: "Prompt copied.", "Template copied.", "Sessions restored.", "Sessions deleted...", "Couldn't copy...".
- Theme toggle a11y labels in English ("Toggle dark mode" / "Toggle light mode" / "Switch color mode").
- Tests rewritten to assert the English UI:
  - `tests/structure.test.js` - 52 EN assertions including new SEO checks (meta description, canonical, OG), `Grade 1`/`Grade 12` options, links to `privacy.html` and `terms.html`.
  - `tests/e2e/smoke.spec.js` - class badge regex `/Grade\s*10/i`.
  - `tests/e2e/core-flow.spec.js` - English form data, `/copied/i`, `/template/i`, `/TASK:/`, `/Restore sessions/i`, `/Delete sessions/i`.
  - `tests/docs-hygiene.test.js` - `FORBIDDEN_PATTERNS` updated to guard against regression to the LT name and old repos.
- `package.json` - `name` changed to `classroom-prompt-builder`; description in English; `lint:html` and `test:a11y` scripts now reference `privacy.html` and `terms.html`.
- `docs/INDEX.md` - rewritten in English; active doc list now includes `privacy.html`, `terms.html`, `CHANGELOG.md`, `vercel.json`, `robots.txt`, `sitemap.xml`.
- README - status now "US MVP", explicit Vercel deploy and migration steps.
- `.cursorrules` first line updated to "Classroom Prompt Builder (US MVP)" and reference to `privatumas.html` replaced with `privacy.html` and `terms.html`.

### Fixed
- Accessibility: legal-page link color changed from `var(--primary-light)` to `var(--primary)` with explicit `text-decoration: underline` and `:focus-visible` outline, raising contrast from 4.23:1 to WCAG AA. `npm run test:a11y` now reports zero issues on `index.html`, `privacy.html`, and `terms.html`.
- Tooling: `lint:html` removed from the default `npm test` chain because `html-validator-cli` calls the public W3C validator service, which is rate-limited / returns HTTP 403 from many networks. The script is still available as `npm run lint:html` for manual verification.

### Removed
- `privatumas.html` (replaced by `privacy.html`).
- `.github/workflows/deploy.yml` (GitHub Pages workflow no longer used; Vercel handles deploys directly).
- "Spin-off Nr. 6" badge from the hero; "Spin-off Nr. 6. El. pastas..." footer line.
- "Mokymu medziaga" wording from the copyright line.
- WhatsApp Lithuanian community CTA from the community section.

### Quality gates (verified locally)
- `npm test` (docs hygiene + structure + `lint:js`): pass; 52/52 structural assertions, pre-existing unused-variable warning in `copy.js` (`activeSectionId`) is non-blocking.
- `npm run test:smoke`: pass (9 Playwright tests across 320 / 375 / 768 px viewports).
- `npm run test:e2e`: pass (8 Playwright core-flow tests).
- `npm run test:a11y`: pass (zero Pa11y issues on `index.html`, `privacy.html`, `terms.html`).

### Deployment clarity (cold repo `DITreneris/teacher`)
- Added `DEPLOY.md` — human checklist (Vercel settings table, DNS, verify list) and robot reference (robots, sitemap, canonical rules).
- Added `humans.txt` — credits, contact, stack, repo URL for humans.
- `robots.txt` — comments with canonical site, repo, and explicit sitemap URL.
- `sitemap.xml` — `lastmod` on all URLs.
- `vercel.json` — explicit `Content-Type` headers for `robots.txt`, `sitemap.xml`, `humans.txt`; `version: 2`, `public: true`.
- `index.html`, `privacy.html`, `terms.html` — `meta robots` / `googlebot`, `rel="sitemap"` in `<head>`.
- `package.json` — `repository` and `homepage` fields point to teacher repo and production URL.
- `README.md` — canonical repo table; deployment summary links to `DEPLOY.md`.

### Notes and post-MVP TODOs
- `og-image.png` is referenced as a placeholder at the site root. Provide a 1200x630 PNG before any paid social rollout.
- Parent-brand links to `promptanatomy.app` are intentionally retained (hero badge, community secondary CTA, contact email).
- Lucide icons are still loaded from unpkg CDN. Self-hosting is a post-MVP task in case school networks block unpkg.
- Pre-existing `copy.js` lint warning (`activeSectionId` assigned but never used at line 86) is unrelated to this release and intentionally left as-is to avoid behavioral risk; safe to clean up post-MVP.
- `AGENTS.md` and other internal tooling docs remain in Lithuanian by design (internal use only; product name reference updated).
- Vercel project, custom domain (`promptanatomy.online`), and DNS are configured by the project owner outside the repo.

---

## [Pre-US] - 2026-03-05

Lithuanian-language teacher prompt tool ("DI Pamoku Kurejas") deployed to GitHub Pages from `DITreneris/mokytojas`. Maintained as a historical reference only; not used for the US MVP. Legacy docs live under `docs/archive/`.
