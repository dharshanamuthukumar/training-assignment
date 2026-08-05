## Refactoring Priority List

1. Duplicate validation logic in `src/contexts/intern-context.tsx` — Validation rules exist in more than one place. If the validation rules change (for example, the allowed score range), one copy could be updated while the other is forgotten, causing inconsistent behavior.

2. Duplicate business logic in `src/hooks/useInternSearch.ts` — The average score is calculated directly in the hook instead of reusing `calculateAverageScore()` from the service layer. This duplicates business logic and makes maintenance more difficult.

3. Complex conditional in `src/hooks/useInternForm.ts` — The nested ternary expression in `handleChange()` is difficult to read and maintain. As more form fields or input types are added, it becomes more error-prone and harder for new developers to understand.