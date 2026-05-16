const { test, expect } = require('@playwright/test');

const viewports = [
  { name: 'small-phone', width: 320, height: 640 },
  { name: 'phone', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 }
];

for (const viewport of viewports) {
  test.describe(`smoke:${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test('core UI renders and mode/class switching works', async ({ page }) => {
      await page.goto('/');

      await expect(page.locator('#operationsCenter')).toBeVisible();
      await expect(page.locator('#opsOutput')).toBeVisible();
      await expect(page.locator('#pdf-guides')).toBeVisible();
      // Stripe hrefs are hydrated from config/sot.json#commerce.stripePaymentLinks by generator.js
      await expect.poll(
        () => page.locator('[data-product="beginners-pdf"]').getAttribute('href'),
        { timeout: 5000 }
      ).toMatch(/buy\.stripe\.com/);
      await expect.poll(
        () => page.locator('[data-product="advanced-pdf"]').getAttribute('href'),
        { timeout: 5000 }
      ).toMatch(/buy\.stripe\.com/);

      const beginnersCover = page.locator('.pdf-guide-card .pdf-guide-card-cover img').first();
      await expect(beginnersCover).toHaveAttribute('src', /\/assets\/pdf-covers\/beginners\.png/);
      await expect(beginnersCover).toHaveAttribute('alt', /^Cover of /);
      await beginnersCover.scrollIntoViewIfNeeded();
      await expect.poll(async () => beginnersCover.evaluate((img) => img.complete && img.naturalWidth || 0)).toBeGreaterThan(100);

      await expect(page.locator('.pdf-guide-card .pdf-guide-license').first()).toContainText('Classroom license');
      await expect(page.locator('.pdf-guide-card .pdf-guide-refund').first()).toContainText('14-day no-questions refund');
      await expect(page.locator('.pdf-guide-card .pdf-guide-trust').first()).toContainText('Stripe checkout');
      await expect(page.locator('.pdf-guide-card .pdf-guide-promise [data-commerce-delivery-promise]').first()).not.toBeEmpty();

      await page.click('[data-mode="ASSESSMENT"]');
      await expect(page.locator('[data-mode="ASSESSMENT"]')).toHaveClass(/is-active/);
      await expect(page.locator('#form-assessment')).toBeVisible();

      await page.selectOption('#classLevelSelect', '10');
      await expect(page.locator('#classBadge')).toHaveText(/Grade\s*10/i);

      const outputText = await page.locator('#opsOutput').innerText();
      expect(outputText.length).toBeGreaterThan(40);

      const charCount = Number(await page.locator('#outputCharCount').innerText());
      expect(charCount).toBeGreaterThan(40);
    });

    test('no horizontal overflow on critical mobile widths', async ({ page }) => {
      await page.goto('/');
      const hasOverflow = await page.evaluate(() => {
        const root = document.documentElement;
        return root.scrollWidth > root.clientWidth;
      });
      expect(hasOverflow).toBeFalsy();
    });

    test('mobile journey: journey-next link and step anchors visible', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('#journeyNextWrap')).toBeVisible();
      await expect(page.locator('#journeyNextLink')).toHaveAttribute('href', '#opsOutputSection');
      await expect(page.locator('.header-step[href="#opsForm"]')).toBeVisible();
      await expect(page.locator('.header-step[href="#opsOutputSection"]')).toBeVisible();
      await page.click('a[href="#opsOutputSection"]');
      await expect(page.locator('#opsOutputSection')).toBeInViewport({ timeout: 3000 });
    });
  });
}
