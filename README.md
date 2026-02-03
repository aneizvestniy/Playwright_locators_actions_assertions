# 🎓 Навчальний курс: Playwright Locators, Assertions та Screenshot Testing

Навчальний репозиторій для студентів з автоматизованого тестування на базі **Playwright**.

Курс організований у тому ж стилі та підході, як у репозиторії-прикладі **Cypress_cli_reports**:

- ✅ Теорія простою мовою
- ✅ Практичні приклади з поясненнями
- ✅ Вправи для закріплення
- ✅ Готовий Playwright Test фреймворк з тестами (папка `examples/test-frameworks/playwright/`)

---

## 📚 Зміст курсу

### Модуль 01: Locators та фільтрація елементів

- CSS vs XPath
- Playwright locators: `locator()`, `getByRole()`, `getByText()` тощо
- Фільтрація: `has`, `hasText`, `filter()`
- Best practices для стабільних локаторів

📁 [Документація](./docs/01-locators-filtering/README.md) | [Приклади](./docs/01-locators-filtering/examples/) | [Вправи](./docs/01-locators-filtering/exercises/)

---

### Модуль 02: Assertions

- `expect()` + матчери
- Auto-waiting assertions (async)
- `.not` та soft assertions

📁 [Документація](./docs/02-assertions/README.md) | [Приклади](./docs/02-assertions/examples/) | [Вправи](./docs/02-assertions/exercises/)

---

### Модуль 03: Screenshot testing

- `toHaveScreenshot()` для сторінки та елемента
- Snapshots, baseline та оновлення
- Важливі нюанси (OS differences, CI)

📁 [Документація](./docs/03-screenshot-testing/README.md) | [Приклади](./docs/03-screenshot-testing/examples/) | [Вправи](./docs/03-screenshot-testing/exercises/)

---

## 🧩 Презентації

Папка: [`prezentations/`](./prezentations)

- `01-locators-filtering.md`
- `02-assertions.md`
- `03-screenshot-testing.md`

---

## 🚀 Швидкий старт (Playwright Test framework)

### Передумови

- Node.js >= 18
- npm

### Встановлення

```bash
cd examples/test-frameworks/playwright
npm install
```

### Запуск тестів

```bash
npm run test
```

### Відкриття UI mode

```bash
npm run test:ui
```

---

## 🔗 Корисні посилання

- Locator API: https://playwright.dev/docs/api/class-locator
- Page assertions (`toHaveScreenshot`): https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1
