'use strict';

/**
 * Renders the first page of each generated PDF using pdf.js (bundled in Chromium)
 * and screenshots it so we can verify the dark cover background actually printed.
 */

const path = require('path');
const fs = require('fs');
const { chromium } = require('@playwright/test');

const ROOT = path.resolve(__dirname, '..');
const PDFS = [
  { label: 'beginners', pdf: path.join(ROOT, 'api', '_private', 'pdfs', 'Beginners_PromptAnatomy.app.pdf'), out: path.join(ROOT, 'scripts', 'pdf-cover-beginners.png') },
  { label: 'advanced', pdf: path.join(ROOT, 'api', '_private', 'pdfs', 'Advanced_PromptAnatomy.app.pdf'), out: path.join(ROOT, 'scripts', 'pdf-cover-advanced.png') }
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1200 } });
  const page = await ctx.newPage();

  for (const item of PDFS) {
    const pdfBytes = fs.readFileSync(item.pdf);
    const dataUri = `data:application/pdf;base64,${pdfBytes.toString('base64')}`;

    const html = `<!DOCTYPE html><html><head><style>
      html,body{margin:0;padding:0;background:#888;}
      #c{display:block;margin:0 auto;background:#FFF;}
    </style></head><body>
    <canvas id="c"></canvas>
    <script type="module">
      import * as pdfjs from 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.min.mjs';
      pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs';
      const url = ${JSON.stringify(dataUri)};
      const loadingTask = pdfjs.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.2 });
      const canvas = document.getElementById('c');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;
      window.__rendered = true;
    </script></body></html>`;

    await page.setContent(html, { waitUntil: 'load' });
    await page.waitForFunction(() => window.__rendered === true, { timeout: 30000 });
    const canvas = await page.$('#c');
    await canvas.screenshot({ path: item.out });
    console.log(`Rendered ${item.label} cover -> ${path.relative(ROOT, item.out)}`);
  }

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
