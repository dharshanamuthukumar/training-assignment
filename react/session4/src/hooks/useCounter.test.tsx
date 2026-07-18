import { renderHook, act } from "@testing-library/react";
import useCounter from "./useCounter";

// result.current contains the latest values and functions returned
// by the hook. After act() updates the hook's state, we read
// result.current to verify the updated count.

test("initialises with the default value of 0", () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);
});

test("initialises with a custom initial value", () => {
  const { result } = renderHook(() => useCounter({ initial: 10 }));

  expect(result.current.count).toBe(10);
});

test("increment increases count by 1", () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

test("decrement decreases count by 1", () => {
  const { result } = renderHook(() => useCounter({ initial: 5 }));

  act(() => {
    result.current.decrement();
  });

  expect(result.current.count).toBe(4);
});

test("reset returns count to the initial value", () => {
  const { result } = renderHook(() => useCounter({ initial: 10 }));

  act(() => {
    result.current.increment();
    result.current.increment();
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});
