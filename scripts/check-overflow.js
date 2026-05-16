'use strict';

/**
 * scripts/check-overflow.js
 *
 * For each .page section in the PDF source HTML files, measures the actual
 * content scroll height vs the page container height. Reports any section
 * whose content is taller than 279.4mm (would be clipped by overflow:hidden).
 */

const path = require('path');
const { chromium } = require('@playwright/test');

const ROOT = path.resolve(__dirname, '..');
const SOURCES = [
  { label: 'Beginners', htmlPath: path.join(ROOT, 'docs', 'pdf-source', 'beginners-prompt-anatomy.html') },
  { label: 'Advanced', htmlPath: path.join(ROOT, 'docs', 'pdf-source', 'advanced-prompt-anatomy.html') }
];

function fileUrl(p) {
  const abs = path.resolve(p).replace(/\\/g, '/');
  return abs.startsWith('/') ? `file://${abs}` : `file:///${abs}`;
}

async function checkOne(browser, source) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(fileUrl(source.htmlPath), { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });
  await page.emulateMedia({ media: 'print' });

  const results = await page.evaluate(() => {
    const pageHeightMm = 279.4;
    const mmPerPx = 25.4 / 96;
    const sections = Array.from(document.querySelectorAll('.page'));
    return sections.map((el, idx) => {
      const prevHeight = el.style.height;
      const prevOverflow = el.style.overflow;
      el.style.height = 'auto';
      el.style.overflow = 'visible';
      const naturalHeightMm = el.scrollHeight * mmPerPx;
      el.style.height = prevHeight;
      el.style.overflow = prevOverflow;
      const eyebrow = el.querySelector('.page-eyebrow');
      const title = el.querySelector('h2, h1');
      return {
        page: idx + 1,
        label: (eyebrow && eyebrow.innerText.split('\n')[0]) || (title && title.innerText) || `(page ${idx + 1})`,
        contentHeightMm: Math.round(naturalHeightMm * 10) / 10,
        overflow: naturalHeightMm > pageHeightMm + 0.5
      };
    });
  });

  await ctx.close();

  console.log(`\n=== ${source.label} ===`);
  for (const r of results) {
    const flag = r.overflow ? '!! OVERFLOW' : 'ok';
    const delta = (r.contentHeightMm - 279.4).toFixed(1);
    console.log(
      `  p${String(r.page).padStart(2)}  ${flag.padEnd(11)}  content=${r.contentHeightMm}mm  delta=${delta}mm  ${r.label}`
    );
  }
  return results.filter((r) => r.overflow);
}

(async () => {
  const browser = await chromium.launch();
  let total = 0;
  try {
    for (const source of SOURCES) {
      const overflowing = await checkOne(browser, source);
      total += overflowing.length;
    }
  } finally {
    await browser.close();
  }
  if (total > 0) {
    console.log(`\n${total} section(s) overflow the printable area. Trim those sections.`);
    process.exitCode = 1;
  } else {
    console.log('\nAll sections fit within 279.4mm. No clipping.');
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
