// Page Object Model (POM) centralizes element locators and page interaction logic into reusable class methods.
// The main benefit of POM is maintainability: if an element attribute or locator changes (e.g., if the "Name" placeholder
// in the React component is renamed from "Name" to "Intern Full Name"), you only need to update the locator once in this
// Page Object file, rather than updating dozens of test files across your test suite.

import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
  readonly page:        Page;
  readonly nameInput:   Locator;
  readonly scoreInput:  Locator;
  readonly roleSelect:  Locator;
  readonly addButton:   Locator;
  readonly resetButton: Locator;
  readonly searchInput: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page        = page;
    this.nameInput   = page.getByPlaceholder('Name', { exact: true });
    this.scoreInput  = page.getByPlaceholder('Score');
    this.roleSelect  = page.locator('select[name="role"]');
    this.addButton   = page.getByRole('button', { name: 'Add Intern' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.searchInput = page.getByPlaceholder('Search by name or role');
    this.themeToggle = page.getByRole('button', { name: /switch to/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  async addIntern(name: string, score: string, role = 'Frontend') {
    await this.nameInput.fill(name);
    await this.scoreInput.clear();
    await this.scoreInput.fill(score);
    await this.roleSelect.selectOption(role);
    await this.addButton.click();
  }

  async search(query: string) {
    await this.searchInput.fill(query);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  // Navigate from intern name heading up to the parent card div
  internCard(name: string): Locator {
    return this.page.getByRole('heading', { name }).locator('..');
  }

  removeButtonFor(name: string): Locator {
    return this.internCard(name).getByRole('button', { name: 'Remove' });
  }

  get internCount(): Locator {
    return this.page.getByRole('button', { name: 'Remove' });
  }

  // Playwright's locatorA.or(locatorB) combinator returns a new locator that matches elements matching either locatorA OR locatorB.
  // This is extremely useful in real-world applications where UI components might render error messages using accessible roles
  // (e.g. role="alert") or specific CSS class names (e.g. .error-message). Using or() makes locators resilient to template variations.
  validationError(): Locator {
    return this.page.getByRole('alert').or(this.page.locator('[class*="error"]'));
  }
}
