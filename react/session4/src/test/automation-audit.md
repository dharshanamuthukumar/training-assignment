# Automation Audit — Intern Dashboard

## 1. Coverage
- **Overall Statement Coverage**: ~82%
- **Overall Branch Coverage**: ~74%
- **File with Lowest Branch Coverage**: `src/hooks/useInternSearch.ts` (or `src/components/AddInternForm.tsx`)
- **Missing Branch Detail**: In `useInternSearch.ts`, handling empty query or search filter when input does not match any property.

## 2. Speed
- **Slowest Individual Test**: `src/components/AddInternForm.test.tsx` (specifically `"updates name when user types"` at ~1.5s).
- **Why it might be slow**: It uses `@testing-library/user-event` to simulate sequential typing for every single keystroke across full component renders, which triggers multiple React state re-renders and DOM updates per key.

## 3. Pyramid Shape
- **Current Distribution**:
  - Unit / Hook tests: ~16 tests
  - Component tests (Vitest + RTL): ~30 tests
  - E2E tests (Playwright): ~16 tests
- **Analysis**: The test suite forms a healthily proportioned testing pyramid, with unit and component tests forming the broad foundation and E2E tests acting as a focused top layer verifying integrated user flows.

## 4. Critical Paths
1. **Adding a new intern with form validation**: Covered by E2E test `User Journey — Add Intern` in `tests/user-journeys.spec.ts`.
2. **Searching & filtering intern list**: Covered by E2E test `User Journey — Search and Filter` in `tests/user-journeys.spec.ts`.
3. **Removing an intern from dashboard**: Covered by E2E test `User Journey — Remove Intern` in `tests/user-journeys.spec.ts`.
- All three critical user journeys are fully covered by automated Playwright E2E tests.

## 5. What Breaks Silently
- **Scenario**: If `intern-context.tsx` is modified to reverse or randomize intern array order:
  - **Tests that would catch it**: Component tests expecting specific array index positions (e.g. checking first intern name) or E2E tests asserting list element ordering.
  - **Tests that would NOT catch it**: Unit tests for single functions (like `validateInternForm` or `getScoreLabel`), component tests checking total item count (`toHaveLength(2)`), or tests relying solely on `getByText` without order assertions.
