import { test, expect } from '@playwright/test';

// Section 4 — Assertions Deep Dive

// Why toBeEnabled() is more useful than toBeVisible() for a button:
// toBeVisible() only asserts that the button is present in the DOM and rendered without display:none/visibility:hidden.
// It misses scenarios where a button is disabled (e.g. disabled attribute or aria-disabled="true") due to pending form
// validations or loading states. toBeEnabled() verifies both visibility and interactive readiness.
test.describe('Assertions — State', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Add Intern button is enabled', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Add Intern' })).toBeEnabled();
  });

  test('name input is editable', async ({ page }) => {
    await expect(page.getByPlaceholder('Name', { exact: true })).toBeEditable();
  });

  test('Present checkbox is checked by default', async ({ page }) => {
    await expect(page.getByRole('checkbox', { name: 'Present' })).toBeChecked();
  });

  test('name input receives focus when clicked', async ({ page }) => {
    await page.getByPlaceholder('Name', { exact: true }).click();
    await expect(page.getByPlaceholder('Name', { exact: true })).toBeFocused();
  });

});

// Why toHaveClass(/dark/) uses a regex rather than an exact string match:
// Elements often have multiple CSS class names (e.g. className="container flex dark theme-v2").
// Using exact string matching toHaveClass('dark') fails when other classes are present.
// Regex matching toHaveClass(/dark/) checks if the class list contains 'dark' regardless of order or additional classes.
test.describe('Assertions — Attributes and Classes', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Present checkbox has type attribute of checkbox', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Present' })
    ).toHaveAttribute('type', 'checkbox');
  });

  test('dark class is applied to body after theme toggle', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    // Assert a CSS class was added to the root element
    await expect(page.locator('body')).toHaveClass(/dark/);
  });

  test('dark class is removed after toggling back to light', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    await expect(page.locator('body')).not.toHaveClass(/dark/);
  });

});

// Findings on toHaveScreenshot():
// On the first run, toHaveScreenshot() creates a golden reference baseline image.
// On subsequent runs, it captures a new screenshot and compares pixel-by-pixel against the baseline.
// If visible text or styling on the page changes, Playwright flags a diff error and generates comparison images.
test.describe('Assertions — Page Level', () => {

  test('page has the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Intern Dashboard/);
  });

  test('page URL is the root path', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('http://localhost:5173/');
  });

});
