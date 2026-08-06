import { describe, test, expect } from "vitest";
import { validateInternForm } from "../utils/intern-validation";

describe("validateInternForm", () => {
  test("returns 'Name is required' when name is empty string", () => {
    expect(validateInternForm("", 90)).toBe("Name is required");
  });

  test("returns 'Name is required' when name is only whitespace", () => {
    expect(validateInternForm("     ", 90)).toBe("Name is required");
  });

  test("returns 'Score must be 0–100' when score is 101", () => {
    expect(validateInternForm("Rahul", 101)).toBe("Score must be 0–100");
  });

  test("returns 'Score must be 0–100' when score is -1", () => {
    expect(validateInternForm("Rahul", -1)).toBe("Score must be 0–100");
  });

  test("returns null when name is 'Rahul' and score is 92", () => {
    expect(validateInternForm("Rahul", 92)).toBeNull();
  });

  test("returns null when score is exactly 0", () => {
    expect(validateInternForm("Rahul", 0)).toBeNull();
  });

  test("returns null when score is exactly 100", () => {
    expect(validateInternForm("Rahul", 100)).toBeNull();
  });
});

// Reflection:
// Each test required 0–1 lines of Arrange because validateInternForm is a pure function and can be called directly.
// Testing the validation function is much simpler than testing it through useInternForm with renderHook,
// because there is no React hook setup, component rendering, state management, or context required.
// The tests focus only on the validation logic, making them shorter, faster, and easier to understand.