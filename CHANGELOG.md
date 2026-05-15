# Changelog

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/); versioning follows [Semantic Versioning](https://semver.org/).

## [1.1.0] - 2026-05-15 - Technical SEO, GEO, and ads-compliance hardening

Three-phase technical hardening for US ad approval, search engine indexability, and AI search visibility. All changes are metadata, configuration, schema, security headers, and crawler-facing files. No frontend redesign. The only new visible assets are `og-image.png` and `apple-touch-icon.png`, which surface in social previews, search snippets, and OS home screens, not in the live page UI.

### Phase 1 - P0 promotion readiness

#### Added
- `og-image.png` (1200 x 630, navy + warm gold brand) at repo root. The HTML already references this asset in `og:image`, `twitter:image`, and JSON-LD; previously it was a placeholder.
- `og:image:width`, `og:image:height`, `og:image:alt`, `twitter:image:alt` meta tags in `index.html` so Facebook, LinkedIn, X, Slack, and Discord render the preview without re-fetching dimensions.

#### Changed
- `privacy.html` sections 3 and 7: analytics disclosure rephrased to be accurate regardless of the Vercel dashboard state. The page now states clearly that the Service's own source code contains no analytics or tracking script, and that Vercel Analytics, when enabled at the hosting layer, is aggregate and cookieless.

#### Decisions and skips
- `twitter:site` and `twitter:creator` deliberately not added. The project has no verified X/Twitter handle and Twitter falls back to `og:image` + `og:title` when these are absent. Add them once a brand handle exists.

### Phase 2 - SEO foundation

#### Added
- Structured data on `index.html` as a single JSON-LD `@graph`: `Organization`, `WebSite`, `SoftwareApplication` (with `offers.price = 0 USD`, `applicationCategory = EducationalApplication`, `featureList`, `audience.educationalRole = teacher`, `isAccessibleForFree = true`), and `FAQPage` with four factual Q&As (free, AI tool compatibility, student data, target audience).
- `BreadcrumbList` JSON-LD on `privacy.html` and `terms.html`.
- `apple-touch-icon.png` (180 x 180, brand navy + gold).
- `manifest.webmanifest` (name, short_name, theme_color, icons, lang `en-US`, categories `education`, `productivity`).
- `404.html` with `noindex, follow`, branded legal-page shell, and links back to home, privacy, and terms.
- `<meta name="author">`, `<meta name="application-name">`, `<meta name="apple-mobile-web-app-title">` in `index.html`.
- `<link rel="apple-touch-icon">`, `<link rel="mask-icon">`, `<link rel="manifest">` on `index.html`, `privacy.html`, `terms.html`.
- `<link rel="alternate" type="text/plain" href="/llms.txt">` discovery hint in `index.html`.
- `sitemap.xml` now uses the Google image extension and lists `og-image.png` under the home URL.
- Security headers in `vercel.json`: `Strict-Transport-Security` (2 years, includeSubDomains, preload), `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin`, and `Content-Security-Policy-Report-Only` with explicit allowlists for self, `https://unpkg.com`, `https://va.vercel-scripts.com`, Google Fonts, and Vercel Insights.
- Dedicated `vercel.json` route for `/og-image.png` with `Cross-Origin-Resource-Policy: cross-origin` so social crawlers can embed the preview while the rest of the origin keeps the strict `same-origin` CORP.
- Subresource Integrity (`integrity="sha384-..."`, `crossorigin="anonymous"`, `referrerpolicy="no-referrer"`) on the pinned Lucide CDN script.

#### Changed
- `<html lang="en">` -> `<html lang="en-US">` on `index.html`, `privacy.html`, `terms.html`, `404.html`.
- HTML cache policy in `vercel.json` extended to include `404.html`.

### Phase 3 - GEO and AI visibility

#### Added
- `llms.txt` at repo root. Factual product brief with operator, contact, license, audience, pricing, canonical URLs, the five mode names matching `generator.js` and `config/sot.json`, trust posture, explicit limitations ("the Service does NOT call any AI API"), and useful links.
- `.well-known/security.txt` (RFC 9116) with `Contact`, `Expires`, `Preferred-Languages`, `Canonical`, `Policy`.
- `robots.txt` rewritten with an explicit, auditable AI policy. Default `Allow: /` retained; citation and search bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Applebot, Applebot-Extended, Google-Extended, Bingbot, ClaudeBot, Claude-Web, Meta-ExternalAgent) and training crawlers (GPTBot, CCBot, anthropic-ai, Bytespider, Diffbot, Amazonbot, cohere-ai) enumerated. Stance: allow all. To tighten later, change `Allow: /` to `Disallow: /` for the training block only.
- Dedicated `vercel.json` routes with `Content-Type: text/plain; charset=utf-8` for `/llms.txt` and `/.well-known/security.txt`, and `application/manifest+json` for `/manifest.webmanifest`.

#### Changed
- `terms.html` section 1: added a single compliance-clarity sentence stating the Service is free and processes no purchases. Reduces ad-reviewer ambiguity around pricing and operator identity.

#### Decisions and skips
- `ai.txt` (Spawning AI opt-out) intentionally not added. The chosen stance allows all training crawlers, so an opt-out file would be redundant. Revisit if the stance later tightens.

### Tests

- `tests/structure.test.js` extended with assertions for `lang="en-US"` on all three pages, JSON-LD entities (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`, `BreadcrumbList`), OG image dimensions, SRI integrity, `<link rel="manifest">`, `<link rel="apple-touch-icon">`, `<link rel="mask-icon">`, the new robots.txt AI user-agents, sitemap image extension, `llms.txt` content (header, all five modes), `.well-known/security.txt` content (Contact, Expires), `manifest.webmanifest` presence, `404.html` noindex, and the existence of `og-image.png` and `apple-touch-icon.png` on disk.

### Quality gates (verified locally)

- `npm test`: docs hygiene passes; `tests/structure.test.js` 91/91 pass (up from 59/59 after the new SEO, GEO, and structured-data assertions); `lint:js` zero errors (the pre-existing `copy.js` `activeSectionId` unused-variable warning is unchanged and intentional per the 1.0.1 release notes).
- `npm run test:smoke`: 9/9 Playwright smoke tests pass at 320 / 375 / 768 px viewports.
- `npm run test:a11y`: pa11y reports zero issues on `index.html`, `privacy.html`, `terms.html`.
- `npm run test:e2e`: 8/8 Playwright core-flow tests pass (mode switching, session save / restore / cap-of-five / clear-undo, accordion behavior, keyboard navigation, copy fallback). Required by the [AGENTS.md](AGENTS.md) gate because head metadata was edited on a critical-flow page.

### Notes and post-release follow-ups

- The CSP is intentionally deployed in `Content-Security-Policy-Report-Only` mode first. After one week of clean reports in production, change the header key to `Content-Security-Policy` and consider tightening `script-src 'unsafe-inline'` and `style-src 'unsafe-inline'` by switching to nonces or pre-computed hashes for the JSON-LD block.
- `og-image.png` is 1.28 MB (mostly flat colors). Run through `pngquant` or `oxipng` post-merge to drop the file under 300 KB; cosmetic, not blocking.
- The integrity hash pins Lucide to `0.460.0`. Any future bump requires re-running the local hash computation and updating both the URL and the `integrity` attribute together.
- `twitter:site` / `twitter:creator` will be added in a future patch once a verified X/Twitter handle exists.
- The CSP `manifest-src 'self'` directive currently relies on the manifest being served from the same origin (it is, via Vercel). If the manifest is ever migrated to a CDN, update the directive.

---

## [1.0.1] - 2026-05-15 - Design system micro-polish

Visual consistency and token cleanup after US MVP launch. No product, IA, or copy-strategy changes.

### Fixed

- Dark theme: removed legacy purple accents on field focus, output border, layout divider, and sessions empty state; aligned with navy/blue brand tokens.
- Legal pages (`privacy.html`, `terms.html`): `body.legal` removes erroneous top padding meant for fixed nav (no empty 84px band).
- WCAG AA: secondary UI text uses `--text-muted` where `--text-light` failed contrast on white surfaces; grade-bar help text keeps tuned `#5F697E` on `--primary-50` background.

### Changed

- `style.css`: deduplicated `:root` shadow tokens; form fields use `--border` / `--surface-1`; output panel shadow uses navy rgba.
- Output CTA label `COPY PROMPT` → `Copy prompt`; font-weight 700 (matches sticky nav).
- Legal styles moved from inline `<style>` into shared `/* LEGAL PAGES */` block in `style.css`; both pages use `class="legal"` on `<body>`.
- Community CTA green unified with `--green` / `--green-dark`.
- Collapsible sections: Lucide `chevron-down`, `[aria-expanded="true"]` open state; rules step badge numeric `5` (matches library `4`).
- Grade bar: single visible label (graduation icon on “Pick a grade”); removed duplicate “Grade” label.
- Removed unused tokens: `--cta-hero-*`, `--bg-subtle`.
- Dark output CTA: gold brand (`--cta-bg`) instead of white inversion.
- Nav/tool `border-radius` via `--r-btn`; explicit transitions on primary buttons/tabs; mobile hero step labels 10px.

### Quality gates (verified)

- `npm run test:mixed`: pass (structure 59/59, smoke 9/9, e2e 8/8, a11y zero issues on `index.html`, `privacy.html`, `terms.html`).

---

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
