# Debugging Log

---

## Bug 1 — Validation rejects valid score

### Reproduce:
Enter the following values in the Add Intern form:
- Name: Rahul
- Score: 85
- Role: Frontend

Click **Add Intern**.

### Isolate:
The bug is located in:
- File: `src/utils/intern-validation.ts`
- Function: `validateInternForm()`

### Root cause:
The validation incorrectly checks whether the score is greater than 10 instead of greater than 100, causing valid scores to fail validation.

### Fix:
Change:

```ts
if (score < 0 || score > 10)
```

back to:

```ts
if (score < 0 || score > 100)
```

### Verify:
- Score 85 is accepted.
- Score 100 is accepted.
- Score 101 still shows the validation error.
- Name validation continues to work correctly.

---

# Expected vs Actual — Add Intern Form

### Scenario 1 (Working)

Input:
- Name: Rahul
- Score: 85
- Role: Frontend

Expected:
The intern is added successfully and appears in the intern list.

Actual:
The intern appears in the list with the correct score and role.

---

### Scenario 2 (Validation)

Input:
- Name: ""
- Score: 85

Expected:
Display "Name is required."

Actual:
The validation message "Name is required" is displayed and the intern is not added.

---

### Comment

Writing the expected and actual behaviour made it easier to understand exactly what should happen for both valid and invalid inputs instead of assuming the feature was working.

---

# Bug 2 — Stack Trace Reading

### Error type and message:

TypeError:
Cannot read properties of undefined (reading 'value')

### First YOUR-code line in the trace:

The line containing:

```ts
intern.nonExistentNested.value
```

inside the intern list rendering logic.

### What that line does:

It tries to access a nested property that does not exist.

### The caller:

The component rendering the intern list.

### Root cause:

The code attempts to read a property from an undefined object.

### Did you need console.log?

No.

The stack trace directly pointed to the failing line, making console.log unnecessary.

---

# Task 2.2 — Root cause without running code

### What does the stack trace error say if this throws?

TypeError:
Cannot read properties of undefined (reading 'name')

### Under what exact condition does it throw?

When the interns array is empty.

### Which line is the root cause line?

```ts
return top.name.toUpperCase()
```

because `top` becomes undefined.

### Fix

```ts
if (!interns.length) return "";
```

---

# Task 3.1 — Console panel

### Error message shown

TypeError:
Cannot read properties of undefined

### File and line number

The clickable link opened the file containing the failing render statement.

### Did it match expectations?

Yes.

The Console pointed directly to the same line identified from the stack trace.

---

# Task 3.2 — Network panel

### Successful request URL and status

https://jsonplaceholder.typicode.com/users

Status:
200 OK

### Response

An array of user objects containing id, name, email, username and address.

### Failed URL and status

https://jsonplaceholder.typicode.com/userz

Status:
404 Not Found

### Console output

Failed to fetch the requested resource because the endpoint does not exist.

---

# Task 3.3 — Elements panel

### Element inspected

Intern card displaying Rahul.

### CSS class applied

The card/container class used for each intern entry.

### Property changed

Changed the background colour temporarily.

The colour changed immediately in the browser.

### Did the source file change?

No.

Developer Tools only modify the live DOM temporarily.

---

# Task 4.1 — Line breakpoint

### File and line

Breakpoint placed inside the intern filtering/search function.

### Variables in scope

- interns
- searchTerm
- intern
- filteredInterns

### Search term

"Rah"

### Number of interns

4

### After Step Over twice

The current intern changed and the filter evaluation continued to the next iteration.

---

# Task 4.2 — Conditional breakpoint

### Condition

```ts
intern.name === "Rahul"
```

### Breakpoint fired

Once.

### Normal breakpoint

It would have paused once for every intern in the array.

### Why use conditional breakpoints?

They stop execution only when the required condition is met, reducing unnecessary pauses.

---

# Task 4.3 — Step controls

### Starting line

The line calling `validateInternForm()` during form submission.

### Function entered

validateInternForm()

### Inside the function

Checked:
- trimmed name
- score range
- returned either an error message or null

### Step Out

Returned to the form submit handler after validation completed.

---

# Task 4.4 — Watch expressions

### Expressions

```ts
interns.length
form.name.trim()
score >= 0 && score <= 100
```

### Values

interns.length = 4

form.name.trim() = "Rahul"

score >= 0 && score <= 100 = true

### Did any expression change?

Yes.

The form value changed while typing into the input field.

### When are Watch expressions useful?

They continuously monitor important values without repeatedly hovering over variables.

---

# Task 5.1 — VS Code debugger

### launch.json URL

http://localhost:5173

### Breakpoint location

Inside the search/filter function.

### Inline values

VS Code displayed:
- searchTerm
- interns array
- current intern
- filtered results

### Advantage over console.log

The debugger allows inspection of variable values, call stack and execution flow without modifying the source code.

---

# Task 6.1 — console.log audit

| File | Current log | Labelled? | Action |
|------|-------------|-----------|--------|
| AddInternForm.tsx | console.log(form) | No | Add descriptive label |
| intern-context.tsx | console.log(interns) | No | Add label or remove |
| Search component | console.log(searchTerm) | Yes | Keep only during development |

---

# Task 6.2 — Grouped logging

### Location

Inside the Add Intern form submit handler.

### Console output

submit()

- form
- validation

Both messages appear inside a collapsed console group.

### Why is the DEV guard important?

Without the guard, debugging logs would appear in production, making the console noisy and potentially exposing unnecessary debugging information.