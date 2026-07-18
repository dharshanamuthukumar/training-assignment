import { test, expect, vi } from "vitest";

// Fix for FIRST Principles: Fast and Repeatable
// Instead of calling a real API server, we mock fetch and provide controlled
// test data. This makes the test faster because there is no network request,
// and repeatable because the result is always the same.

test("loads interns from API", async () => {
  const mockInterns = [
    { id: 1, name: "Rahul", score: 92 },
    { id: 2, name: "Priya", score: 78 },
    { id: 3, name: "Amit", score: 45 },
    { id: 4, name: "Kiran", score: 95 },
  ];

  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockInterns),
    }),
  ) as unknown as typeof fetch;

  const response = await fetch("/api/interns");

  const data = await response.json();

  expect(data).toHaveLength(4);

  expect(fetch).toHaveBeenCalledTimes(1);
});
