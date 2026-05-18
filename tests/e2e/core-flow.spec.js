const { test, expect } = require('@playwright/test');

test.describe('core first-run flows', () => {
  test.describe.configure({ timeout: 60000 });
  test.use({ viewport: { width: 375, height: 812 } });

  test('first-run generate and copy shows toast', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');

    await page.fill('#l-goal', 'Understand photosynthesis');
    await page.fill('#l-topic', 'Photosynthesis');
    await page.selectOption('#l-duration', { label: '45 min' });
    await page.fill('#l-question', 'Build 3 activities and a reflection');

    await page.click('#outputCopyCta');
    await expect(page.locator('#toastMessage')).toContainText(/copied/i);

    const text = await page.locator('#opsOutput').innerText();
    expect(text).toMatch(/TASK:/);
  });

  test('mobile template apply fills question and copy works', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');

    await page.click('#libraryToggle');
    await page.click('[data-library-apply="lesson_plan"]');

    await expect(page.locator('#l-question')).toHaveValue(/Role:/i);
    await expect(page.locator('#toastMessage')).toContainText(/template/i);

    await page.click('#outputCopyCta');
    await expect(page.locator('#toastMessage')).toContainText(/copied/i);
  });

  test('session save and restore survives reload', async ({ page }) => {
    await page.goto('/');

    await page.fill('#l-goal', 'Goal for test');
    await page.fill('#l-question', 'What should I do first?');
    await page.click('#sessionSaveBtn');

    await expect(page.locator('#sessionList .session-item')).toHaveCount(1);
    await page.reload();

    await expect(page.locator('#sessionList .session-item')).toHaveCount(1);

    await page.fill('#l-goal', '');
    await page.locator('#sessionList .session-item').first().click();
    await expect(page.locator('#l-goal')).toHaveValue('Goal for test');
  });

  test('accordion stays single-open and hero link opens target section', async ({ page }) => {
    await page.goto('/');

    const libraryToggle = page.locator('#libraryToggle');
    const rulesToggle = page.locator('#rulesToggle');

    await libraryToggle.click();
    await expect(libraryToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(rulesToggle).toHaveAttribute('aria-expanded', 'false');

    await rulesToggle.click();
    await expect(rulesToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(libraryToggle).toHaveAttribute('aria-expanded', 'false');

    // The hero stepper is hidden on mobile (≤768px); switch to a desktop viewport
    // to exercise the .header-step link that is only surfaced for tablet+ users.
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.click('.header-step[href="#library"]');
    await expect(libraryToggle).toHaveAttribute('aria-expanded', 'true');
  });

  test('keyboard arrows switch mode and class select updates output', async ({ page }) => {
    await page.goto('/');

    await page.locator('#tab-lesson').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#tab-assessment')).toHaveAttribute('aria-selected', 'true');

    await page.selectOption('#classLevelSelect', '8');
    await expect(page.locator('#classBadge')).toHaveText(/Grade\s*8/i);
  });

  test('keeps only last five saved sessions', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('di_ops_center_sessions');
    });
    await page.reload();

    for (let i = 1; i <= 6; i += 1) {
      await page.fill('#l-goal', `Goal ${i}`);
      await page.fill('#l-question', `Question ${i}`);
      await page.locator('#sessionSaveBtn').dispatchEvent('click');
      await page.waitForTimeout(50);
    }

    await expect(page.locator('#sessionList .session-item')).toHaveCount(5);
    await expect(page.locator('#sessionList .session-item').first()).toContainText('LESSON');
    await page.locator('#sessionList .session-item').last().click();
    await expect(page.locator('#l-goal')).toHaveValue('Goal 2');
  });

  test('clear sessions undo expires after timeout', async ({ page }) => {
    await page.goto('/');
    await page.fill('#l-goal', 'Timeout test goal');
    await page.click('#sessionSaveBtn');
    await expect(page.locator('#sessionList .session-item')).toHaveCount(1);

    page.once('dialog', (dialog) => dialog.accept());
    await page.click('#sessionClearBtn');
    await expect(page.locator('#sessionList .session-item')).toHaveCount(0);
    await expect(page.locator('#sessionClearBtn')).toContainText(/Restore sessions/i);

    await page.waitForTimeout(8300);
    await expect(page.locator('#sessionClearBtn')).toContainText(/Delete sessions/i);
  });

  // The dev static server (`serve`) defaults to cleanUrls: true, which 301-redirects
  // `/success.html?qs` to `/success` and drops the query string in the process.
  // Production (Vercel) uses cleanUrls: false (see vercel.json), so the production
  // URL `/success.html?session_id=...` is served directly. To cover the same JS
  // flow in tests, we hit `/success?session_id=...` which serve-handler resolves
  // to success.html without a redirect, preserving the query string. The DEPLOY.md
  // post-deploy checklist covers the production `.html` flow manually.
  test('success page surfaces in-page download once the webhook fulfils', async ({ page }) => {
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
          downloadUrl: 'https://promptanatomy.online/api/download?t=fake.token',
          expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
          maskedEmail: 's***a@example.com',
          productId: 'beginners',
          productName: 'Beginners PDF Guide'
        })
      });
    });

    const fakeSession = 'cs_test_' + 'A1b2C3d4E5f6G7h8I9j0KlMnOpQr';
    await page.goto('/success?session_id=' + fakeSession);

    await expect(page.locator('#successState[data-state="ready"]')).toBeVisible({ timeout: 10000 });
    const downloadBtn = page.locator('#successDownloadBtn');
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toHaveAttribute('href', /\/api\/download\?t=fake\.token/);
    await expect(page.locator('.success-email')).toContainText('s***a@example.com');
    expect(calls).toBeGreaterThanOrEqual(2);
  });

  test('preview dialog opens, loads watermarked sample pages, and restores focus on close', async ({ page }) => {
    await page.goto('/');

    const trigger = page.locator('[data-preview-trigger="beginners"]');
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.locator('#pdfPreviewDialog');
    await expect(dialog).toHaveJSProperty('open', true);
    await expect(page.locator('#pdfPreviewTitle')).toContainText(/Beginners/);
    const samples = page.locator('#pdfPreviewPages img');
    await expect(samples).toHaveCount(3);
    await expect(samples.first()).toHaveAttribute('src', /\/assets\/pdf-covers\/beginners-p2\.png/);
    await expect(samples.first()).toHaveAttribute('alt', /PREVIEW watermark/);

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveJSProperty('open', false);
    await expect(trigger).toBeFocused();
  });

  test('success page rejects an invalid session id without polling', async ({ page }) => {
    let calls = 0;
    await page.route('**/api/download-link*', async (route) => {
      calls += 1;
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });
    await page.goto('/success?session_id=not_a_real_session');
    await expect(page.locator('#successState[data-state="error"]')).toBeVisible();
    expect(calls).toBe(0);
  });

  test('copy fallback uses execCommand when clipboard fails', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: () => Promise.reject(new Error('denied'))
        }
      });
      window.__copyCalled = false;
      document.execCommand = function (command) {
        window.__copyCalled = command === 'copy';
        return true;
      };
    });

    await page.goto('/');
    await page.fill('#l-topic', 'Test topic');
    await page.fill('#l-question', 'Generate a short plan');
    await page.click('#outputCopyCta');
    await expect(page.locator('#toastMessage')).toContainText(/copied/i);
    await expect.poll(async () => page.evaluate(() => window.__copyCalled)).toBeTruthy();
  });
});
