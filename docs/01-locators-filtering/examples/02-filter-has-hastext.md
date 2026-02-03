# Приклад 02 — Фільтрація: hasText / has / filter()

> Мета: навчитися звужувати локатор до потрібного елемента, коли селектор повертає багато збігів.

## Приклад: знайти потрібний рядок таблиці

```ts
import { test, expect } from '@playwright/test';

test('Filter rows by text + button', async ({ page }) => {
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

  const rows = page.locator('tr');

  // 1) Відфільтрували рядки по тексту
  const byText = rows.filter({ hasText: 'text in column 1' });

  // 2) І ще раз відфільтрували: всередині має бути конкретна кнопка
  const target = byText.filter({
    has: page.getByRole('button', { name: 'column 2 button' }),
  });

  await expect(target).toHaveCount(1);
});
```

## Коли використовувати

- `hasText` — коли текст стабільний і бізнес-значущий.
- `has` — коли треба перевірити **наявність дочірнього елемента**.
- `filter()` — коли вже є “широкий” локатор і ти уточнюєш його кроками.
