import { test, expect } from '@playwright/test';

test.describe('02 - Assertions', () => {
  test('auto-waiting toHaveText()', async ({ page }) => {
    await page.setContent(`
      <button id="go">Go</button>
      <div data-testid="status">Loading...</div>
      <script>
        document.getElementById('go').addEventListener('click', () => {
          setTimeout(() => {
            document.querySelector('[data-testid="status"]').textContent = 'Submitted';
          }, 300);
        });
      </script>
    `);

    await page.click('#go');

    // Auto-waiting assertion
    await expect(page.getByTestId('status')).toHaveText('Submitted');
  });

  test('soft assertions example', async ({ page }) => {
    await page.setContent(`
      <div data-testid="status">Success</div>
      <div data-testid="eta">1 day</div>
    `);

    await expect.soft(page.getByTestId('status')).toHaveText('Success');
    await expect.soft(page.getByTestId('eta')).toHaveText('1 day');

    // test continues...
    await expect(page.getByTestId('status')).toBeVisible();
  });
});
