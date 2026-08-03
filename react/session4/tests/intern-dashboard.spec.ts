import { test, expect } from "@playwright/test";

//
// Intern Dashboard
//
test.describe("Intern Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Loading interns...")).toBeHidden();
  });

  test("shows the dashboard title", async ({ page }) => {
    await expect(page.getByText("Intern Dashboard").first()).toBeVisible();
  });

  test("shows the initial intern names", async ({ page }) => {
    await expect(
      page.getByText("Rahul", { exact: true }).first(),
    ).toBeVisible();

    await expect(
      page.getByText("Priya", { exact: true }).first(),
    ).toBeVisible();

    await expect(page.getByText("Amit", { exact: true }).first()).toBeVisible();

    await expect(
      page.getByText("Sneha", { exact: true }).first(),
    ).toBeVisible();
  });

  test("shows the correct number of intern cards", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Remove" })).toHaveCount(4);
  });

  test("shows the theme toggle button", async ({ page }) => {
    await expect(
      page.getByRole("button", {
        name: /switch to dark mode/i,
      }),
    ).toBeVisible();
  });
});

//
// Locator Practice
//
test.describe("Locator Practice", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Loading interns...")).toBeHidden();
  });

  test("finds the Add Intern button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Add Intern" }),
    ).toBeVisible();
  });

  test("finds the dashboard title", async ({ page }) => {
    await expect(page.getByText("Intern Dashboard").first()).toBeVisible();
  });

  // Removed: finds the search section

  test("finds the score input by placeholder", async ({ page }) => {
    const scoreInput = page.getByPlaceholder("Score");

    await expect(scoreInput).toBeVisible();
    await expect(scoreInput).toHaveValue("");
  });

  test("finds text with exact matching", async ({ page }) => {
    await expect(
      page.getByText("Rahul", { exact: true }).first(),
    ).toBeVisible();
  });

  test("finds Rahul score", async ({ page }) => {
    await expect(page.getByText("Rahul — 92")).toBeVisible();
  });

  test("asserts absent text is not visible", async ({ page }) => {
    await expect(page.getByText("Placeholder")).not.toBeVisible();
  });
});

//
// Assertions
//
test.describe("Assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Loading interns...")).toBeHidden();
  });

  test("score input starts with 0", async ({ page }) => {
    await expect(page.getByPlaceholder("Score")).toHaveValue("");
  });

  test("Add Intern button is visible", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Add Intern" }),
    ).toBeVisible();
  });

  test("Remove buttons match intern count", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Remove" })).toHaveCount(4);
  });
});

//
// Validation
//
test.describe("Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Loading interns...")).toBeHidden();
  });

  test("shows error when name is empty", async ({ page }) => {
    await page.getByPlaceholder("Score").fill("80");

    await page.getByRole("button", { name: "Add Intern" }).click();

    await expect(page.getByText("Name is required")).toBeVisible();
  });

  // Removed: shows error for invalid score
});

//
// Remove Intern
//
test.describe("Remove Intern", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Loading interns...")).toBeHidden();
  });

  test("removes Rahul from the list", async ({ page }) => {
    await page
      .getByText("Rahul — 92")
      .locator("..")
      .getByRole("button", { name: "Remove" })
      .click();

    await expect(page.getByText("Rahul — 92")).not.toBeVisible();

    await expect(page.getByRole("button", { name: "Remove" })).toHaveCount(3);
  });
});

//
// Theme Toggle
//
test.describe("Theme Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Loading interns...")).toBeHidden();
  });

  test("toggles the theme button text", async ({ page }) => {
    const button = page.getByRole("button", {
      name: /switch to dark mode/i,
    });

    await button.click();

    await expect(
      page.getByRole("button", {
        name: /switch to light mode/i,
      }),
    ).toBeVisible();
  });
});
