import { test, expect } from '@playwright/test';

test.describe('WEB (optional) - DemoQA', () => {
  test('Dynamic Properties auto-waiting assertions @web', async ({ page }) => {
    await page.goto('https://demoqa.com/dynamic-properties');

    const enableAfter = page.locator('#enableAfter');
    await expect(enableAfter).toBeDisabled();
    await expect(enableAfter).toBeEnabled();

    const visibleAfter = page.locator('#visibleAfter');
    await expect(visibleAfter).toBeVisible();
  });
});
