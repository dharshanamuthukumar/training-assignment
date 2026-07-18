import { test, expect } from "vitest";

const interns: { id: number; name: string }[] = [];

// FIRST Principle Violated: Independent
// These tests share the same "interns" array. The second test depends on
// the first test having already added an intern. If the second test is run
// by itself, the array starts empty, so the expected length of 2 becomes 1.
// Unit tests should be independent and should not rely on shared state or
// the order in which other tests are executed.

test("can add first intern", () => {
  interns.push({ id: 1, name: "Rahul" });

  expect(interns).toHaveLength(1);
});

test("can add second intern", () => {
  interns.push({ id: 2, name: "Priya" });

  expect(interns).toHaveLength(2); // fails if run alone
});
