# Приклад 02 — .not та soft assertions

## 1) Негативна перевірка `.not`

```ts
import { test, expect } from '@playwright/test';

test('not example', async ({ page }) => {
  await page.setContent(`<div id="loading">Loading...</div>`);

  // Імітуємо зникнення елемента
  await page.evaluate(() => setTimeout(() => document.getElementById('loading')?.remove(), 200));

  await expect(page.locator('#loading')).not.toBeVisible();
});
```

## 2) Soft assertions

Soft assertions не зупиняють тест одразу, але фіксують помилки:

```ts
import { test, expect } from '@playwright/test';

test('soft assertions example', async ({ page }) => {
  await page.setContent(`
    <div data-testid="status">Success</div>
    <div data-testid="eta">1 day</div>
  `);

  await expect.soft(page.getByTestId('status')).toHaveText('Success');
  await expect.soft(page.getByTestId('eta')).toHaveText('1 day');

  // Тест продовжується
  await expect(page.getByTestId('status')).toBeVisible();
});
```
