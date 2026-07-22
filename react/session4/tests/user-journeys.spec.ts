import { test, expect } from '@playwright/test';

// What this user journey test catches that the Vitest unit test for AddInternForm cannot:
// The Vitest unit test checks AddInternForm in isolation with a mock onAdd callback. It cannot verify whether submitting
// the form actually updates global React Context state, triggers re-rendering of the InternList component, or correctly
// appends the new intern card into the DOM tree end-to-end.
test.describe('User Journey — Add Intern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('user fills the form and the new intern appears in the list', async ({ page }) => {
    // Confirm initial state
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    // Fill the form
    await page.getByPlaceholder('Name', { exact: true }).fill('Vikram');
    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('88');
    await page.locator('select[name="role"]').selectOption('Frontend');

    // Submit
    await page.getByRole('button', { name: 'Add Intern' }).click();

    // New intern's card heading appears
    await expect(page.getByRole('heading', { name: 'Vikram' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(5);
  });

  test('new intern shows Pass badge when score is 88', async ({ page }) => {
    await page.getByPlaceholder('Name', { exact: true }).fill('Vikram');
    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('88');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    // Scope to Vikram's card via name heading → parent div
    const vikramCard = page.getByRole('heading', { name: 'Vikram' }).locator('..');
    await expect(vikramCard.getByText('Pass')).toBeVisible();
  });

  test('new intern shows Fail badge when score is 45', async ({ page }) => {
    await page.getByPlaceholder('Name', { exact: true }).fill('Ravi');
    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('45');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    const raviCard = page.getByRole('heading', { name: 'Ravi' }).locator('..');
    await expect(raviCard.getByText('Fail')).toBeVisible();
  });

  test('form resets to empty after successful submission', async ({ page }) => {
    await page.getByPlaceholder('Name', { exact: true }).fill('Vikram');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByPlaceholder('Name', { exact: true })).toHaveValue('');
  });

});

test.describe('User Journey — Add Intern Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows error when submitting with empty name', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByText('Name is required')).toBeVisible();
  });

  test('does not add intern when name is empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Intern' }).click();

    // Count should remain unchanged
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
  });

  test('error clears after entering a valid name and resubmitting', async ({ page }) => {
    // Trigger error
    await page.getByRole('button', { name: 'Add Intern' }).click();
    await expect(page.getByText('Name is required')).toBeVisible();

    // Fix and resubmit
    await page.getByPlaceholder('Name', { exact: true }).fill('Vikram');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByText('Name is required')).not.toBeVisible();
  });

  test('shows error when score is above 100', async ({ page }) => {
    await page.getByPlaceholder('Name', { exact: true }).fill('Vikram');
    await page.getByPlaceholder('Score').clear();
    await page.getByPlaceholder('Score').fill('150');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByText('Score must be between 0 and 100')).toBeVisible();
  });

});

// Why type() is more realistic for a search input:
// Real users type characters sequentially into a search box, triggering keydown/keyup and input events with each character.
// Live filtering inputs update results progressively on each keystroke. type() simulates key delays and individual events,
// testing the actual real-time filtering behavior rather than setting the final input value in one instantaneous block like fill().
test.describe('User Journey — Search and Filter', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('typing in search filters the intern list', async ({ page }) => {
    // All 4 interns visible initially
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    // Search input has no label — use placeholder
    await page.getByPlaceholder('Search by name or role').fill('Rah');

    // Only Rahul's card remains
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Priya' })).not.toBeVisible();
  });

  test('clearing search restores all interns', async ({ page }) => {
    await page.getByPlaceholder('Search by name or role').fill('Rahul');
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(1);

    await page.getByPlaceholder('Search by name or role').clear();

    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
  });

  test('search is case-insensitive', async ({ page }) => {
    await page.getByPlaceholder('Search by name or role').fill('rahul');

    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(1);
  });

  test('no match shows empty state message', async ({ page }) => {
    await page.getByPlaceholder('Search by name or role').fill('zzz');

    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(0);
    await expect(page.getByText('No interns found')).toBeVisible();
  });

});

// Why using getByRole('heading', { name: 'Rahul' }).locator('..') is better than .first():
// .first() simply picks whichever Remove button happens to be index 0 in the DOM order. If the list order changes,
// or if a search filter changes card positions, .first() will delete the wrong intern.
// Scoping to Rahul's card via heading ensures we remove Rahul specifically, regardless of row position.
test.describe('User Journey — Remove Intern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clicking Remove on Rahul\'s card removes Rahul from the list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Rahul' })).toBeVisible();

    // Scope to Rahul's card via name heading → parent div
    const rahulCard = page.getByRole('heading', { name: 'Rahul' }).locator('..');
    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByRole('heading', { name: 'Rahul' })).not.toBeVisible();
  });

  test('intern count decreases after removal', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    const rahulCard = page.getByRole('heading', { name: 'Rahul' }).locator('..');
    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(3);
  });

  test('other interns remain after one is removed', async ({ page }) => {
    const rahulCard = page.getByRole('heading', { name: 'Rahul' }).locator('..');
    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    // The three remaining intern cards are still visible
    await expect(page.getByRole('heading', { name: 'Priya' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Amit' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sneha' })).toBeVisible();
  });

  test('removed intern does not reappear after page interaction', async ({ page }) => {
    const rahulCard = page.getByRole('heading', { name: 'Rahul' }).locator('..');
    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    // Trigger a re-render by toggling theme
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    await expect(page.getByRole('heading', { name: 'Rahul' })).not.toBeVisible();
  });

});

// Why asserting the button label change is a valid test for theme toggle in this application:
// In this application, theme state drives the label rendered on the button ("Switch to Dark Mode" vs "Switch to Light Mode").
// Asserting the label transition verifies that React context state toggled correctly.
// If the app applied a CSS class to the body or root element instead, we would assert page.locator('body').toHaveClass(/dark/).
test.describe('User Journey — Theme Toggle', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toggle button shows current mode to switch to', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

  test('clicking toggle switches to dark mode', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    // Button label updates — theme applied via inline styles, not a body class
    await expect(
      page.getByRole('button', { name: /switch to light mode/i })
    ).toBeVisible();
  });

  test('clicking toggle again switches back to light mode', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

});
