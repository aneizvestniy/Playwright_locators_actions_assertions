# Вправи — Модуль 03: Screenshot testing

## Вправа 1: Page screenshot

**Завдання:** додай тест з `await expect(page).toHaveScreenshot('page.png')`.

Підказка: перший запуск створить baseline.

---

## Вправа 2: Element screenshot

**Завдання:** знайди елемент (наприклад card, header або table) і зроби screenshot assertion саме елемента:

```ts
await expect(page.getByRole('heading', { name: /.+/ })).toHaveScreenshot('heading.png');
```

---

## Вправа 3: Оновлення baseline

**Завдання:** навмисно зміни UI/контент (або зроби іншу тему сторінки) і онови baseline через CLI.

Опиши команду, яку використав, і що змінилось.
