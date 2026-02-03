# Web приклад 01 — DemoQA: assertions з автоочікуванням (Dynamic Properties)

> Сайт: https://demoqa.com/

## Сценарій

- Відкрити `Dynamic Properties`
- Перевірити, що кнопка стане enabled через певний час
- Перевірити, що кнопка стане visible

## Приклад (Playwright Test)

```ts
import { test, expect } from '@playwright/test';

test('DemoQA dynamic properties @web', async ({ page }) => {
  await page.goto('https://demoqa.com/dynamic-properties');

  // Button will be enabled after 5 seconds
  const enableAfter = page.locator('#enableAfter');
  await expect(enableAfter).toBeDisabled();
  await expect(enableAfter).toBeEnabled(); // auto-waiting

  // Button will be visible after 5 seconds
  const visibleAfter = page.locator('#visibleAfter');
  await expect(visibleAfter).toBeVisible(); // auto-waiting
});
```

## Порада

Це гарний приклад, чому не треба `waitForTimeout(5000)` — assertions самі дочекаються.
