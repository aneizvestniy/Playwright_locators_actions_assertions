import { test, expect } from '@playwright/test';

test.describe('03 - Screenshot testing', () => {
  test('page screenshot', async ({ page }) => {
    await page.setContent(`
      <style>
        body { font-family: Arial; }
        .card { border: 1px solid #ddd; padding: 16px; width: 320px; }
        .title { font-size: 20px; }
      </style>
      <div class="card">
        <div class="title">Hello Playwright</div>
        <div>Baseline screenshot example</div>
      </div>
    `);

    await expect(page).toHaveScreenshot('page.png');
  });

  test('element screenshot', async ({ page }) => {
    await page.setContent(`
      <style>
        .badge { background: #0b74de; color: white; padding: 8px 12px; border-radius: 8px; display: inline-block; }
      </style>
      <div class="badge">STATUS: OK</div>
    `);

    await expect(page.locator('.badge')).toHaveScreenshot('badge.png');
  });
});
