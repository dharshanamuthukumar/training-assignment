import { test, expect } from "@playwright/test";

/*
Research 1

page.fill()
- Clears the existing value before entering new text.
- Faster for filling forms.

page.type()
- Types character by character.
- Triggers keyboard events naturally.
- Useful when testing autocomplete or live validation.
*/

test("fill vs type", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Loading interns...").waitFor({ state: "hidden" });

  await page.getByPlaceholder("Name", { exact: true }).fill("Rahul");

  await page.getByPlaceholder("Name", { exact: true }).clear();

  await page.getByPlaceholder("Name", { exact: true }).type("Rahul");
});

/*
Research 2

keyboard.press()

Tab moves keyboard focus to the next focusable element.
*/

test("Tab moves focus to score input", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Loading interns...").waitFor({ state: "hidden" });

  await page.getByPlaceholder("Name", { exact: true }).click();

  await page.keyboard.type("Akshaya");

  await page.keyboard.press("Tab");

  await expect(page.getByPlaceholder("Score")).toBeFocused();
});

/*
Research 3

page.screenshot()
Creates a screenshot of the page.
*/

test("take screenshot", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Loading interns...").waitFor({ state: "hidden" });

  await page.screenshot({
    path: "tests/screenshots/dashboard.png",
    fullPage: true,
  });
});

/*
Research 4

test.only()
- Runs only the specified test.

test.skip()
- Skips a specific test.

Never commit test.only() because all other tests will be ignored.
*/

test("dummy test", async () => {
  expect(true).toBe(true);
});
