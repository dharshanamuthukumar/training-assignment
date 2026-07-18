import { test, expect, beforeEach } from "vitest";

let interns: { id: number; name: string }[] = [];

// Fix for FIRST Principle: Independent
// beforeEach resets the shared state before every test. This ensures that
// each test starts with a clean array and does not depend on another test
// running before it. Both tests can now run in any order or independently.

beforeEach(() => {
  interns = [];
});

test("can add first intern", () => {
  interns.push({ id: 1, name: "Rahul" });

  expect(interns).toHaveLength(1);
});

test("can add second intern", () => {
  interns.push({ id: 1, name: "Rahul" });
  interns.push({ id: 2, name: "Priya" });

  expect(interns).toHaveLength(2);
});
