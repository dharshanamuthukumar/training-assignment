import { renderHook, act } from "@testing-library/react";
import { useInternRepository } from "../repositories/intern-repository";
import type { Intern } from "../types/intern";

const RAHUL: Intern = {
  id: 1,
  name: "Rahul",
  score: 92,
  isPresent: true,
  role: "Frontend",
};

const PRIYA: Intern = {
  id: 2,
  name: "Priya",
  score: 78,
  isPresent: false,
  role: "Backend",
};

describe("useInternRepository", () => {
  test("starts with an empty list", () => {
    const { result } = renderHook(() => useInternRepository());

    expect(result.current.interns).toEqual([]);
  });

  test("add() adds an intern to the list", () => {
    const { result } = renderHook(() => useInternRepository());

    act(() => {
      result.current.add(RAHUL);
    });

    expect(result.current.interns).toEqual([RAHUL]);
  });

  test("add() twice results in two interns", () => {
    const { result } = renderHook(() => useInternRepository());

    act(() => {
      result.current.add(RAHUL);
      result.current.add(PRIYA);
    });

    expect(result.current.interns).toHaveLength(2);
    expect(result.current.interns).toEqual([RAHUL, PRIYA]);
  });

  test("remove() removes an intern by id", () => {
    const { result } = renderHook(() => useInternRepository());

    act(() => {
      result.current.add(RAHUL);
      result.current.add(PRIYA);
    });

    act(() => {
      result.current.remove(1);
    });

    expect(result.current.interns).toEqual([PRIYA]);
  });

  test("remove() on a non-existent id does nothing", () => {
    const { result } = renderHook(() => useInternRepository());

    act(() => {
      result.current.add(RAHUL);
      result.current.remove(99);
    });

    expect(result.current.interns).toEqual([RAHUL]);
  });

  test("update() replaces the intern with matching id", () => {
    const { result } = renderHook(() => useInternRepository());

    const updatedRahul = {
      ...RAHUL,
      score: 95,
    };

    act(() => {
      result.current.add(RAHUL);
      result.current.update(updatedRahul);
    });

    expect(result.current.interns).toEqual([updatedRahul]);
  });

  test("update() does not affect other interns", () => {
    const { result } = renderHook(() => useInternRepository());

    const updatedRahul = {
      ...RAHUL,
      score: 99,
    };

    act(() => {
      result.current.add(RAHUL);
      result.current.add(PRIYA);
      result.current.update(updatedRahul);
    });

    expect(result.current.interns).toEqual([updatedRahul, PRIYA]);
  });
});
// No test in this file uses vi.mock because the repository does not depend on
// external services, APIs, or modules. It only manages React state, so we can
// test it directly using renderHook without mocking anything.

// Repository tests check state management operations like adding, removing,
// and updating interns. Service tests check business rules like validation,
// calculations, and creating intern data.
// Repository tests are slightly more complex because they require React hook
// testing with renderHook and act. Service tests are simpler because they are
// plain functions and can be tested directly.
