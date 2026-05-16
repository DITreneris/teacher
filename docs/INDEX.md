# Documentation index

The single documentation navigation hub after `README.md`.

## Canonical rule

- Active / archived status is decided only in this file.
- If a document is not listed under "Active", it is treated as archived.
- Archived files are not updated unless explicitly returned to the active zone.

## Active documents (lean)

- [README.md](../README.md) - the only entry point.
- [INDEX.md](INDEX.md) - canonical documentation index.
- [DEPLOY.md](../DEPLOY.md) - deployment for humans (Vercel, DNS) and robots (sitemap, robots.txt).
- [AGENTS.md](../AGENTS.md) - role-based work and quality rules.
- [CHANGELOG.md](../CHANGELOG.md) - release notes.

## Active legal pages

- [privacy.html](../privacy.html) - US Privacy Policy.
- [terms.html](../terms.html) - Terms of Use + Responsible AI disclaimer + Classroom License (`#paid-pdf-license`) + 14-day refund clause.

## Active post-purchase flow

- [success.html](../success.html) - Post-purchase confirmation page; polls `/api/download-link` until the Stripe webhook has finished, then surfaces a one-click download button + masked email + license / refund recap.

## Active PDF authoring source

- [pdf-source/](pdf-source/) - HTML and CSS source for the paid PDF guides; export via browser Save-as-PDF per [pdf-source/README.md](pdf-source/README.md).
- [pdf-source/beginners-prompt-anatomy.html](pdf-source/beginners-prompt-anatomy.html) - 12-page Beginner guide source.
- [pdf-source/advanced-prompt-anatomy.html](pdf-source/advanced-prompt-anatomy.html) - 24-page Advanced guide source.
- [pdf-source/pdf-print.css](pdf-source/pdf-print.css) - shared print stylesheet for both guides.

## Code navigation

- [index.html](../index.html)
- [404.html](../404.html)
- [generator.js](../generator.js)
- [copy.js](../copy.js)
- [api/stripe-webhook.js](../api/stripe-webhook.js)
- [api/download.js](../api/download.js) - long-lived (7-day) signed download endpoint, used by the email link.
- [api/download-link.js](../api/download-link.js) - JSON endpoint returning a short-lived (15-min) in-page download URL by Stripe Checkout Session ID; used by `success.html`.
- [api/_lib/fulfillment.js](../api/_lib/fulfillment.js)
- [assets/pdf-covers/beginners.png](../assets/pdf-covers/beginners.png) - public web cover for the Beginners PDF guide card.
- [assets/pdf-covers/advanced.png](../assets/pdf-covers/advanced.png) - public web cover for the Advanced PDF guide card.
- [assets/pdf-covers/beginners-p2.png](../assets/pdf-covers/beginners-p2.png), `-p3.png`, `-p4.png` - PREVIEW-watermarked sample pages 2-4 of the Beginners guide, rendered by `scripts/verify-pdf-cover.js --preview` and shown inside the public "Preview 3 pages" lightbox.
- [assets/pdf-covers/advanced-p2.png](../assets/pdf-covers/advanced-p2.png), `-p3.png`, `-p4.png` - PREVIEW-watermarked sample pages 2-4 of the Advanced guide.
- [style.css](../style.css)
- [config/sot.json](../config/sot.json)
- [vercel.json](../vercel.json)
- [robots.txt](../robots.txt)
- [sitemap.xml](../sitemap.xml)
- [humans.txt](../humans.txt)
- [llms.txt](../llms.txt)
- [.well-known/security.txt](../.well-known/security.txt)
- [manifest.webmanifest](../manifest.webmanifest)
- [og-image.png](../og-image.png)
- [apple-touch-icon.png](../apple-touch-icon.png)
- [DEPLOY.md](../DEPLOY.md)
- [tests/structure.test.js](../tests/structure.test.js)
- [tests/e2e/core-flow.spec.js](../tests/e2e/core-flow.spec.js)
- [tests/e2e/smoke.spec.js](../tests/e2e/smoke.spec.js)

## Archive

- [archive/pre-github-cleanup_2026-03/](archive/pre-github-cleanup_2026-03/)
- [archive/legacy-mokytojas_2026-03/](archive/legacy-mokytojas_2026-03/)
- [archive/legacy-di-promptu-biblioteka_2026-02/](archive/legacy-di-promptu-biblioteka_2026-02/)
- [archive/legacy-vaizdo-generatorius_2026-02/](archive/legacy-vaizdo-generatorius_2026-02/)
