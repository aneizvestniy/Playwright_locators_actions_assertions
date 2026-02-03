Локатори та фільтрація елементів

CSS and XPath support
Playwright підтримує як CSS так і X-Path селектори надаючи один і той самий інтерфейс для пошуку елементів, а саме метод locator(selector). 

CSS

await page.locator('button').click();

XPATH

await page.locator('//button').click();

Будь-який рядок селектора, що починається з // або .. вважається селектором xpath. Наприклад, Playwright перетворює "//html/body" на "xpath=//html/body".


XPath не проникає в Shadow DOM.

Locator
Локатори є центральним елементом в Playwright. На короткий лад, локатори представляють собою спосіб знаходження елементів на сторінці в будь-який момент. 


Пошук елементів
Локатор можна створити за допомогою методу page.locator().


<form>
	<input type="text" class="required"/>
</form>

const input = page.locator('input.required')
await input.fill("Hello Playwright!")

Ось деякі додаткові рекомендовані розробниками вбудовані методи для пошуку елементів що повертають локатор.

page.getByRole() - знаходить за явними та неявними атрибутами доступності.


<h3>Sign up</h3>
<label>
  <input type="checkbox" /> Subscribe
</label>
<br/>
<button>Submit</button>

await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();

await page.getByRole('checkbox', { name: 'Subscribe' }).check();

await page.getByRole('button', { name: /submit/i }).click();

page.getByText() - шукає за текстовим вмістом.


<span>Welcome, John</span>

const text = await page.getByText('Welcome, John').innerText()

page.getByLabel() - знаходить елемент управління форми за текстом асоційованої мітки.


<label>Password <input type="password" /></label>

await page.getByLabel('Password').fill('secret');

page.getByPlaceholder() - знаходить ввід за заповнювачем (placeholder).


<input type="email" placeholder="name@example.com" />

await page
    .getByPlaceholder('name@example.com')
    .fill('playwright@microsoft.com');

page.getByAltText() - шукає елемент, зазвичай зображення, за альтернативним текстом.


<img alt="playwright logo" src="/img/playwright-logo.svg" width="100" />

await page.getByAltText('playwright logo').click();

page.getByTitle() - знаходить елемент за атрибутом title.


<span title='Issues count'>25 issues</span>

await expect(page.getByTitle('Issues count')).toHaveText('25 issues');

page.getByTestId() - шукає елемент за його атрибутом data-testid (можливе налаштування інших атрибутів).


<button data-testid="directions">Itinéraire</button>

await page.getByTestId('directions').click();

Вибіркові локатори

locator.or(locator)

Створює локатор, який відповідає одному з двох локаторів.

Уявіть ситуацію, де ви хочете натиснути кнопку "Новий лист", але іноді з'являється діалогове вікно з налаштуваннями безпеки. У цьому випадку ви можете очікувати або кнопку "Новий лист", або діалогове вікно і вчиняти відповідно.


const newEmail = page.getByRole('button', { name: 'New' });
const dialog = page.getByText('Confirm security settings');

await expect(newEmail.or(dialog)).toBeVisible();

if (await dialog.isVisible())
  await page.getByRole('button', { name: 'Dismiss' }).click();
await newEmail.click();

Також ви можете передати декілька селекторів у локатор і Playwright поверне той який зміг зарезолвити першим. Для цього напишіть ваші селктори розділяючи комою.


// Clicks a <button> that has either a "Log in" or "Sign in" text.
await page.locator('button:has-text("Log in"), button:has-text("Sign in")').click();

Фільтрація елементів
Ви можете уточнити ваш пошук використовуючи опції has/hasText або hasNot/hasNotText

has


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Playwright Locator Example</title>
</head>
<body>
  <button>Submit</button>
</body>
</html>

await page.locator('button', {hasText : "Submit").click()

hasText


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Playwright Nested Locator Example</title>
</head>
<body>
  <p class="info">
    Here is some information. <span class="userInfo">User information</span>
  </p>
</body>
</html>

const text = await page.locator('p.info', {has : page.locator('span.userInfo')).innerText()

Також ви можете відфільтрувати локатои вже після їх знаходження за допомогою методу filter() який також приймає опції has/hasText або hasNot/hasNotText


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Playwright Filtered Locator Example</title>
</head>
<body>
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
</body>
</html>

const rowLocator = page.locator('tr');
// ...
await rowLocator
    .filter({ hasText: 'text in column 1' })
    .filter({ has: page.getByRole('button', { name: 'column 2 button' }) })
    .screenshot();


Операції над локаторами
Як опрацювати декілька елементів
Якщо ви знайшли локатор який посилається більше ніж на один елемент ви можете проітеруватися і виконати первні дії на кожному зі знайдених елементів.

Існує 2 способи це зробити.

Спосіб 1: Цикл for + locator.count() + locator.nth(index)


const tableRows = page.locator('tr')
const count = await tableRows.count()

for (let i = 0; i < count; i++) {
  const text = await tableRows.nth(i).innerText()
  console.log(text)
}

Спосіб 2: Цикл for of + locator.all()


const tableRows = page.locator('tr')

for (const row of await tableRows.all()) {
	const text = await row.innerText()
	console.log(text)
}

Обидва варіанти принесуть вам бажаний резултьтат, просто останній варіант є більш сучасним.


Поради щодо знаходження локаторів
Слід пам’ятати що ваші селектори мають бути максимально короткими та надійними. Бажано орієнтуватися на атрибути елементів. У випадку якщо ви маєте складну структуру документа пам’ятайте що ви можете шукати локатори всередині іншого локатора.


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Playwright Locator Example</title>
</head>
<body>
  <div class="parent">
    <span class="child">Child Element</span>
  </div>
</body>
</html>

const parentLocator = page.locator('div.parent'); 
const childLocator = parentLocator.locator('span.child'); 

const childElement = await childLocator.first();
console.log(await childElement.innerText());

Також не забувайте про опції has/hasText або hasNot/hasNotText які ми розглянули раніше.


Дії над локаторами
В Playwright на локаторах можна викликати різні дії для взаємодії з елементами на сторінці. Ось деякі з них:

click(): Клацання на елементі.
hover(): Наведення курсору на елемент.
fill(value): Заповнення поля введення текстом.
selectOption(value): Вибір опції у випадаючому списку.
check(): Позначення чекбокса.
uncheck(): Зняття позначки з чекбокса.
press(key): Натискання клавіші на елементі.
focus(): Перемикання фокусу на елемент.
scrollIntoView(): Прокручування до видимості елементу.
innerText() - Дозволяє отримати текст з елемента
Повний список методів локатора можна подивитись тут.