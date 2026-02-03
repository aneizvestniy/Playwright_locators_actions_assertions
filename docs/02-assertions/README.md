# Модуль 02: Assertions (Playwright)

## 🎯 Мета модуля

Навчитися писати перевірки так, щоб вони:
- були читабельними
- були стабільними (з автоочікуванням)
- давали зрозумілу помилку при падінні

---

## 1) Базові матчери `expect(value)`

Playwright підтримує стандартні матчери (частина від Jest):

```ts
expect(1).toBeTruthy();
expect({ a: 1 }).toEqual({ a: 1 });
```

---

## 2) Асинхронні assertions (auto-waiting)

Playwright assertions для `Locator` / `Page` **повторюються**, доки умова не стане true або не завершиться таймаут:

```ts
await expect(page.getByTestId('status')).toHaveText('Submitted');
await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
```

Порада:
- не роби ручні `waitForTimeout` — краще правильно обрати locator і assertion.

---

## 3) Негативні перевірки `.not`

```ts
await expect(page.getByText('Loading...')).not.toBeVisible();
```

---

## 4) Soft assertions

Soft assertions **не зупиняють** тест одразу, але в кінці тест все одно буде позначений як failed.

```ts
await expect.soft(page.getByTestId('status')).toHaveText('Success');
await expect.soft(page.getByTestId('eta')).toHaveText('1 day');
```

---

## ✅ Official docs / корисне

- Assertions overview: https://playwright.dev/docs/test-assertions

---

## 📌 Далі

- [Приклади](./examples/)
- [Вправи](./exercises/)
