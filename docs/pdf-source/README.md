# PDF source files

HTML + CSS source for the two paid Prompt Anatomy PDF guides. Output PDFs are produced via browser **Save as PDF** (no extra dependencies, no build pipeline). Brand: every page footer shows `Prompt Anatomy | www.promptanatomy.app | Page N`.

## Files

- [beginners-prompt-anatomy.html](beginners-prompt-anatomy.html) - 12-page Beginner guide.
- [advanced-prompt-anatomy.html](advanced-prompt-anatomy.html) - 24-page Advanced guide.
- [pdf-print.css](pdf-print.css) - shared print stylesheet (`@page`, fixed footer, brand tokens from [config/sot.json](../../config/sot.json)).

## Output filenames (canonical)

- `Beginners_PromptAnatomy.app.pdf` - 12 pages.
- `Advanced_PromptAnatomy.app.pdf` - 24 pages.

Place exported PDFs in [api/\_private/pdfs/](../../api/_private/pdfs/) for local testing only. Production fulfillment must use private object storage via `PDF_BEGINNERS_SOURCE_URL` and `PDF_ADVANCED_SOURCE_URL` (see [api/\_private/pdfs/README.md](../../api/_private/pdfs/README.md)). PDF binaries are gitignored by `.gitignore` rule `api/_private/pdfs/*.pdf`.

## Export procedure (Chrome / Edge)

1. Serve the repo locally so Google Fonts load:

```bash
npx serve . -l 3000
```

2. Open `http://127.0.0.1:3000/docs/pdf-source/beginners-prompt-anatomy.html` in Chrome.
3. Press `Ctrl+P` (or `Cmd+P`).
4. Apply these print settings exactly:

| Setting | Value |
|---|---|
| Destination | **Save as PDF** |
| Pages | **All** |
| Paper size | **Letter** |
| Pages per sheet | **1** |
| Margins | **None** (the HTML defines its own page padding) |
| Scale | **Default** (100%) |
| Two-sided | **Off** |
| Options - Headers and footers | **OFF** |
| Options - Background graphics | **ON** (required - cover page and brand colors will not render without this) |

5. Save as `Beginners_PromptAnatomy.app.pdf`.
6. Verify in the saved PDF:
   - Exact page count: **12** for Beginner, **24** for Advanced.
   - Brand footer (`Prompt Anatomy ... www.promptanatomy.app ... Page N`) is visible on every page.
   - Cover page renders the dark navy background and gold accent (proves background graphics is on).
   - No orphaned headings or cut-off prompt blocks.
7. Repeat for `advanced-prompt-anatomy.html`, saving as `Advanced_PromptAnatomy.app.pdf`.

## Why this pipeline

The repo runs on Vercel as static HTML plus serverless API routes with no build step. Adding a Node-based PDF toolchain (Pandoc, Puppeteer, WeasyPrint) would expand the dependency surface without product benefit at this scale. Hand-built HTML keeps every brand decision visible in source and supports rapid edits.

## Editing rules

- Each printed page is one `<section class="page">`. Do not move content across page boundaries without also moving the `.brand-footer`.
- Update the `Page N` value in the footer whenever pages are reordered.
- Keep total page count exact: 12 (Beginner), 24 (Advanced).
- Do not change `@page { size: Letter; margin: 0; }` in [pdf-print.css](pdf-print.css). Inner padding inside `.page` controls margins so the fixed `.brand-footer` lands consistently in print.
- Brand tokens (deep blue `#0F2A44`, gold `#F5C518`, soft blue `#2F6FED`) must match [config/sot.json](../../config/sot.json) colors and `theme.light`.
- Prompt blocks use class `.prompt-block`. The dark variant uses navy with gold labels; `.prompt-block-light` uses a soft surface for templates teachers will edit.
- Do not place student PII into examples. Use general non-identifying phrasing (`some students need vocabulary support`).

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Cover page is white | Background graphics is OFF in print dialog | Turn ON in Chrome Print > More settings |
| Page count is wrong | A long section overflowed | Trim the section or split content; verify each `.page` ends with a `.brand-footer` |
| Footer URL is plain black | CSS not loaded - viewing file directly | Serve via `npx serve` so the `link rel="stylesheet"` resolves |
| Fonts look generic | Google Fonts not loaded | Serve locally and ensure internet is available; system falls back to `Segoe UI` which is acceptable |
| Footer overlaps text | A section is too long for one printed page | Shorten content or move a subsection to a new `.page` |

## Updating the guides

When the content changes, follow this loop:

1. Edit the relevant HTML file. Preview in browser at 100% zoom.
2. Run the export procedure for the affected file only.
3. Replace the previous PDF in your private storage.
4. Note the change under `[Unreleased]` in [../../CHANGELOG.md](../../CHANGELOG.md).
5. If front-of-house copy (UI cards, prices, titles) changes, update [../../index.html](../../index.html) and [../../tests/structure.test.js](../../tests/structure.test.js) and re-run `npm test`, `npm run test:smoke`, `npm run test:a11y`, and `npm run test:e2e` per [../../AGENTS.md](../../AGENTS.md).
