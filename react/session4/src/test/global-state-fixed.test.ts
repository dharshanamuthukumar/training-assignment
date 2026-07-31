// src/test/global-state-fixed.test.ts

import { test, expect } from "vitest";

// First Principles Applied:
// - No shared mutable state.
// - Pure functions: output depends only on input.
// - Immutability: return a new array instead of modifying the existing one.
// - Test isolation: each test uses its own cart.
// - Predictable behavior: tests pass regardless of execution order.

function addItem(cart: string[], item: string) {
  return [...cart, item];
}

function removeItem(cart: string[], item: string) {
  return cart.filter((cartItem) => cartItem !== item);
}

test("cart starts empty", () => {
  const cart: string[] = [];
  expect(cart).toHaveLength(0);
});

test("can add an item", () => {
  const cart: string[] = [];
  const result = addItem(cart, "Rahul");
  expect(result).toHaveLength(1);
});

test("can add two items", () => {
  const cart: string[] = [];

  let result = addItem(cart, "Rahul");
  result = addItem(result, "Priya");

  expect(result).toHaveLength(2);
});

test("cart is empty again", () => {
  const cart: string[] = [];
  expect(cart).toHaveLength(0);
});
// The fixed version satisfies the FIRST testing principles by using pure
// functions and eliminating shared mutable state. Each test creates its own
// cart, making the tests Independent, Repeatable, and Predictable. Since the
// functions return new arrays instead of modifying existing ones, there are no
// side effects and the tests can run in any order.