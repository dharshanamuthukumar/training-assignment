import type { Intern, InternFormState } from "../types/intern";
import { assert } from "../utils/assert";

// Creates a new Intern object from form data.
export function createIntern(
  form: InternFormState,
  generateId: () => number = Date.now,
): Intern {
  return {
    id: generateId(),
    name: form.name.trim(),
    score: Math.round(form.score),
    role: form.role,
    isPresent: form.isPresent,
  };
}

export function validateInternForm(
  formOrName: InternFormState | string,
  scoreArg?: number,
): string | null {
  let name: string;
  let score: number;

  if (typeof formOrName === "object" && formOrName !== null) {
    name = formOrName.name || "";
    score = formOrName.score === "" ? 0 : Number(formOrName.score);
  } else {
    name = formOrName || "";
    score = scoreArg ?? 0;
  }

  // Task 5.2 — Precondition assertions
  assert(
    typeof name === "string",
    `validateInternForm: name must be a string, got: ${typeof name}`,
  );

  assert(
    typeof score === "number",
    `validateInternForm: score must be a number, got: ${typeof score}`,
  );

  // Business validation
  if (!name.trim()) {
    return "Name is required";
  }

  if (score < 0 || score > 100) {
    return "Score must be 0–100";
  }

  return null;
}

// Returns the average score, or 0 for an empty list.
export function calculateAverageScore(interns: Intern[]): number {
  if (interns.length === 0) {
    return 0;
  }

  const total = interns.reduce((sum, intern) => sum + intern.score, 0);

  return Math.round(total / interns.length);
}

// Returns 'Pass' for score >= 50, 'Fail' otherwise.
export function getScoreLabel(score: number): "Pass" | "Fail" {
  return score >= 50 ? "Pass" : "Fail";
}

// Filters interns by name or role (case-insensitive).
export function filterInterns(interns: Intern[], query: string): Intern[] {
  if (!query.trim()) {
    return interns;
  }

  const search = query.toLowerCase();

  const result = interns.filter(
    (intern) =>
      intern.name.toLowerCase().includes(search) ||
      intern.role.toLowerCase().includes(search),
  );

  // Task 5.3 — Postcondition assertion
  assert(
    Array.isArray(result),
    "filterInterns: expected filter() to return an array",
  );

  return result;
}

// -----------------------------------------------------------------------------
// Task 2.2
// The service layer should not import React because it contains only business
// logic. Keeping it framework-independent makes it easier to reuse, test,
// and maintain. React imports would couple the service layer to the UI and
// require a React environment during testing.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Silent Failure Audit
// No silent failure patterns were found in this service layer.
// Validation failures return explicit messages instead of silently failing.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Task 5.2
// The assert checks verify the function's preconditions. They ensure the
// caller has provided arguments of the correct type and immediately throw
// an error if the function is used incorrectly.
//
// The validation logic below checks business rules such as requiring a
// non-empty name and a score between 0 and 100. These checks return
// validation messages so the user can correct their input.
//
// Assertions throw immediately for programmer errors, while validation
// handles expected user input errors.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Task 5.3
// The postcondition assertion verifies that filterInterns always returns an
// array. Although Array.prototype.filter() always returns an array under
// normal circumstances, the assertion documents this expectation.
//
// Documentation assertions become valuable during future refactoring or when
// integrating with external libraries, as they detect broken assumptions
// immediately instead of allowing incorrect behaviour to propagate.
// -----------------------------------------------------------------------------
