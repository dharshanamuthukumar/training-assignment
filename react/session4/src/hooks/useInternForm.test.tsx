import { renderHook, act } from "@testing-library/react";
import type React from "react";
import useInternForm from "./useInternForm";

// Hook tests directly verify the hook's state and business logic
// without rendering a component. They help isolate bugs in the hook
// itself rather than in the UI.

test("initialises with empty form state", () => {
  const { result } = renderHook(() => useInternForm());

  expect(result.current.form.name).toBe("");
  expect(result.current.form.score).toBe(0);
  expect(result.current.form.isPresent).toBe(true);
  expect(result.current.form.role).toBe("Frontend");
  expect(result.current.error).toBe("");
});

test("isValid returns false and sets error when name is empty", () => {
  const { result } = renderHook(() => useInternForm());

  let valid = false;

  act(() => {
    valid = result.current.isValid();
  });

  expect(valid).toBe(false);
  expect(result.current.error).toBe("Name is required");
});

test("isValid returns true when name and score are valid", () => {
  const { result } = renderHook(() => useInternForm());

  act(() => {
    result.current.handleChange({
      target: {
        name: "name",
        value: "Rahul",
        type: "text",
      },
    } as React.ChangeEvent<HTMLInputElement>);
  });

  act(() => {
    result.current.handleChange({
      target: {
        name: "score",
        value: "92",
        type: "number",
      },
    } as React.ChangeEvent<HTMLInputElement>);
  });

  let valid = false;

  act(() => {
    valid = result.current.isValid();
  });

  expect(valid).toBe(true);
  expect(result.current.error).toBe("");
});

test("shows error when score is greater than 100", () => {
  const { result } = renderHook(() => useInternForm());

  act(() => {
    result.current.handleChange({
      target: {
        name: "name",
        value: "Rahul",
        type: "text",
      },
    } as React.ChangeEvent<HTMLInputElement>);
  });

  act(() => {
    result.current.handleChange({
      target: {
        name: "score",
        value: "150",
        type: "number",
      },
    } as React.ChangeEvent<HTMLInputElement>);
  });

  let valid = false;

  act(() => {
    valid = result.current.isValid();
  });

  expect(valid).toBe(false);
  expect(result.current.error).toBe("Score must be 0–100");
});

test("handleReset clears form values and error", () => {
  const { result } = renderHook(() => useInternForm());

  act(() => {
    result.current.handleChange({
      target: {
        name: "name",
        value: "Rahul",
        type: "text",
      },
    } as React.ChangeEvent<HTMLInputElement>);
  });

  act(() => {
    result.current.isValid();
  });

  act(() => {
    result.current.handleReset();
  });

  expect(result.current.form.name).toBe("");
  expect(result.current.form.score).toBe(0);
  expect(result.current.form.isPresent).toBe(true);
  expect(result.current.form.role).toBe("Frontend");
  expect(result.current.error).toBe("");
});
