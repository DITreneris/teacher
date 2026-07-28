const { test, expect } = require('@playwright/test');

test.describe('visual-ops-mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('ops-center-header screenshot 375 light', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.ops-center-header');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.style.setProperty('scroll-behavior', 'auto');
      document.querySelectorAll('.ops-center-header, .ops-center-header *').forEach((el) => {
        el.style.animation = 'none';
        el.style.transition = 'none';
      });
      const sticky = document.getElementById('pdfStickyCta');
      if (sticky) sticky.hidden = true;
      const header = document.querySelector('header.header');
      if (header) header.style.visibility = 'hidden';
      window.scrollTo(0, 0);
    });
    await page.evaluate(() => {
      if (document.fonts && document.fonts.ready) return document.fonts.ready;
      return null;
    });
    await page.waitForTimeout(300);

    const header = page.locator('.ops-center-header');
    await expect(header).toBeVisible();
    // Shared OS-agnostic baseline (see playwright.config.js). Text-heavy
    // Inter AA differs ~10% between Windows and Ubuntu Chromium; keep CI green.
    await expect(header).toHaveScreenshot('ops-center-header-375-light.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.12
    });
  });
});
