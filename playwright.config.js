const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.03,
      animations: 'disabled'
    }
  },
  // Keep screenshot names OS-agnostic so local Windows and CI Linux share baselines.
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
  fullyParallel: false,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /webkit-mobile-smoke\.spec\.js/
    },
    {
      name: 'webkit-mobile',
      use: { ...devices['iPhone 12'] },
      testMatch: /webkit-mobile-smoke\.spec\.js/
    }
  ]
});
