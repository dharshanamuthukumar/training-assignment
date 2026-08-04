import { assert } from "./assert";

export function validateInternForm(name: string, score: number): string | null {
  // Precondition assertions
  assert(
    typeof name === "string",
    `validateInternForm: name must be a string, got: ${typeof name}`,
  );

  assert(
    typeof score === "number",
    `validateInternForm: score must be a number, got: ${typeof score}`,
  );

  // Existing validation logic
  if (!name.trim()) {
    return "Name is required";
  }

  if (score < 0 || score > 100) {
    return "Score must be 0–100";
  }

  return null;
}
// Task 3.1
// Before the refactor, the function performed processing before validating
// the inputs, which could result in unnecessary work if the validation failed.
//
// After the refactor, all validation checks are placed at the top of the
// function as guard clauses. This ensures the function performs no work
// when the input is invalid.
//
// The first thing that runs on every call is the input validation,
// allowing the function to fail fast and making errors easier to detect
// and debug.

// Task 5.2
// The assert checks verify the function's preconditions. They ensure the
// caller has provided arguments of the correct type and immediately throw
// an error if the function is used incorrectly.
//
// The validation logic below checks whether the input values satisfy the
// application's business rules, such as requiring a non-empty name and a
// score between 0 and 100. These checks return validation messages so the
// user can correct their input.
//
// Assertions throw unconditionally when a programming error occurs,
// whereas the validation logic reports expected user input errors.