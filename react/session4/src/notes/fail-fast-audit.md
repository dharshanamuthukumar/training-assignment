# Silent Failure Priority List

## Silent Failure Priority List

1. Validation failure handling in `src/hooks/useInternForm.ts` — risk: If validation errors were ignored or `submit()` returned success incorrectly, invalid intern data could be added to the application state.

2. Context operations in `src/contexts/intern-context.tsx` — risk: If `addIntern` or `removeIntern` silently failed without notifying the caller, the UI and application state could become inconsistent and difficult to debug.

3. Search and filtering in `src/hooks/useInternSearch.ts` — risk: If invalid search input or filtering logic silently returned incorrect results, users could see incomplete or misleading intern lists without any indication of failure.

//task 2.2
// No swallowed exceptions were found in this project.
// Therefore there was no caller receiving an undefined value.
// If a fetch function had returned undefined after logging an error,
// the UI could have silently displayed an empty list instead of reporting
// the failure, making the bug harder to diagnose.

//task 2.3
// Task 2.3 — Fail Fast
// Replaced a silent default value with an explicit error.
// Required values are now validated instead of being replaced with
// fallback values that could hide caller mistakes.

## Guard Clause Order — validateInternForm

### Before

1. Name validation (`!name.trim()`)
2. Score range validation (`score < 0 || score > 100`)

### After

1. Null/undefined check
2. Type check
3. Name format check (`!name.trim()`)
4. Score range check (`score < 0 || score > 100`)

### Reason for reordering

The cheapest validation checks should run first because they require the least
processing. Null/undefined and type checks immediately reject invalid input
before performing string operations such as `trim()` or evaluating business
rules. This follows the Fail Fast principle by stopping execution as early as
possible and avoiding unnecessary work.
// Task 3.3
// Each guard clause was easy to test because validateInternForm is a
// pure function with no React hooks, components, or application state.
// Each test simply passes invalid input and verifies that the expected
// error is thrown.
//
// Testing the same validation through a hook or component would require
// rendering React components, simulating user interactions, and managing
// component state, making the tests more complex and slower.
//
// Pure function tests are simpler because they are isolated, deterministic,
// and do not depend on any external framework or UI behaviour.

## Error Message Audit

| File | Current message | Answers all 3 questions? | Improved message |
|------|-----------------|--------------------------|------------------|
| src/utils/intern-validation.ts | `validateInternForm: name is required` | No – identifies the function and expected value, but does not include the actual value received. | `validateInternForm: name is required, got: "${name}"` |
| src/utils/intern-validation.ts | `validateInternForm: score must be 0–100` | No – identifies the function and expected range, but does not include the actual score received. | `validateInternForm: score must be between 0 and 100, got: ${score}` |
## 2am Test — validateInternForm

**Error message:**

```
validateInternForm: score must be between 0 and 100, got: -5
```

**What I know from this message alone:**
- Which function failed: `validateInternForm`
- What the rule is: the score must be between 0 and 100
- What was actually passed: `-5`

**What I would do next without reading any code:**
- Find the caller that passed `-5` to `validateInternForm`
- Check whether the invalid value came from the form input, an API response, or another function
- Verify that the input validation before calling `validateInternForm` is working correctly

**Would the original message "Invalid score" have been enough? Why not?**

No. The original message does not identify which function failed, what the valid range is, or what value caused the failure. A descriptive error message provides enough context to locate the source of the problem quickly without inspecting the code, making debugging faster and easier.