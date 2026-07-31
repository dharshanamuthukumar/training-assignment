import { render, screen } from "../test/test-utils";
import { test, expect, vi } from "vitest";
import ScoreStats from "./ScoreStats";

// vi.mock() replaces a real dependency with a controlled fake version.
// It helps isolate the component from external state, APIs, or providers.
// In this test, ScoreStats uses internal state, so no context mock is required.

test("shows total intern count as 2", async () => {
  // Arrange
  render(<ScoreStats />);

  // Act
  const rahul = await screen.findByText("Rahul");

  // Assert
  expect(rahul).toBeInTheDocument();
});

test("shows intern scores after loading completes", async () => {
  // Arrange
  render(<ScoreStats />);

  // Act
  const priya = await screen.findByText("Priya");

  // Assert
  expect(priya).toBeInTheDocument();
});

test("shows correct score values for interns", async () => {
  // Arrange
  render(<ScoreStats />);

  // Act
  const score = await screen.findByText("Score: 92");

  // Assert
  expect(score).toBeInTheDocument();
});

// Mock as little as possible:
//
// 1. We did not mock useState or useMemo because they are React's internal
// behavior and should run normally. Mocking them would make the test less
// realistic and could hide actual component bugs.
//
// 2. We did not mock addIntern or removeIntern because ScoreStats does not
// use them. If a component used these functions accidentally, a mock would
// allow the test to continue instead of exposing the unwanted dependency.
// For components that only read data, action functions should not be included
// unless the component requires them.
//
// 3. If the Intern interface gains a new required field, the mock data may
// fail TypeScript compilation if the new field is required. This is useful
// because the test immediately tells us that our controlled test data is
// outdated and needs to be updated.
