const { test, expect } = require('@playwright/test');

const MOBILE_VIEWPORTS = [
  { name: 'small-phone', width: 320, height: 640 },
  { name: 'phone', width: 375, height: 812 }
];

function sectionOverflows(section) {
  return section.scrollWidth > section.clientWidth + 1;
}

for (const viewport of MOBILE_VIEWPORTS) {
  test.describe(`mobile-pdf:${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test('pdf-guides and compare strip have no horizontal overflow', async ({ page }) => {
      await page.goto('/#pdf-guides');
      await page.waitForSelector('[data-commerce-testimonials] li', { timeout: 5000 });

      const docOverflow = await page.evaluate(() => {
        const root = document.documentElement;
        return root.scrollWidth > root.clientWidth;
      });
      expect(docOverflow).toBeFalsy();

      const pdfOverflow = await page.locator('#pdf-guides').evaluate(sectionOverflows);
      expect(pdfOverflow).toBeFalsy();

      const compareOverflow = await page.locator('.pdf-compare-strip').evaluate(sectionOverflows);
      expect(compareOverflow).toBeFalsy();
    });

    test('first card cover and CTA are visible after scroll into view', async ({ page }) => {
      await page.goto('/#pdf-guides');
      const card = page.locator('.pdf-guide-card').first();
      await card.scrollIntoViewIfNeeded();
      await expect(card.locator('.pdf-guide-card-cover img')).toBeVisible();
      await expect(card.locator('.pdf-guide-cta')).toBeVisible();
      await expect(card.locator('.pdf-guide-price-now')).toContainText('$4.99');
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

    test('TOC accordion opens on beginners card', async ({ page }) => {
      await page.goto('/#pdf-guides');
      const toc = page.locator('.pdf-guide-toc[data-toc="beginners"]');
      await toc.scrollIntoViewIfNeeded();
      await toc.locator('summary').click();
      await expect(toc).toHaveAttribute('open', '');
      await expect(toc.locator('.pdf-guide-toc-list li').first()).not.toBeEmpty();
    });
  });
}

test.describe('mobile-pdf:dark-theme', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('pdf guides render in dark theme without overflow', async ({ page }) => {
    await page.goto('/#pdf-guides');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    const overflow = await page.locator('#pdf-guides').evaluate(sectionOverflows);
    expect(overflow).toBeFalsy();
    await expect(page.locator('.pdf-guide-card').first()).toBeVisible();
  });
});

test.describe('mobile-pdf:success', () => {
  test.use({ viewport: { width: 375, height: 812 } });

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
          downloadUrl: 'https://promptanatomy.online/api/download?t=fake.mobile.token',
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
    await expect(downloadBtn).toHaveAttribute('href', /\/api\/download\?t=fake\.mobile\.token/);

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth > root.clientWidth;
    });
    expect(overflow).toBeFalsy();
  });
});
