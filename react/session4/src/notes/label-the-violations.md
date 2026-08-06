//snippet A
// Current layer: State Management (intern-context.tsx)
//
// Should be:
// - Validation → if (!form.name.trim())
// - Utility → const id = Date.now()
// - Business Logic → const score = Math.round(form.score)
// - State Management → setInterns(...)
//
//
// Why it's in the wrong place:
// This function mixes four different concerns in one place. The context should
// only be responsible for updating state, while validation, ID generation,
// and score transformation should be extracted into separate utilities or
// business logic functions.
//
// Comment:
// There are four distinct concerns:
// 1. Validation
// 2. ID generation
// 3. Score transformation
// 4. State update
//
// The state update requires the most setup when writing tests because it
// depends on React state/context, whereas the other concerns can be unit
// tested independently.

// snippet B
// Current layer: UI (React Component)
//
// Should be: Data Access layer (API/service or custom hook)
//
// Why it's in the wrong place:
// The component is responsible for rendering UI, but it is also fetching data.
// Data fetching should be moved to a service or custom hook so the component
// focuses only on presentation and is easier to test and reuse.

//snippet C
// Current layer: Utility
//
// Should be: UI (React Component)
//
// Why it's in the wrong place:
// Utility functions should return plain data, not JSX. Returning a React
// element couples the utility to the UI. The utility should return values
// such as "Pass"/"Fail" or badge information, and a component should render
// the JSX.

//snippet D
// Current layer: State Management (intern-context.tsx)
//
// Should be: Business Logic (utility/helper)
//
// Why it's in the wrong place:
// Filtering interns is business logic, not state management. Extracting it
// into a utility function (such as filterInterns) makes it reusable, easier
// to test, and keeps the context focused on managing state.