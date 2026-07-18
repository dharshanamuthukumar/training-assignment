import { test } from "vitest";

// FIRST Principle Violated: Self-Validating
// This test only prints the average to the console and has no assertion.
// Since nothing is being verified, the test will always pass even if the
// calculation is incorrect. This is dangerous because it can hide bugs and
// give a false sense of confidence that the code is working.

test("calculates average score", () => {
  const scores = [92, 78, 45, 95];

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  console.log("Average:", avg); // no assertion
});
