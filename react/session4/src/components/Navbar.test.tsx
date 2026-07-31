import { render, screen } from "../test/test-utils";
import { render as rtlRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import { ThemeProvider } from "../contexts/theme-context";

// We import render from ../test/test-utils because it automatically wraps
// Navbar with ThemeProvider. If we used render from
// @testing-library/react directly, useTheme() would throw an error saying
// it must be used inside a ThemeProvider.

test("renders the dashboard title", () => {
  render(<Navbar />);

  expect(screen.getByText("Intern Dashboard")).toBeInTheDocument();
});

test("theme toggle button is visible", () => {
  render(<Navbar />);

  expect(
    screen.getByRole("button", {
      name: /switch to dark mode/i,
    }),
  ).toBeInTheDocument();
});

test("theme toggle button label changes after click", async () => {
  const user = userEvent.setup();

  render(<Navbar />);

  await user.click(
    screen.getByRole("button", {
      name: /switch to dark mode/i,
    }),
  );

  expect(
    screen.getByRole("button", {
      name: /switch to light mode/i,
    }),
  ).toBeInTheDocument();
});
//SL1
// This test is equivalent to the previous tests because the component is
// manually wrapped in ThemeProvider. The custom render helper does the
// same thing automatically, reducing duplicate code and making tests
// easier to maintain.

test("renders correctly when wrapped manually in ThemeProvider", () => {
  rtlRender(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>,
  );

  expect(screen.getByText("Intern Dashboard")).toBeInTheDocument();
});
