import { render, screen, within } from "./test-utils";
import { act } from "@testing-library/react";
import ScoreStats from "../components/ScoreStats";

// vi.useFakeTimers() replaces the real browser timers with fake ones.
// This allows tests to control setTimeout() and setInterval() instantly
// without waiting for real time to pass. vi.useRealTimers() restores
// the normal timer behavior after the test.

test("loads intern data immediately using fake timers", () => {
  vi.useFakeTimers();

  render(<ScoreStats />);

  expect(screen.getByText("Loading interns...")).toBeInTheDocument();

  act(() => {
    vi.runAllTimers();
  });

  expect(screen.queryByText("Loading interns...")).not.toBeInTheDocument();
  expect(screen.getByText("Rahul")).toBeInTheDocument();
  expect(screen.getByText("Priya")).toBeInTheDocument();

  vi.useRealTimers();
});

// The within() helper limits queries to a specific parent element.
// It is useful when similar text appears multiple times in the page.

test("uses within to scope queries to one intern card", () => {
  render(
    <div>
      <div data-testid="rahul-card">
        <h3>Rahul</h3>
        <p>Score: 92</p>
      </div>

      <div data-testid="priya-card">
        <h3>Priya</h3>
        <p>Score: 78</p>
      </div>
    </div>,
  );

  const rahulCard = screen.getByTestId("rahul-card");

  expect(within(rahulCard).getByText("Rahul")).toBeInTheDocument();
  expect(within(rahulCard).getByText("Score: 92")).toBeInTheDocument();
  expect(within(rahulCard).queryByText("Score: 78")).not.toBeInTheDocument();
});

//SL4
import AddInternForm from "../components/AddInternForm";
import userEvent from "@testing-library/user-event";

// user.tab() simulates pressing the Tab key to move keyboard focus
// through focusable elements in the same order as a real user.
// toHaveFocus() verifies which element currently has keyboard focus.

test("moves focus between form inputs using the Tab key", async () => {
  const user = userEvent.setup();

  render(<AddInternForm onAdd={() => {}} count={0} />);

  const nameInput = screen.getByPlaceholderText("Name");
  const scoreInput = screen.getByPlaceholderText("Score");
  const addButton = screen.getByRole("button", { name: "Add Intern" });

  await user.tab();
  expect(nameInput).toHaveFocus();

  await user.tab();
  expect(scoreInput).toHaveFocus();

  await user.tab();
  expect(addButton).toHaveFocus();
});

//SL 5
// SL-5 Findings:
//
// Line coverage for useInternForm.ts: 100%
//
// Line coverage measures the percentage of executable lines
// that were run during the tests.
//
// Branch coverage measures whether every possible decision
// path (such as the true and false branches of if/else
// statements) was executed during testing.
//
// Branch coverage is stricter than line coverage because
// executing a line once does not guarantee that every
// possible branch on that line has been tested.

//task2 session5
// Coverage report shows four main numbers:
//
// 1. Statements (%) - Percentage of executable statements that were run
//    during tests.
//
// 2. Branches (%) - Percentage of decision paths tested, such as if/else,
//    ternary operators, and logical conditions.
//
// 3. Functions (%) - Percentage of functions that were called during tests.
//
// 4. Lines (%) - Percentage of source code lines executed by tests.
//
// The lowest coverage number should be identified from the coverage table.
// The lowest value shows the area of code that needs more tests.
//
// Example:
// If Branch coverage is lowest, it means some conditions or edge cases
// are not tested even though the main code paths are covered.

// Coverage report shows four main metrics:
//
// 1. Statements:
//    Percentage of executable statements that were run by tests.
//
// 2. Branches:
//    Percentage of decision paths tested, such as if/else conditions.
//
// 3. Functions:
//    Percentage of functions that were called during testing.
//
// 4. Lines:
//    Percentage of source code lines executed.
//
// The lowest percentage shows the least tested area and indicates
// where additional tests may be needed.
import { test, expect } from "vitest";

test("just to hit the line", () => {
  // Arrange
  const form = {
    name: "",
    score: 0,
    isPresent: true,
    role: "Frontend",
  };

  // Act
  JSON.stringify(form);

  // Assert
  expect(true).toBe(true);
});

// This test may increase coverage because it executes code,
// but it does not improve test quality.
// The assertion always passes, so it cannot detect incorrect behavior
// or catch any real bug.
// High coverage numbers do not always mean the code is well tested.
// Meaningful assertions are required to verify correctness.
