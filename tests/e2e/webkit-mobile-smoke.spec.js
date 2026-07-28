const { test, expect } = require('@playwright/test');

function sectionOverflows(section) {
  return section.scrollWidth > section.clientWidth + 1;
}

test.describe('webkit-mobile-smoke', () => {
  test('no horizontal overflow on home', async ({ page }) => {
    await page.goto('/');
    const hasOverflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth > root.clientWidth;
    });
    expect(hasOverflow).toBeFalsy();
  });

  test('pdf-guides section has no horizontal overflow', async ({ page }) => {
    await page.goto('/#pdf-guides');
    await page.waitForSelector('[data-commerce-testimonials] li', { timeout: 5000 });
    const pdfOverflow = await page.locator('#pdf-guides').evaluate(sectionOverflows);
    expect(pdfOverflow).toBeFalsy();
  });

  test('preview dialog opens with sample pages and closes with Escape', async ({ page }) => {
    await page.goto('/#pdf-guides');
    const trigger = page.locator('[data-preview-trigger="beginners"]');
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();

    const dialog = page.locator('#pdfPreviewDialog');
    await expect(dialog).toHaveJSProperty('open', true);
    const samples = page.locator('#pdfPreviewPages img');
    await expect(samples).toHaveCount(3);
    await expect(samples.first()).toHaveAttribute('src', /beginners-p2\.png/);

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveJSProperty('open', false);
    await expect(trigger).toBeFocused();
  });

  test('success page shows download after mocked poll', async ({ page }) => {
    let calls = 0;
    await page.route('**/api/download-link*', async (route) => {
      calls += 1;
      if (calls === 1) {
        await route.fulfill({
          status: 202,
          contentType: 'application/json',
          body: JSON.stringify({ status: 'processing' })
        });
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'ready',
          downloadUrl: 'https://promptanatomy.online/api/download?t=fake.webkit.token',
          expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
          maskedEmail: 't***r@example.com',
          productId: 'beginners',
          productName: 'Beginners PDF Guide'
        })
      });
    });

    await page.goto('/success?session_id=cs_test_A1b2C3d4E5f6G7h8I9j0KlMnOpQr');
    await expect(page.locator('#successState[data-state="ready"]')).toBeVisible({ timeout: 10000 });
    const downloadBtn = page.locator('#successDownloadBtn');
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toHaveAttribute('href', /\/api\/download\?t=fake\.webkit\.token/);

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth > root.clientWidth;
    });
    expect(overflow).toBeFalsy();
  });
});
