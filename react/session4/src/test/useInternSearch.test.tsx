import { describe, test, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useInternSearch from "../hooks/useInternSearch";

const interns = [
  {
    id: 1,
    name: "Rahul",
    score: 90,
    role: "Frontend",
    isPresent: true,
  },
  {
    id: 2,
    name: "Priya",
    score: 85,
    role: "Backend",
    isPresent: false,
  },
];

describe("useInternSearch dependency injection", () => {
  test("uses injected filter function", () => {
    const customFilter = vi.fn().mockReturnValue([]);

    const { result } = renderHook(() => useInternSearch(interns, customFilter));

    expect(result.current.filtered).toEqual([]);

    expect(customFilter).toHaveBeenCalledWith(interns, "");

    expect(customFilter).toHaveBeenCalledTimes(1);
  });
});
// Task 5.3
// Observation:
// Injecting the filter function is possible but provides little benefit here
// because filterInterns is already a pure function with its own unit tests.
// This level of dependency injection adds complexity without significantly
// improving testability. Dependency injection is most useful for external
// dependencies such as APIs, databases, clocks, random generators, or other
// side-effect-producing services that are difficult to control during tests.