import { describe, test, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { InternProvider, useInterns } from "../contexts/intern-context";

describe("InternProvider", () => {
  test("uses injected generateId", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InternProvider generateId={() => 999}>
        {children}
      </InternProvider>
    );

    const { result } = renderHook(() => useInterns(), { wrapper });

    act(() => {
      result.current.addIntern({
        name: "Kumar",
        score: 95,
        role: "Frontend",
        isPresent: true,
      });
    });

    expect(result.current.interns.at(-1)?.id).toBe(999);
  });
});

// Task 5.1
// Injecting generateId allows tests to control the generated ID.
// Even though the current implementation is deterministic, dependency
// injection makes future changes (such as switching to Date.now()) easier
// to test without modifying the tests.