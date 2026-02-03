# Приклад 01 — Auto-waiting assertions (toHaveText, toBeVisible, ...)

> Мета: показати, що Playwright assertions повторюються, доки умова не стане true або не вичерпається timeout.

```ts
import { test, expect } from '@playwright/test';

test('auto-waiting toHaveText', async ({ page }) => {
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

  // Тут НЕ треба waitForTimeout. Assert сам дочекається зміни.
  await expect(page.getByTestId('status')).toHaveText('Submitted');
});
```

## Порада

Якщо тобі дуже часто хочеться `waitForTimeout`, зазвичай проблема в:
- неправильному локаторі
- неправильній перевірці
- або в тому, що тест перевіряє не той сигнал (краще чекати конкретний DOM/мережевий стан).
