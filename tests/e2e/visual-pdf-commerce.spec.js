const { test, expect } = require('@playwright/test');

const VIEWPORTS = [
  { name: '320', width: 320, height: 720 },
  { name: '768', width: 768, height: 900 },
  { name: '1280', width: 1280, height: 900 }
];

const THEMES = ['light', 'dark'];

async function stabilizePdfGuides(page, theme) {
  await page.goto('/#pdf-guides');
  await page.waitForSelector('[data-commerce-testimonials] li', { timeout: 5000 });
  await page.evaluate((mode) => {
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
    var sticky = document.getElementById('pdfStickyCta');
    if (sticky) sticky.hidden = true;
    var header = document.querySelector('header.header');
    if (header) header.style.visibility = 'hidden';
    document.querySelectorAll('#pdf-guides, #pdf-guides *').forEach(function (el) {
      el.style.animation = 'none';
      el.style.transition = 'none';
    });
    var section = document.getElementById('pdf-guides');
    if (section) {
      section.style.scrollMarginTop = '0px';
      var y = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, Math.round(y));
    }
  }, theme);
  await page.waitForFunction(() => {
    const imgs = Array.prototype.slice.call(document.querySelectorAll('#pdf-guides img'));
    return imgs.length > 0 && imgs.every((img) => img.complete && img.naturalWidth > 0);
  }, null, { timeout: 10000 });
  await page.evaluate(() => {
    if (document.fonts && document.fonts.ready) return document.fonts.ready;
    return null;
  });
  const section = page.locator('#pdf-guides');
  await page.evaluate(() => {
    var el = document.getElementById('pdf-guides');
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo(0, Math.round(y));
  });
  await page.waitForTimeout(500);
  return section;
}

for (const viewport of VIEWPORTS) {
  for (const theme of THEMES) {
    test.describe(`visual-pdf:${viewport.name}:${theme}`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });

      test(`#pdf-guides screenshot ${viewport.name} ${theme}`, async ({ page }) => {
        const section = await stabilizePdfGuides(page, theme);
        const box = await section.boundingBox();
        expect(box).toBeTruthy();
        // Clip page screenshot avoids flaky full-element stability on tall flex-ordered sections.
        await expect(page).toHaveScreenshot(`pdf-guides-${viewport.name}-${theme}.png`, {
          clip: {
            x: Math.max(0, Math.floor(box.x)),
            y: Math.max(0, Math.floor(box.y)),
            width: Math.ceil(box.width),
            height: Math.min(Math.ceil(box.height), 2400)
          },
          maxDiffPixelRatio: 0.04,
          animations: 'disabled',
          timeout: 15000
        });
      });
    });
  }
}
