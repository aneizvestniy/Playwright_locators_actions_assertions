import { test, expect } from '@playwright/test';

test.describe('01 - Locators & filtering', () => {
  test('recommended locators: getByRole / getByText', async ({ page }) => {
    await page.setContent(`
      <h1>Sign up</h1>
      <label>
        <input type="checkbox" /> Subscribe
      </label>
      <button>Submit</button>
      <div data-testid="status">Draft</div>
    `);

    await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
    await page.getByRole('checkbox', { name: 'Subscribe' }).check();
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByTestId('status')).toHaveText('Draft');
  });

  test('filter() example', async ({ page }) => {
    await page.setContent(`
      <table>
        <tr>
          <td>text in column 1</td>
          <td><button>column 2 button</button></td>
        </tr>
        <tr>
          <td>other text</td>
          <td><button>column 2 button</button></td>
        </tr>
        <tr>
          <td>text in column 1</td>
          <td><button>other button</button></td>
        </tr>
      </table>
    `);

    const rowLocator = page.locator('tr');

    const target = rowLocator
      .filter({ hasText: 'text in column 1' })
      .filter({ has: page.getByRole('button', { name: 'column 2 button' }) });

    await expect(target).toHaveCount(1);
  });
});
