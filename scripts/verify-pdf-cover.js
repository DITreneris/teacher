'use strict';

/**
 * Renders pages of each generated PDF using pdf.js (loaded inside a headless
 * Chromium) and screenshots them. Used for two purposes:
 *
 * 1. Verification (default behaviour): render page 1 of each guide and write it to
 *    `scripts/pdf-cover-<label>.png` (gitignored) so a maintainer can eyeball the
 *    cover background, white text, and gold accents printed correctly.
 *
 * 2. Preview generation (--preview flag): also render pages 2, 3, 4 with a
 *    diagonal "PREVIEW" watermark and write them to
 *    `assets/pdf-covers/<label>-p<n>.png`. These are consumed by the public
 *    success page / the "Preview 3 pages" lightbox on the buy card. The
 *    watermark protects the paid content from being trivially repurposed.
 *
 * Run examples:
 *   node scripts/verify-pdf-cover.js
 *   node scripts/verify-pdf-cover.js --preview
 */

const path = require('path');
const fs = require('fs');
const { chromium } = require('@playwright/test');

const ROOT = path.resolve(__dirname, '..');
const PDFS = [
  {
    label: 'beginners',
    pdf: path.join(ROOT, 'api', '_private', 'pdfs', 'Beginners_PromptAnatomy.app.pdf'),
    coverOut: path.join(ROOT, 'scripts', 'pdf-cover-beginners.png'),
    previewOutDir: path.join(ROOT, 'assets', 'pdf-covers'),
    previewPrefix: 'beginners'
  },
  {
    label: 'advanced',
    pdf: path.join(ROOT, 'api', '_private', 'pdfs', 'Advanced_PromptAnatomy.app.pdf'),
    coverOut: path.join(ROOT, 'scripts', 'pdf-cover-advanced.png'),
    previewOutDir: path.join(ROOT, 'assets', 'pdf-covers'),
    previewPrefix: 'advanced'
  }
];

const PREVIEW_PAGES = [2, 3, 4];
const args = process.argv.slice(2);
const RENDER_PREVIEWS = args.includes('--preview');

function buildHtml(dataUri, pageIndex, watermark) {
  return `<!DOCTYPE html><html><head><style>
      html,body{margin:0;padding:0;background:#888;}
      #c{display:block;margin:0 auto;background:#FFF;}
    </style></head><body>
    <canvas id="c"></canvas>
    <script type="module">
      import * as pdfjs from 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.min.mjs';
      pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs';
      const url = ${JSON.stringify(dataUri)};
      const watermark = ${JSON.stringify(watermark || '')};
      const pageIndex = ${JSON.stringify(pageIndex)};
      const loadingTask = pdfjs.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(pageIndex);
      const viewport = page.getViewport({ scale: 1.2 });
      const canvas = document.getElementById('c');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;

      if (watermark) {
        ctx.save();
        ctx.fillStyle = 'rgba(15, 42, 68, 0.16)';
        ctx.font = 'bold 84px "Inter", "Helvetica Neue", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const stride = 220;
        ctx.translate(cx, cy);
        ctx.rotate(-Math.PI / 6);
        for (let y = -canvas.height; y <= canvas.height; y += stride) {
          for (let x = -canvas.width; x <= canvas.width; x += stride * 1.7) {
            ctx.fillText(watermark, x, y);
          }
        }
        ctx.restore();
      }

      window.__rendered = true;
    </script></body></html>`;
}

async function renderToFile(page, dataUri, outputPath, pageIndex, watermark) {
  await page.setContent(buildHtml(dataUri, pageIndex, watermark), { waitUntil: 'load' });
  await page.waitForFunction(() => window.__rendered === true, { timeout: 30000 });
  const canvas = await page.$('#c');
  await canvas.screenshot({ path: outputPath });
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1200 } });
  const page = await ctx.newPage();

  for (const item of PDFS) {
    if (!fs.existsSync(item.pdf)) {
      console.warn(`Skipping ${item.label}: ${item.pdf} not found.`);
      continue;
    }
    const pdfBytes = fs.readFileSync(item.pdf);
    const dataUri = `data:application/pdf;base64,${pdfBytes.toString('base64')}`;

    await renderToFile(page, dataUri, item.coverOut, 1, '');
    console.log(`Rendered ${item.label} cover -> ${path.relative(ROOT, item.coverOut)}`);

    if (!RENDER_PREVIEWS) continue;
    if (!fs.existsSync(item.previewOutDir)) {
      fs.mkdirSync(item.previewOutDir, { recursive: true });
    }
    for (const pageNumber of PREVIEW_PAGES) {
      const out = path.join(item.previewOutDir, `${item.previewPrefix}-p${pageNumber}.png`);
      await renderToFile(page, dataUri, out, pageNumber, 'PREVIEW');
      console.log(`Rendered ${item.label} preview p${pageNumber} -> ${path.relative(ROOT, out)}`);
    }
  }

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
