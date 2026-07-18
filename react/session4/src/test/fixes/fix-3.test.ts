import { test, expect } from "vitest";

// Fix for FIRST Principle: Self-validating
// The test now uses an assertion instead of console.log.
// The test will fail if the average calculation gives an incorrect result,
// making it automatically verify the behavior.

test("calculates average score correctly", () => {
  const scores = [92, 78, 45, 95];

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  expect(avg).toBe(77.5);
});
