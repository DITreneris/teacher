'use strict';

const path = require('path');
const { chromium } = require('@playwright/test');

const ROOT = path.resolve(__dirname, '..');

function fileUrl(p) {
  const abs = path.resolve(p).replace(/\\/g, '/');
  return abs.startsWith('/') ? `file://${abs}` : `file:///${abs}`;
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 816, height: 1056 } });
  const page = await ctx.newPage();
  const html = path.join(ROOT, 'docs', 'pdf-source', 'beginners-prompt-anatomy.html');
  await page.goto(fileUrl(html), { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await page.emulateMedia({ media: 'print' });
  const cover = await page.$('.cover');
  await cover.screenshot({ path: path.join(ROOT, 'scripts', 'cover-preview.png') });
  const bg = await cover.evaluate((el) => getComputedStyle(el).background);
  console.log('Cover computed background:', bg.slice(0, 200));
  await browser.close();
  console.log('Screenshot saved: scripts/cover-preview.png');
})();
