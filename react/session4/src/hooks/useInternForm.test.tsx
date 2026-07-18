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
  // Arrange
  // Create the hook with its initial state.
  // The form name is empty, which is the condition we want to test.
  const { result } = renderHook(() => useInternForm());

  let valid: boolean;

  // Act
  // Trigger validation by calling isValid().
  act(() => {
    valid = result.current.isValid();
  });

  // Assert
  // Verify that validation failed and the expected error message was created.
  expect(valid!).toBe(false);
  expect(result.current.error).toBe("Name is required");
});
// AAA phases are clearly separated:
// Arrange creates the required hook state,
// Act performs the behavior being tested,
// Assert checks only the result produced by that action.
// The Arrange phase provides everything required for Act,
// and Assert verifies the output of Act without testing unrelated behavior.
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
test("isValid returns true when name is Sneha and score is 88", () => {
  // Arrange
  // Create the hook and prepare valid form data.
  const { result } = renderHook(() => useInternForm());

  act(() => {
    result.current.handleChange({
      target: { name: "name", value: "Sneha", type: "text" },
    } as React.ChangeEvent<HTMLInputElement>);

    result.current.handleChange({
      target: { name: "score", value: "88", type: "number" },
    } as React.ChangeEvent<HTMLInputElement>);
  });

  let valid: boolean;

  // Act
  // Run validation on the updated form.
  act(() => {
    valid = result.current.isValid();
  });

  // Assert
  // Check that the valid form passes validation.
  expect(valid!).toBe(true);
});

test("handleChange updates the name field when a name change event is provided", () => {
  // Arrange
  // Create the hook and prepare a name input change event.
  const { result } = renderHook(() => useInternForm());

  const event = {
    target: {
      name: "name",
      value: "Sneha",
      type: "text",
    },
  } as React.ChangeEvent<HTMLInputElement>;

  // Act
  // Send the change event to update the form state.
  act(() => {
    result.current.handleChange(event);
  });

  // Assert
  // Verify that only the name field was updated correctly.
  expect(result.current.form.name).toBe("Sneha");
});
test("returns false when score is below 0", () => {
  const { result } = renderHook(() => useInternForm());

  // Arrange
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
        value: "-10",
        type: "number",
      },
    } as React.ChangeEvent<HTMLInputElement>);
  });

  // Act
  let valid: boolean;

  act(() => {
    valid = result.current.isValid();
  });

  // Assert
  expect(valid!).toBe(false);
  expect(result.current.error).toBe("Score must be 0–100");
});
