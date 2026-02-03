# Приклад 03 — locator.or(): два можливі стани UI

> Мета: коли сторінка може показати **або** потрібну кнопку, **або** модалку/попап.

```ts
import { test, expect } from '@playwright/test';

test('locator.or example', async ({ page }) => {
  await page.setContent(`
    <button id="new">New</button>
    <div id="dialog" style="display:none">Confirm security settings</div>
    <button id="dismiss" style="display:none">Dismiss</button>

    <script>
      // Симуляція: іноді показуємо діалог
      const showDialog = true;
      if (showDialog) {
        document.getElementById('dialog').style.display = 'block';
        document.getElementById('dismiss').style.display = 'inline-block';
      }
    </script>
  `);

  const newBtn = page.getByRole('button', { name: 'New' });
  const dialog = page.getByText('Confirm security settings');

  // Чекаємо на один із двох варіантів
  await expect(newBtn.or(dialog)).toBeVisible();

  if (await dialog.isVisible()) {
    await page.getByRole('button', { name: 'Dismiss' }).click();
  }

  await newBtn.click();
});
```

## Порада

Це часто краще ніж `try/catch` навколо кліку, бо тест стає більш керованим.
