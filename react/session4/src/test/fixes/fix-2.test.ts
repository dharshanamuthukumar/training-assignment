import { test, expect, vi, afterEach } from "vitest";

// Fix for FIRST Principle: Repeatable
// Fake timers allow us to control the system date. By setting a fixed date,
// the test produces the same result every time it runs, regardless of the
// actual current date.

afterEach(() => {
  vi.useRealTimers();
});

// If we forget to restore real timers, other tests may continue using the
// mocked date/time, causing unexpected failures.

test("score report has today's date", () => {
  vi.useFakeTimers();

  vi.setSystemTime(new Date("2024-11-15"));

  const report = {
    date: new Date().toISOString().slice(0, 10),
  };

  expect(report.date).toBe("2024-11-15");
});
