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
