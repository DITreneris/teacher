const { test, expect } = require('@playwright/test');

const SELECTOR = [
  'a[href]',
  'button',
  '[role="tab"]',
  'summary',
  'select'
].join(', ');

test.describe('touch-targets', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('ops and pdf-guides interactive controls are at least 44x44', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#operationsCenter');
    await page.waitForSelector('#pdf-guides');

    const report = await page.evaluate(({ selector, minSize }) => {
      const roots = [
        document.querySelector('#operationsCenter'),
        document.querySelector('#pdf-guides')
      ].filter(Boolean);

      const tooSmall = [];
      let soft48 = 0;

      roots.forEach((root) => {
        root.querySelectorAll(selector).forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') return;
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) return;

          const label =
            el.getAttribute('aria-label') ||
            el.getAttribute('data-mode') ||
            el.getAttribute('data-product') ||
            el.id ||
            el.className ||
            el.tagName;

          if (rect.width < minSize || rect.height < minSize) {
            tooSmall.push({
              label: String(label).slice(0, 80),
              width: Math.round(rect.width * 10) / 10,
              height: Math.round(rect.height * 10) / 10
            });
          } else if (rect.width < 48 || rect.height < 48) {
            soft48 += 1;
          }
        });
      });

      return { tooSmall, soft48 };
    }, { selector: SELECTOR, minSize: 44 });

    if (report.soft48 > 0) {
      // Soft signal for future 48px Lighthouse alignment — do not fail.
      // eslint-disable-next-line no-console
      console.log(`[touch-targets] ${report.soft48} control(s) in 44–47px range (Lighthouse 48px soft)`);
    }

    expect(report.tooSmall, JSON.stringify(report.tooSmall, null, 2)).toEqual([]);
  });
});
