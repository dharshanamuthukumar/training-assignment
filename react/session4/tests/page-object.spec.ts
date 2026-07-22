import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

test.describe('Journeys via Page Object', () => {

  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.goto();
  });

  test('adds a new intern', async () => {
    await dashboard.addIntern('Vikram', '88', 'Backend');

    await expect(dashboard.internCard('Vikram')).toBeVisible();
    await expect(dashboard.internCount).toHaveCount(5);
  });

  test('searches and filters the list', async () => {
    await dashboard.search('Rah');

    await expect(dashboard.internCount).toHaveCount(1);
    await expect(dashboard.internCard('Rahul')).toBeVisible();
  });

  test('clears search and restores all interns', async () => {
    await dashboard.search('Rahul');
    await dashboard.clearSearch();

    await expect(dashboard.internCount).toHaveCount(4);
  });

  test('removes an intern by name', async () => {
    await dashboard.removeButtonFor('Rahul').click();

    await expect(dashboard.internCard('Rahul')).not.toBeVisible();
    await expect(dashboard.internCount).toHaveCount(3);
  });

  // How dashboard.themeToggle is found in the constructor and why toContainText('Light') is sufficient:
  // dashboard.themeToggle uses page.getByRole('button', { name: /switch to/i }). When clicked, the button's text updates
  // from "Switch to Dark Mode" to "Switch to Light Mode". Asserting toContainText('Light') verifies that the label text
  // updated correctly, confirming that the theme context toggled to dark mode.
  test('toggles theme and button label updates', async () => {
    await dashboard.toggleTheme();

    await expect(dashboard.themeToggle).toContainText('Light');
  });

  test('shows validation error on empty submit', async ({ page }) => {
    await dashboard.addButton.click();

    await expect(page.getByText('Name is required')).toBeVisible();
  });

  // Real-world scenario for using test.skip(browserName !== 'chromium', ...):
  // You would use browser-specific skips when testing features relying on web APIs exclusive to Chromium (or with different implementations across engines),
  // such as Chrome Extension APIs, WebGPU, Web Bluetooth, or specific Chromium DevTools Protocol (CDP) features.
  test('chromium-only feature check', async ({ page, browserName }) => {
    // Skip this test on Firefox and WebKit
    test.skip(browserName !== 'chromium', 'This test targets Chromium-specific behaviour only');

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Intern Dashboard' })).toBeVisible();
  });

});
