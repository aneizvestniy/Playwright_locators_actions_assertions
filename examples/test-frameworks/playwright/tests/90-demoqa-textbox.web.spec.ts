import { test, expect } from '@playwright/test';

test.describe('WEB (optional) - DemoQA', () => {
  test('Text Box form @web', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');

    await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

    await page.locator('#userName').fill('Leo May');
    await page.locator('#userEmail').fill('leo@example.com');
    await page.locator('#currentAddress').fill('Kyiv');
    await page.locator('#permanentAddress').fill('Kyiv');

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#output')).toBeVisible();
    await expect(page.locator('#name')).toContainText('Leo May');
    await expect(page.locator('#email')).toContainText('leo@example.com');
  });
});
