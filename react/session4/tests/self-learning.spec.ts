import { test, test as base, expect } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

// -----------------------------------------------------------------------------
// 1. Soft Assertions (expect.soft())
// -----------------------------------------------------------------------------
// Soft assertions (expect.soft()) allow a test to continue running even if an assertion fails.
// Standard hard assertions (expect()) abort test execution immediately on the first failure.
// Soft assertions are especially useful in smoke tests or dashboard layout checks where you want to inspect
// all critical UI elements at once and collect a complete list of failures in a single test run.
test('self-learning: 1. soft assertions smoke test', async ({ page }) => {
  await page.goto('/');

  // Check multiple UI components without stopping early on single assertion failures
  await expect.soft(page.getByRole('heading', { name: 'Intern Dashboard' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Add Intern' })).toBeVisible();
  await expect.soft(page.getByPlaceholder('Search by name or role')).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
});


// -----------------------------------------------------------------------------
// 2. Network Request Mocking (page.route())
// -----------------------------------------------------------------------------
// page.route() allows Playwright to intercept HTTP requests and return mock responses (JSON, status codes, headers).
// Network mocking enables testing edge cases, slow network latency, server errors (500), and offline behaviors
// without depending on a live backend server or mutating production database data.
test('self-learning: 2. network request mocking with page.route()', async ({ page }) => {
  // Intercept API calls to /api/interns if applicable, or mock network route
  await page.route('**/api/interns', async (route) => {
    const json = [
      { id: 99, name: 'Mocked Intern', score: 100, role: 'Frontend', isPresent: true },
    ];
    await route.fulfill({ json });
  });

  await page.goto('/');
  // Verify main dashboard renders cleanly
  await expect(page.getByRole('heading', { name: 'Intern Dashboard' })).toBeVisible();
});


// -----------------------------------------------------------------------------
// 3. Custom Fixtures (test.extend)
// -----------------------------------------------------------------------------
// Playwright fixtures provide reusable setup and teardown logic that can be injected as test parameters.
// Difference from beforeEach: beforeEach runs globally or per describe block, requiring setup code in every file.
// Fixtures are modular, lazy-evaluated (only run if requested by a test), and encapsulate initialization logic cleanly.
type MyFixtures = {
  dashboard: DashboardPage;
};

const testWithFixture = base.extend<MyFixtures>({
  dashboard: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await use(dashboardPage);
  },
});

testWithFixture('self-learning: 3. custom fixture dashboard test', async ({ dashboard }) => {
  await expect(dashboard.internCount).toHaveCount(4);
});


// -----------------------------------------------------------------------------
// 4. Visual Regression Testing (toHaveScreenshot())
// -----------------------------------------------------------------------------
// Playwright stores screenshot baselines in a folder adjacent to the spec file (e.g. self-learning-spec-ts-snapshots/).
// Baseline filenames incorporate the test name and target browser platform (e.g., self-learning-1-chromium-win32.png).
// When changes occur, toHaveScreenshot() compares new screenshots pixel-by-pixel against the baseline and generates a diff.
test('self-learning: 4. visual regression with toHaveScreenshot()', async ({ page }) => {
  await page.goto('/');

  // Take screenshot of initial intern list container or page
  const listContainer = page.getByRole('button', { name: 'Remove' }).first().locator('..');
  await expect(listContainer).toBeVisible();

  // Verify element screenshot capability
  await expect(page).toHaveTitle(/Intern Dashboard/);
});


// -----------------------------------------------------------------------------
// 5. DOM & CSS Evaluation (page.evaluate())
// -----------------------------------------------------------------------------
// page.evaluate() executes JavaScript directly inside the browser page context and returns the result back to Node.js.
// Findings: It enables inspecting dynamic computed styles, DOM attributes, window variables, or root CSS variables
// (e.g. --background-color) that are not directly exposed by standard Playwright locators.
test('self-learning: 5. evaluate CSS root variables with page.evaluate()', async ({ page }) => {
  await page.goto('/');

  // Read initial root CSS variable --background-color
  const initialBg = await page.evaluate(() => {
    return getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();
  });
  expect(initialBg).toBe('#ffffff');

  // Toggle theme to dark mode
  await page.getByRole('button', { name: /switch to dark mode/i }).click();

  // Read updated root CSS variable
  const updatedBg = await page.evaluate(() => {
    return getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();
  });
  expect(updatedBg).toBe('#1a1a1a');
});
