# Приклад 01 — Recommended locators: getByRole / getByLabel / getByTestId

> Мета: показати найстабільніший підхід пошуку елементів у Playwright.

## Чому це важливо

- `getByRole()` працює через **accessibility tree** (ARIA) → менше залежить від верстки.
- `getByLabel()` — ідеально для полів форми.
- `getByTestId()` — хороший варіант, коли верстка динамічна, а продуктова команда додає `data-testid`.

## Приклад (Playwright Test)

```ts
import { test, expect } from '@playwright/test';

test('Recommended locators example', async ({ page }) => {
  // Для навчального прикладу робимо простий HTML прямо в тесті.
  // Так приклад відтворюваний і не залежить від сторонніх сайтів.
  await page.setContent(`
    <h1>Sign up</h1>

    <label>
      Email
      <input type="email" placeholder="name@example.com" />
    </label>

    <label>
      <input type="checkbox" /> Subscribe
    </label>

    <button data-testid="submit">Submit</button>
  `);

  // 1) Заголовок по ролі
  await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();

  // 2) Поле по лейблу
  await page.getByLabel('Email').fill('playwright@example.com');

  // 3) Чекбокс по ролі + name
  await page.getByRole('checkbox', { name: 'Subscribe' }).check();

  // 4) Кнопка по testId
  await page.getByTestId('submit').click();
});
```

## Посилання

- Locator API: https://playwright.dev/docs/api/class-locator
