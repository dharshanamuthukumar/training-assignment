import { describe, test, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useInternForm from "../hooks/useInternForm";
import { validateInternForm } from "../utils/intern-validation";
import { InternProvider } from "../contexts/intern-context";
describe("validateInternForm", () => {
  test("returns null for valid data", () => {
    expect(validateInternForm("Rahul", 92)).toBeNull();
  });

  test("returns 'Name is required' when name is empty", () => {
    expect(validateInternForm("", 92)).toBe("Name is required");
  });

  test("returns 'Score must be 0–100' when score is invalid", () => {
    expect(validateInternForm("Rahul", 101)).toBe("Score must be 0–100");
  });
});

describe("useInternForm", () => {
  test("calls addIntern with the correct data", () => {
    const addIntern = vi.fn();

    const { result } = renderHook(() => useInternForm(addIntern, () => 999));

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Rahul",
          type: "text",
        },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handleChange({
        target: {
          name: "score",
          value: "92",
          type: "number",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.submit();
    });

    expect(addIntern).toHaveBeenCalledWith({
      id: 999,
      name: "Rahul",
      score: 92,
      role: "Frontend",
      isPresent: true,
    });
  });

  test("does not call addIntern when validation fails", () => {
    const addIntern = vi.fn();

    const { result } = renderHook(() => useInternForm(addIntern));

    act(() => {
      result.current.submit();
    });

    expect(addIntern).not.toHaveBeenCalled();

    expect(result.current.error).toBe("Name is required");
  });

  test("clears error after successful submit", () => {
    const addIntern = vi.fn();

    const { result } = renderHook(() => useInternForm(addIntern, () => 1));

    act(() => {
      result.current.submit();
    });

    expect(result.current.error).toBe("Name is required");

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Rahul",
          type: "text",
        },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handleChange({
        target: {
          name: "score",
          value: "90",
          type: "number",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.submit();
    });

    expect(addIntern).toHaveBeenCalledTimes(1);

    expect(result.current.error).toBe("");
  });
});

// Task 6.1
// Observation:
// Before the refactor, testing required rendering the component, interacting
// with form fields, and depending on context. After the refactor, the hook
// receives its dependencies through parameters and the validation logic is
// extracted into a pure function. As a result, each test needs very little
// Arrange code, uses simple mocks for addIntern, and is easier to read,
// maintain, and execute.
// Task 6.2
// FIRST Audit:
//
// validateInternForm tests:
// - Fast: Pure function with no rendering or external dependencies.
// - Independent: Each test runs with its own inputs.
// - Repeatable: Produces the same result for the same inputs.
// - Self-validating: Assertions automatically determine pass/fail.
// - Timely: Easy to write and maintain.
//
// useInternForm hook tests:
// - Fast: Uses lightweight hook rendering and mock functions.
// - Independent: Each test creates a fresh hook instance.
// - Repeatable: Dependencies such as addIntern and generateId are injected.
// - Self-validating: Uses assertions to verify behavior.
// - Timely: Simpler than testing through the entire component.
//
// SummaryBar presentational tests:
// - Fast: Tests only rendering based on props.
// - Independent: No Context Provider or global state required.
// - Repeatable: Same props always produce the same output.
// - Self-validating: Assertions verify rendered values.
// - Timely: Minimal setup makes tests quick to write.
//
// filterInterns utility tests:
// - Fast: Pure function with no React rendering.
// - Independent: Uses local test data only.
// - Repeatable: Same inputs always return the same output.
// - Self-validating: Assertions compare expected and actual values.
// - Timely: Straightforward input/output testing.
//
// Overall Observation:
// The biggest improvement came from refactoring validateInternForm and
// filterInterns into pure functions. They require almost no setup and are
// very easy to test. The useInternForm hook also became easier to test after
// dependency injection, though it still requires renderHook because it uses
// React state. The SummaryBar presentational component benefits from receiving
// data through props, eliminating the need for Context providers or mocks.
// Overall, the refactoring reduced coupling, improved test isolation, and
// made the tests simpler, faster, and more maintainable.