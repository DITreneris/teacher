# Changelog

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/); versioning follows [Semantic Versioning](https://semver.org/).

## [Unreleased] - Secure paid PDF fulfillment

Production-ready paid PDF delivery for two optional guides while preserving the free, no-account prompt-builder workflow.

### Added
- `index.html` and `style.css`: optional paid PDF guide section with two Stripe checkout CTAs, sale pricing, and responsive product-card styling.
- `api/stripe-webhook.js`, `api/download.js`, and `api/_lib/fulfillment.js`: Stripe webhook fulfillment, Upstash Redis-backed token records, signed download links, Resend email delivery, and protected PDF streaming.
- `api/_private/pdfs/README.md`: private PDF source guidance for local testing and production object-storage setup.
- Runtime dependencies for secure fulfillment: `stripe`, `resend`, and `@upstash/redis`.
- `docs/pdf-source/` authoring folder with publication-ready HTML and CSS source for the two paid PDF guides. No new dependencies; pipeline is hand-built HTML/CSS + browser Save-as-PDF.
  - `docs/pdf-source/beginners-prompt-anatomy.html` - 12-page Beginner guide titled "AI-Assisted Teaching Foundations". Sections: cover, AI safety start, Simple Prompt Formula, 10 ready-to-use teacher prompts, lesson packs (30 / 45 min / differentiated), assessment and exit-ticket packs, differentiation packs, feedback packs, 7-point AI output verification checklist, glossary and beginner mistakes, "use this tomorrow" 5-step workflow, and source appendix.
  - `docs/pdf-source/advanced-prompt-anatomy.html` - 24-page Advanced guide titled "AI-Enhanced Instructional Design". Sections: cover, executive overview, instructional design foundations table, Bloom and DOK quick reference, methodologist master prompt, backward design pipeline, UDL prompt system, differentiation transformations (DOK 1 to DOK 4), curriculum audit framework with scoring 1-4, lesson review rubric, prompt quality rubric, 90-min / half-day / full-day / 4-week PD models, coaching model and adoption ladder, 6-phase school rollout, QA and governance workflow, risk register, readiness and observation checklists, 90-day implementation roadmap, and three composite case studies (elementary, high school department, district PD rollout) plus source/license appendix.
  - `docs/pdf-source/pdf-print.css` - shared print stylesheet aligned to brand tokens from `config/sot.json` (deep blue `#0F2A44`, gold `#F5C518`, soft blue `#2F6FED`). `@page { size: Letter; margin: 0 }`. Each `.page` is exactly `279.4mm` tall (Letter height) with `overflow: hidden` so Chrome cannot auto-paginate sections that exceed one printed page. Fixed `.brand-footer` on every page shows `Prompt Anatomy ... www.promptanatomy.app ... Page N`.
  - `docs/pdf-source/README.md` - export procedure (Chrome / Edge Save-as-PDF with margins None, background graphics ON, headers/footers OFF), canonical filenames (`Beginners_PromptAnatomy.app.pdf`, `Advanced_PromptAnatomy.app.pdf`), private storage routing via `PDF_BEGINNERS_SOURCE_URL` / `PDF_ADVANCED_SOURCE_URL`, and a troubleshooting table.
- `scripts/export-pdfs.js` - Playwright-based PDF generator. Loads each HTML via `file://`, waits for fonts (`document.fonts.ready`), emulates `print` media, then `page.pdf({ format: 'Letter', printBackground: true, preferCSSPageSize: true, margin: 0 })`. Writes to `api/_private/pdfs/`, counts pages from the PDF stream, and reports pass/fail vs the expected 12 / 24. Uses the existing `@playwright/test` dev dependency; no new packages.
- `scripts/check-overflow.js` - Playwright-based overflow auditor. For each `.page` section it temporarily clears `overflow:hidden` and `height`, measures `scrollHeight`, and flags any section whose natural content height would exceed `279.4mm`. Confirms zero clipping risk after typography compaction.
- `scripts/verify-pdf-cover.js` - renders the first page of each generated PDF using `pdfjs-dist` (fetched from CDN at runtime, no install) to confirm the cover background actually printed. Outputs `scripts/pdf-cover-beginners.png` and `scripts/pdf-cover-advanced.png` as visual evidence.
- `scripts/preview-cover.js` - debug helper that screenshots the cover at print emulation directly from the HTML.

### Changed
- `terms.html`, `privacy.html`, `llms.txt`, `README.md`, `DEPLOY.md`, and `package.json`: clarified that the prompt builder remains free while optional paid PDF guides are sold separately.
- `docs/INDEX.md` and `humans.txt`: documented the new Vercel serverless API surface.
- `vercel.json`: added no-store headers for API routes.
- `.eslintrc.json`: added Node overrides for Vercel API functions and for `scripts/**/*.js` (PDF authoring helpers run via `node`, so `require`, `__dirname`, `process`, and console output are expected).
- `.gitignore`: excludes local paid PDF binaries under `api/_private/pdfs/*.pdf`, and the local PNG previews written by `scripts/verify-pdf-cover.js` and `scripts/preview-cover.js` under `scripts/*.png`.
- `tests/structure.test.js` and `tests/e2e/smoke.spec.js`: added coverage for paid PDF cards, pricing, legal copy, and secure fulfillment route presence.
- `index.html` product card titles and aria-labels renamed for brand consistency: `Beginners PDF Guide` -> `Beginners - Prompt Anatomy`; `Advanced Educators PDF Guide` -> `Advanced - Prompt Anatomy`. Card descriptions updated to mention 12-page and 24-page formats and the actual sections. `data-product="beginners-pdf"`, `data-product="advanced-pdf"`, and the Stripe placeholder URLs are intentionally unchanged to keep environment variable keys and webhook handlers stable.
- `tests/structure.test.js`: assertions for the two PDF cards updated to match the new brand-consistent titles.
- `llms.txt`: pricing line uses the new product names.
- `docs/INDEX.md`: added a new "Active PDF authoring source" section that lists the `docs/pdf-source/` folder and its three files.
- `docs/pdf-source/pdf-print.css`: cover-page contrast and PDF-engine compatibility:
  - Body text raised from light gray (`#A4B2C3`, `#E8EEF6`) to pure `#FFFFFF`. Subtitle, "Read this first" callout body, audience/length/format meta block, and cover footer all now render at full white contrast on the dark navy background.
  - Field labels (`Audience:`, `Length:`, `Version:`, `Format:`, `Read this first`, `Strategic positioning`) recolored to brand gold `#F5C518` to keep visual hierarchy.
  - Footer divider line on the cover now uses subtle gold `rgba(245,197,24,0.45)` instead of muted white.
  - `.cover` background hardened: explicit solid `background-color: #0F2A44` first, then layered `background-image: linear-gradient(...)` on top, plus `-webkit-print-color-adjust: exact !important`. Some PDF viewers strip CSS gradients during render; the solid color guarantees the dark navy ground stays under the white text in every viewer (verified by rasterizing the generated PDFs through `pdfjs-dist` and inspecting the cover page).
- `docs/pdf-source/pdf-print.css`: typography compacted so each section fits in exactly one Letter page without Chrome auto-paginating:
  - Body 10.5pt -> 9.5pt; line-height 1.45 -> 1.35.
  - h2 18pt -> 15pt, h3 13pt -> 11pt, h4 11pt -> 10pt.
  - Tables 9.5pt -> 8.5pt, cell padding 2.5mm -> 2mm with explicit `line-height: 1.3`.
  - Prompt blocks 9pt -> 8pt, padding 4mm -> 3mm.
  - Page padding `18mm 18mm 22mm 18mm` -> `14mm 16mm 18mm 16mm`; brand footer offsets from `8mm` -> `6mm`.
  - Workflow step boxes, key-value lists, callouts, lead paragraphs, and check-list bullets all tightened proportionally.
- `docs/pdf-source/pdf-print.css`: `.page` and `.cover` switched from `min-height: 279.4mm` to exact `height: 279.4mm` plus `overflow: hidden`. With `min-height`, any section taller than one Letter page caused Chrome's print engine to flow the overflow into a second page, producing 17 / 31 pages instead of 12 / 24. The exact-height + clip approach guarantees one section = one printed page, with the overflow auditor confirming all 36 sections still fit within the bounds (largest delta -4.5mm of headroom on Advanced p4 Bloom/DOK).

### Deployment notes
- Replace placeholder Stripe Payment Link URLs in `index.html` before production launch.
- Required production services: Stripe Payment Links, Stripe webhook, Resend, Upstash Redis, and private PDF source URLs.
- Required webhook events: `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
- PDF binaries can be produced two ways. Both write to `api/_private/pdfs/` which is gitignored.
  - Automated (recommended): `node scripts/export-pdfs.js` from the repo root. Uses Playwright's bundled Chromium; takes ~25 seconds; reports page counts.
  - Manual: serve the repo with `npx serve . -l 3000`, open `docs/pdf-source/*.html` in Chrome / Edge, `Ctrl+P`, Save as PDF with margins None, headers/footers OFF, background graphics ON. See `docs/pdf-source/README.md`.
- Production uploads must go to private object storage referenced by `PDF_BEGINNERS_SOURCE_URL` and `PDF_ADVANCED_SOURCE_URL` (per `api/_private/pdfs/README.md`); the `api/_private/pdfs/` folder is for local testing only.

### Verified
- `npm test`: pass; 101/101 structural checks, zero lint errors, one pre-existing `copy.js` unused-variable warning.
- `npm run test:smoke`: 9/9 pass.
- `npm run test:a11y`: zero pa11y issues on `index.html`, `privacy.html`, `terms.html` after the card-title rename.
- `npm run test:e2e`: 8/8 pass.
- `npm audit --omit=dev`: 0 production vulnerabilities.
- `node scripts/export-pdfs.js`: Beginner = 12 pages (530.7 KB), Advanced = 24 pages (643.0 KB) - exact match.
- `node scripts/check-overflow.js`: all 36 sections fit within `279.4mm`; no clipping. Tightest sections: Advanced p4 Bloom/DOK (274.9mm, -4.5mm headroom), Advanced p9 Curriculum Audit (263.0mm), Advanced p24 Case study + appendix (253.2mm), Beginner p12 Appendix (231.5mm).
- `node scripts/verify-pdf-cover.js`: rasterized first page of each generated PDF; confirmed dark navy background, white title and body text, gold accent labels, and visible brand footer in both covers.

## [1.1.0] - 2026-05-15 - Technical SEO, GEO, and ads-compliance hardening

Three-phase technical hardening for US ad approval, search engine indexability, and AI search visibility. All changes are metadata, configuration, schema, security headers, and crawler-facing files. No frontend redesign. The only new visible assets are `og-image.png` and `apple-touch-icon.png`, which surface in social previews, search snippets, and OS home screens, not in the live page UI.

### US K-12 copy polish

#### Changed
- `index.html`: tightened visible mode and rules copy for a more native US K-12 teacher audience (`Classwork and homework`, `Teaching methods and priorities`, and softer lesson-quality framing).
- `config/sot.json` and `generator.js`: aligned dynamic mode labels, fallback labels, quality rules, and teaching-strategy template language (`instructional moves`, `prevention steps`).
- `privacy.html` and `llms.txt`: softened broad privacy and FERPA-adjacent wording while preserving the no-account, local-storage-only trust posture.

#### Verified
- `npm test`: pass with the pre-existing `copy.js` unused-variable warning and zero errors.
- `npm run test:smoke`: 9/9 pass.
- `npm run test:a11y`: zero pa11y issues.
- `npm run test:e2e`: 8/8 pass.

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
- `privacy.html` - US Privacy Policy (prompt-workflow privacy disclosure, localStorage disclosure, Vercel Analytics, FERPA-aware privacy posture, no student PII statement). Uses `style.css` design tokens.
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
