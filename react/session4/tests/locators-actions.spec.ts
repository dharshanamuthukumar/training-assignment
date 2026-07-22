import { test, expect } from '@playwright/test';

// Section 1 — Locator Chaining & Filtering
test.describe('Locator Chaining and Filtering', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Why .filter({ hasText: 'Priya' }) is safer than .nth(1):
  // Using .nth(1) relies on fixed array index ordering. If rows are re-ordered, sorted dynamically, or if an item
  // is inserted above Priya, .nth(1) will point to a different row and test assertion will fail or produce false positives.
  // .filter({ hasText: 'Priya' }) semantically targets the row containing Priya regardless of its position in the list.
  test('finds Rahul\'s Remove button using filter', async ({ page }) => {
    // Without filtering, getByRole('button', { name: 'Remove' }) matches ALL Remove buttons
    // Filter narrows it to the row that contains 'Rahul'
    const rahulRow = page.getByRole('row').filter({ hasText: 'Rahul' });
    const removeButton = rahulRow.getByRole('button', { name: 'Remove' });

    await expect(removeButton).toBeVisible();
  });

  test('finds Priya\'s score using filter and chaining', async ({ page }) => {
    const priyaRow = page.getByRole('row').filter({ hasText: 'Priya' });

    await expect(priyaRow).toBeVisible();
    // Now assert something inside Priya's row specifically
    await expect(priyaRow.getByText('78')).toBeVisible();
  });

  // Difference between filter({ hasText: 'Pass' }) and filter({ has: page.getByText('Pass') }):
  // - filter({ hasText: 'Pass' }) matches on text content anywhere inside the element (string match on innerText).
  // - filter({ has: page.getByText('Pass') }) is a locator-based filter that verifies the presence of a child element matching
  //   that specific locator. It allows targeting specific child element types or nested structures rather than plain string content.
  test('counts only the rows that show Pass badge', async ({ page }) => {
    // Filter rows to only those that contain a Pass badge
    const passingRows = page.getByRole('row').filter({
      has: page.getByText('Pass'),
    });

    // Adjust the expected count to match your actual initial data
    await expect(passingRows).toHaveCount(3);
  });

  test('counts only the rows that show Fail badge', async ({ page }) => {
    const failingRows = page.getByRole('row').filter({
      has: page.getByText('Fail'),
    });

    await expect(failingRows).toHaveCount(1);
  });

  // Observation on when .nth() is dangerous:
  // If we remove the first intern using .first() / .nth(0), the intern list drops from 4 to 3. If we run tests or re-order
  // the backend list, .first() will target whichever intern currently occupies index 0 (e.g., Priya after Rahul is removed).
  // .nth() is dangerous whenever list content is dynamic, user-sortable, or subject to deletions because the index changes.
  test('first Remove button belongs to the first intern', async ({ page }) => {
    // .first() is zero-index shorthand for .nth(0)
    const firstRemove = page.getByRole('button', { name: 'Remove' }).first();
    await expect(firstRemove).toBeVisible();
  });

  test('last Remove button belongs to the last intern', async ({ page }) => {
    const lastRemove = page.getByRole('button', { name: 'Remove' }).last();
    await expect(lastRemove).toBeVisible();
  });

  test('second row is accessible by index', async ({ page }) => {
    const secondRow = page.getByRole('row').nth(1);
    await expect(secondRow).toBeVisible();
  });

});

// Section 2 — Scoped Locators
test.describe('Scoped Locators', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Scoped Locators Problem Solving:
  // When a page has repeated UI structures (like card lists or table rows), unscoped queries like page.getByText('Pass')
  // return multiple elements across the page, causing locator ambiguity errors or false-positive passes when a badge exists
  // in the wrong card. Scoping queries to a container ensures assertions check elements exclusively inside that specific card.
  test('asserts score and badge inside Rahul\'s card only', async ({ page }) => {
    // Find Rahul's card by filtering on the container
    const rahulCard = page.getByRole('row').filter({ hasText: 'Rahul' });

    // All assertions are scoped to Rahul's card — not the whole page
    await expect(rahulCard.getByText('92')).toBeVisible();
    await expect(rahulCard.getByText('Pass')).toBeVisible();
    await expect(rahulCard.getByRole('button', { name: 'Remove' })).toBeVisible();
  });

  test('asserts different data in two different cards', async ({ page }) => {
    const rahulCard = page.getByRole('row').filter({ hasText: 'Rahul' });
    const amitCard  = page.getByRole('row').filter({ hasText: 'Amit' });

    await expect(rahulCard.getByText('Pass')).toBeVisible();
    await expect(amitCard.getByText('Fail')).toBeVisible();
  });

  // Scenarios where scoping locators to a form or section prevents a false-positive test pass:
  // 1. Multiple forms on the page (e.g. "Add Intern" form and "Edit Intern" form or a search bar) both containing inputs named "Name".
  // 2. A header or filter bar containing a search button and a form containing a submit button both named "Submit".
  // Scoping ensures interaction happens with the intended form instance.
  test('fills the form using scoped locators on the form container', async ({ page }) => {
    // Scope all actions to the form — avoids matching inputs that might exist elsewhere
    const form = page.getByRole('form', { name: 'Add Intern' });

    await form.getByLabel('Intern Name').fill('Vikram');
    await form.getByLabel('Score').fill('75');
    await form.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByRole('heading', { name: 'Vikram' })).toBeVisible();
  });

});

// Section 3 — Actions
test.describe('Actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Resilience difference between selectOption('Backend') (value) and selectOption({ label: 'Backend' }) (visible text):
  // selectOption({ label: 'Backend' }) selects based on user-visible text. It is more resilient to internal refactoring
  // if developers change underlying option values (e.g., from 'BE' to 'Backend') while maintaining the user-facing text interface.
  test('fill sets the input value directly', async ({ page }) => {
    await page.getByPlaceholder('Name', { exact: true }).fill('Vikram');

    await expect(page.getByPlaceholder('Name', { exact: true })).toHaveValue('Vikram');
  });

  test('selectOption selects by visible label text', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Role' }).selectOption({ label: 'Backend' });

    await expect(page.getByRole('combobox', { name: 'Role' })).toHaveValue('Backend');
  });

  test('selectOption selects by value attribute', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Role' }).selectOption('Frontend');

    await expect(page.getByRole('combobox', { name: 'Role' })).toHaveValue('Frontend');
  });

  // Why check() is preferred over click() for checkboxes:
  // check() is idempotent — it ensures the checkbox reaches the checked state. If the checkbox is already checked,
  // check() does nothing. Using click() on an already checked checkbox toggles it OFF, causing unintended test failures.
  test('checkbox is checked by default', async ({ page }) => {
    const presentCheckbox = page.getByRole('checkbox', { name: 'Present' });
    await expect(presentCheckbox).toBeChecked();
  });

  test('uncheck removes the checked state', async ({ page }) => {
    const presentCheckbox = page.getByRole('checkbox', { name: 'Present' });

    await presentCheckbox.uncheck();

    await expect(presentCheckbox).not.toBeChecked();
  });

  test('check re-applies the checked state', async ({ page }) => {
    const presentCheckbox = page.getByRole('checkbox', { name: 'Present' });

    await presentCheckbox.uncheck();
    await presentCheckbox.check();

    await expect(presentCheckbox).toBeChecked();
  });

  // Difference between locator.press('Tab') and page.keyboard.press('Tab'):
  // - locator.press('Tab') sends the Tab key event to the specific element targeted by the locator after ensuring it is focused.
  // - page.keyboard.press('Tab') dispatches a raw hardware Tab key event to whichever element currently has focus on the active page.
  test('Tab moves focus from name input to score input', async ({ page }) => {
    const nameInput  = page.getByPlaceholder('Name', { exact: true });
    const scoreInput = page.getByPlaceholder('Score');

    await nameInput.focus();
    await expect(nameInput).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(scoreInput).toBeFocused();
  });

  test('Enter inside name input submits the form', async ({ page }) => {
    await page.getByPlaceholder('Name', { exact: true }).fill('Vikram');
    await page.getByPlaceholder('Name', { exact: true }).press('Enter');

    // Validation error or submission depends on whether other fields are required
    // Assert the observable outcome — adjust to match your form's behaviour
    await expect(
      page.getByText('Name is required').or(page.getByRole('heading', { name: 'Vikram' }))
    ).toBeVisible();
  });

  // Why choose type() over fill():
  // fill() sets the value of the input instantly and triggers input/change events as a batch.
  // type() simulates individual keystrokes one character at a time. type() is necessary for inputs with live search filtering,
  // autocomplete dropdowns, or keystroke masks (e.g. phone numbers or credit card inputs) that react to keydown/keyup events.
  test('clear() empties the input', async ({ page }) => {
    const scoreInput = page.getByPlaceholder('Score');

    await scoreInput.fill('92');
    await scoreInput.clear();

    await expect(scoreInput).toHaveValue('');
  });

  test('type() fires individual key events', async ({ page }) => {
    // type() is for inputs that react to each keystroke — e.g. search with live filtering
    await page.getByPlaceholder('Search by name or role').type('Rah');

    // Filtered results should appear immediately as characters are typed
    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();
  });

});

// Self-Learning Debugging Note:
// Two situations where page.pause() helps fix a failing test faster than error messages alone:
// 1. Inspecting real-time DOM/CSS state mid-test when elements fail visibility checks due to unexpected overlays, animations, or styling.
// 2. Interactively debugging dynamic element selectors in Playwright Inspector using the Pick Locator feature to test queries directly against the browser.
