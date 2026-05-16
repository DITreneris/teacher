const { test, expect } = require('@playwright/test');

async function heroCardDisplay(page) {
  return page.locator('.hero-prompt-card').evaluate((el) => getComputedStyle(el).display);
}

test.describe('hero prompt card (decorative)', () => {
  test('hidden at mobile and tablet widths (max 1100px)', async ({ page }) => {
    const widths = [320, 375, 768, 1024, 1100];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      await expect.poll(() => heroCardDisplay(page)).toBe('none');
    }
  });

  test('visible on desktop widths (min 1101px)', async ({ page }) => {
    const widths = [1101, 1280, 1440];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const display = await heroCardDisplay(page);
      expect(display).not.toBe('none');
    }
  });

  test('card is decorative only (aria-hidden, no pointer events)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const card = page.locator('.hero-prompt-card');
    await expect(card).toHaveAttribute('aria-hidden', 'true');
    const pointerEvents = await card.evaluate((el) => getComputedStyle(el).pointerEvents);
    expect(pointerEvents).toBe('none');
  });
});
