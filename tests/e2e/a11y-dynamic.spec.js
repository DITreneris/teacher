const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('a11y-dynamic', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('open beginners preview dialog has no WCAG A/AA violations', async ({ page }) => {
    await page.goto('/#pdf-guides');
    const trigger = page.locator('[data-preview-trigger="beginners"]');
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();

    const dialog = page.locator('#pdfPreviewDialog');
    await expect(dialog).toHaveJSProperty('open', true);

    const results = await new AxeBuilder({ page })
      .include('#pdfPreviewDialog')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('open beginners TOC accordion has no WCAG A/AA violations', async ({ page }) => {
    await page.goto('/#pdf-guides');
    const card = page.locator('.pdf-guide-card').first();
    await card.scrollIntoViewIfNeeded();
    const toc = page.locator('.pdf-guide-toc[data-toc="beginners"]');
    await toc.locator('summary').click();
    await expect(toc).toHaveAttribute('open', '');

    const results = await new AxeBuilder({ page })
      .include('.pdf-guide-card:first-of-type')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
