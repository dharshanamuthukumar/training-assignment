// Code smell audit 
// Smell 1: Magic numbers — score limits (0 and 100) are hardcoded instead of using named constants.
// Smell 2: Primitive obsession — validation accepts primitive values (name and score) rather than an Intern or InternForm object.
// Smell 3: Mixed validation concerns — function performs both runtime assertions and business validation in the same method.
import { assert } from "./assert";
const MIN_SCORE = 0;
const MAX_SCORE = 100;
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

  if (score < MIN_SCORE || score > MAX_SCORE) {
return `Score must be ${MIN_SCORE}–${MAX_SCORE}`;  }
  // Constant extraction audit:
  // Extracted magic numbers: 0 and 100 → MIN_SCORE and MAX_SCORE
  // Reason: These values define the valid score range for interns. Naming them makes the business rule explicit and ensures the valid score range can be changed in one place instead of searching for hardcoded values throughout the code.
  return null;
}
// Refactoring priority:
// I would replace the magic numbers with named constants first because it improves readability and makes future changes (such as changing the score range) much easier and less error-prone.