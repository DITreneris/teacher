'use strict';

/**
 * scripts/export-pdfs.js
 *
 * Generates the two paid PDF guides from docs/pdf-source/*.html using Playwright's
 * Chromium (already a dev dependency). Output goes to api/_private/pdfs/, which is
 * gitignored. Reports page count and file size for each guide.
 *
 * Run: node scripts/export-pdfs.js
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const ROOT = path.resolve(__dirname, '..');
const SOURCES = [
  {
    label: 'Beginners',
    expectedPages: 12,
    htmlPath: path.join(ROOT, 'docs', 'pdf-source', 'beginners-prompt-anatomy.html'),
    outPath: path.join(ROOT, 'api', '_private', 'pdfs', 'Beginners_PromptAnatomy.app.pdf')
  },
  {
    label: 'Advanced',
    expectedPages: 24,
    htmlPath: path.join(ROOT, 'docs', 'pdf-source', 'advanced-prompt-anatomy.html'),
    outPath: path.join(ROOT, 'api', '_private', 'pdfs', 'Advanced_PromptAnatomy.app.pdf')
  }
];

function fileUrl(p) {
  const abs = path.resolve(p).replace(/\\/g, '/');
  return abs.startsWith('/') ? `file://${abs}` : `file:///${abs}`;
}

function countPdfPages(buffer) {
  const text = buffer.toString('latin1');
  const matches = text.match(/\/Type\s*\/Page[^s]/g);
  return matches ? matches.length : 0;
}

async function exportOne(browser, source) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  await page.goto(fileUrl(source.htmlPath), { waitUntil: 'networkidle' });

  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });

  await page.emulateMedia({ media: 'print' });

  fs.mkdirSync(path.dirname(source.outPath), { recursive: true });

  await page.pdf({
    path: source.outPath,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    displayHeaderFooter: false
  });

  await ctx.close();

  const buffer = fs.readFileSync(source.outPath);
  const pageCount = countPdfPages(buffer);
  const sizeKb = (buffer.length / 1024).toFixed(1);
  const ok = pageCount === source.expectedPages;
  const status = ok ? 'OK' : 'WARN';

  console.log(
    `[${status}] ${source.label.padEnd(10)} pages=${pageCount} (expected ${source.expectedPages}) size=${sizeKb} KB -> ${path.relative(ROOT, source.outPath)}`
  );

  return ok;
}

(async () => {
  const browser = await chromium.launch();
  let allOk = true;
  try {
    for (const source of SOURCES) {
      const ok = await exportOne(browser, source);
      if (!ok) allOk = false;
    }
  } finally {
    await browser.close();
  }
  if (!allOk) {
    console.warn('\nOne or more PDFs do not match the expected page count. Review the HTML for sections that overflow.');
    process.exitCode = 1;
  } else {
    console.log('\nBoth PDFs generated and page counts match.');
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
