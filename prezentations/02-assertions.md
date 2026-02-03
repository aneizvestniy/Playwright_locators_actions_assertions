Assertions
Playwright має вбудовані асерти у вигляді функції expect . Викличте expect(value) і виберіть необхідний вам матчер. Є багато вбудованих матчерів, таких як toBe,toEqual, toContain, toBeTruthy та інші.


expect(1).toBeTruthy();

Playwright також має специфічні асерти які є асинхронними і будуть чекати поки задана умова не справдиться. Наприклад:


await expect(page.getByTestId('status')).toHaveText('Submitted');

Ось деякі асинхронні асерти що автоматично повторюються, доки перевірка не виконається або не буде вичерпано таймаут. Зауважте, що перевірки виконуються асинхронно, тому потрібно очікувати їх результату await:

await expect(locator).toBeAttached() Елемент прикріплений await expect(locator).toBeChecked() Чекбокс відмічений await expect(locator).toBeDisabled() Елемент вимкнений await expect(locator).toBeEnabled() Елемент увімкнений await expect(locator).toBeFocused() Елемент має фокус await expect(locator).toBeHidden() Елемент не видимий await expect(locator).toBeInViewport() Елемент перетинає viewport await expect(locator).toBeVisible() Елемент видимий await expect(locator).toContainText() Елемент містить текст await expect(locator).toHaveAttribute()Елемент має вказаний атрибут DOM await expect(locator).toHaveClass() Елемент має властивість класу await expect(page).toHaveTitle() Сторінка має вказаний заголовок await expect(page).toHaveURL()Сторінка має вказаний URL await expect(response).toBeOK() Відповідь має статус ОК


Більше прикладів тут.


Також ми можемо очікувати протилежне, додавши .not до початку матчерів:


await expect(locator).not.toContainText('some text'); // чекаємо, що локатор не містить тексту 'some text';

За замовчуванням, невдала перевірка припинить виконання тесту. Playwright також підтримує м'які перевірки (soft assertions): невдалі м'які перевірки не припиняють виконання тесту, але позначають його як невдалий.


// Проводимо кілька перевірок, які не зупинять тест при невдачі...
await expect.soft(page.getByTestId('status')).toHaveText('Success');
await expect.soft(page.getByTestId('eta')).toHaveText('1 day');

// ... і продовжуємо тест, щоб перевірити більше речей.
await page.getByRole('link', { name: 'next page' }).click();
await expect(page.getByRole('heading', { name: 'Make another order' })).toBeVisible();