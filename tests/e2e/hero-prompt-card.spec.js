const { test, expect } = require('@playwright/test');

async function heroCardDisplay(page) {
  return page.locator('.hero-prompt-card').evaluate((el) => getComputedStyle(el).display);
}

test.describe('hero prompt card (decorative)', () => {
  test('hidden at mobile and tablet widths (max 1024px)', async ({ page }) => {
    const widths = [320, 375, 768, 1024];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      await expect.poll(() => heroCardDisplay(page)).toBe('none');
    }
  });

  test('visible on desktop widths (min 1025px)', async ({ page }) => {
    const widths = [1025, 1280, 1440];
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

  test('desktop: card sits on the right side of the hero', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const placement = await page.evaluate(() => {
      const header = document.querySelector('.header');
      const card = document.querySelector('.hero-prompt-card');
      if (!header || !card) return null;
      const headerBox = header.getBoundingClientRect();
      const cardBox = card.getBoundingClientRect();
      return {
        cardLeft: cardBox.left,
        threshold: headerBox.left + headerBox.width * 0.52,
      };
    });
    expect(placement).not.toBeNull();
    expect(placement.cardLeft).toBeGreaterThanOrEqual(placement.threshold);
  });

  test('desktop: card is not stacked below the CTA in the left column', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const placement = await page.evaluate(() => {
      const cta = document.querySelector('.header-cta');
      const card = document.querySelector('.hero-prompt-card');
      if (!cta || !card) return null;
      const ctaBox = cta.getBoundingClientRect();
      const cardBox = card.getBoundingClientRect();
      return {
        cardLeft: cardBox.left,
        ctaRight: ctaBox.right,
        cardTop: cardBox.top,
        ctaBottom: ctaBox.bottom,
      };
    });
    expect(placement).not.toBeNull();
    expect(placement.cardLeft).toBeGreaterThan(placement.ctaRight - 40);
    expect(placement.cardTop).toBeLessThan(placement.ctaBottom + 8);
  });

  test('desktop: card has glass styling', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const styles = await page.locator('.hero-prompt-card').evaluate((el) => {
      const computed = getComputedStyle(el);
      return {
        borderRadius: parseFloat(computed.borderRadius),
        backdropFilter: computed.backdropFilter || computed.webkitBackdropFilter || '',
      };
    });
    expect(styles.borderRadius).toBeGreaterThanOrEqual(20);
    expect(styles.backdropFilter).toMatch(/blur/i);
  });
});
