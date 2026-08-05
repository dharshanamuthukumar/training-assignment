## Refactoring Priority List

1. Duplicate validation logic in `src/contexts/intern-context.tsx` — Validation rules exist in more than one place. If the validation rules change (for example, the allowed score range), one copy could be updated while the other is forgotten, causing inconsistent behavior.

2. Duplicate business logic in `src/hooks/useInternSearch.ts` — The average score is calculated directly in the hook instead of reusing `calculateAverageScore()` from the service layer. This duplicates business logic and makes maintenance more difficult.

3. Complex conditional in `src/hooks/useInternForm.ts` — The nested ternary expression in `handleChange()` is difficult to read and maintain. As more form fields or input types are added, it becomes more error-prone and harder for new developers to understand.
## Full Refactoring Log — validateIntern()

Step 1: Ran `npm run test:run` → tests green.

Step 2: Replaced duplicated validation logic with a call to `validateInternForm()` from `intern-service.ts` → tests green.

Step 3: Removed hardcoded validation checks from `validateIntern()` and kept a single source of truth for validation → tests green.

Final: 2 refactoring changes, 3 test runs, all green.

### Reflection

I performed 3 separate test runs:
- Before refactoring
- After the first refactoring change
- After the final refactoring change

No step produced a failing test. Running the tests after each small change increased confidence that the refactoring preserved the original behavior.
### Reflection

Current coverage:
- Statement: 92.39%
- Branch: 83.05%
- Function: 93.15%


The refactoring focused on improving code structure without changing functionality. Extracting pure functions, such as the validation logic, makes it easier to write focused unit tests and cover edge cases in the future because the logic can be tested independently of React hooks and components.