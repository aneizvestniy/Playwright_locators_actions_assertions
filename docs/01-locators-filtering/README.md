# Модуль 01: Locators та фільтрація елементів (Playwright)

## 🎯 Мета модуля

Навчитися знаходити елементи **стабільно** та **читабельно** через Playwright locators, а також уточнювати пошук через фільтрацію.

> Головна ідея: у Playwright ми не "шукаємо елемент один раз" — ми описуємо **локатор**, який у будь-який момент може бути зарезолвлений у DOM.

---

## 1) CSS vs XPath

Playwright підтримує CSS і XPath через один API:

```ts
await page.locator('button').click();
await page.locator('//button').click();
```

Нюанси:
- Рядки, що починаються з `//` або `..`, трактуються як XPath.
- XPath **не проходить** у Shadow DOM.
- Для більшості UI-тестів перевага — за семантичними локаторами (`getByRole`, `getByLabel`).

---

## 2) Рекомендовані локатори (best practice)

### `getByRole()`
Найстабільніший спосіб (ARIA/доступність):

```ts
await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
await page.getByRole('button', { name: /submit/i }).click();
```

### `getByText()`, `getByLabel()`, `getByPlaceholder()`, `getByAltText()`, `getByTitle()`, `getByTestId()`
Використовуй залежно від того, що є найнадійнішим у верстці.

---

## 3) Вибіркові локатори

### `locator.or()`
Коли UI може мати 2 валідні стани:

```ts
const newEmail = page.getByRole('button', { name: 'New' });
const dialog = page.getByText('Confirm security settings');

await expect(newEmail.or(dialog)).toBeVisible();
```

### Кілька селекторів через кому

```ts
await page.locator('button:has-text("Log in"), button:has-text("Sign in")').click();
```

---

## 4) Фільтрація елементів

### `hasText` / `has`

```ts
await page.locator('button', { hasText: 'Submit' }).click();
```

### `filter()`

```ts
const rowLocator = page.locator('tr');
await rowLocator
  .filter({ hasText: 'text in column 1' })
  .filter({ has: page.getByRole('button', { name: 'column 2 button' }) });
```

---

## 5) Робота з множиною елементів

### `count()` + `nth()`

```ts
const rows = page.locator('tr');
const count = await rows.count();
for (let i = 0; i < count; i++) {
  console.log(await rows.nth(i).innerText());
}
```

### `all()`

```ts
for (const row of await page.locator('tr').all()) {
  console.log(await row.innerText());
}
```

---

## ✅ Official docs

- Locator API: https://playwright.dev/docs/api/class-locator

---

## 📌 Далі

- [Приклади](./examples/)
- [Вправи](./exercises/)
