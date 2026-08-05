import { test, expect, beforeEach } from "vitest";

// Global mutable state — the bug
let cart: string[] = [];

beforeEach(() => {
  cart = [];
});

function addItem(item: string) {
  cart.push(item);
  return cart;
}

function removeItem(item: string) {
  const index = cart.indexOf(item);
  if (index > -1) cart.splice(index, 1);
  return cart;
}

test("cart starts empty", () => {
  expect(cart).toHaveLength(0);
});

test("can add an item", () => {
  const result = addItem("Rahul");
  expect(result).toHaveLength(1);
});

test("can add two items", () => {
  addItem("Rahul");
  addItem("Priya");
  expect(cart).toHaveLength(2);
});

test("cart is empty again", () => {
  expect(cart).toHaveLength(0); // FAILS — previous tests left items behind
});


// Global State Bug:
// The `cart` array is declared globally, so all tests share the same instance.
// When one test adds items to the cart, those items remain in the array for the next test because the cart is never reset.
// As a result:
// - The third test fails because `cart` already contains "Rahul" from the
//   previous test, making its length 3 instead of the expected 2.
// - The fourth test fails because the cart is not empty; it still contains
//   items added by earlier tests.
// This happens because the tests are not isolated and depend on shared mutable state.