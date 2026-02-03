# Приклад 01 — toHaveScreenshot() для сторінки та елемента

> Мета: показати базовий сценарій screenshot testing.

```ts
import { test, expect } from '@playwright/test';

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
```

## Як оновити baseline

```bash
npm run test:update-snapshots
```

## Official docs

- https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1
