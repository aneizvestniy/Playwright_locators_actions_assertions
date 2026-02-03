# Web приклад 01 — DemoQA: locators на формі (getByRole / getByLabel)

> Сайт: https://demoqa.com/

## Сценарій

- Відкрити форму `Text Box`
- Заповнити поля
- Натиснути `Submit`
- Перевірити, що дані відобразилися у результаті

## Приклад (Playwright Test)

```ts
import { test, expect } from '@playwright/test';

test('DemoQA Text Box form @web', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  // Заголовок сторінки
  await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();

  // Поля (на DemoQA зручно використовувати placeholder/id)
  await page.locator('#userName').fill('Leo May');
  await page.locator('#userEmail').fill('leo@example.com');
  await page.locator('#currentAddress').fill('Kyiv');
  await page.locator('#permanentAddress').fill('Kyiv');

  await page.getByRole('button', { name: 'Submit' }).click();

  // Перевірки результату
  await expect(page.locator('#output')).toBeVisible();
  await expect(page.locator('#name')).toContainText('Leo May');
  await expect(page.locator('#email')).toContainText('leo@example.com');
});
```

## Поради

- Для production-проєктів краще мати `data-testid`, але у demo-сайтах часто доводиться працювати з `id`/текстом.
- Якщо елемент перекривається/не клікається через банер — можна сховати банер через `page.addStyleTag(...)`.
