// Task 4.1
// Pattern: Hard-coded dependency (Date.now() and Math.random())
// FIRST Principle Violated: Repeatable
// Reason: The function returns a different value every time, making test
// results unpredictable.
// Fix: Inject the timestamp and random value (or ID generator) as parameters
// so the function can produce deterministic results during testing.

function generateInternId(): string {
  return `intern-${Date.now()}-${Math.random()}`;
}

// Pattern: Hard-coded dependency
// FIRST Principle Violated: Independent
// Reason: The function directly depends on analyticsClient, making it difficult
// to replace with a mock or fake during testing.
// Fix: Pass the analytics client as a parameter or use dependency injection.

import { analyticsClient } from '../services/analytics'

function trackPageView(page: string): void {
  analyticsClient.log(page)
}
// Pattern: Does too many things / Side effects
// FIRST Principle Violated: Independent
// Reason: The function performs an API call, redirects the browser, writes to
// localStorage, and logs to the console. Testing requires mocking multiple
// external dependencies.
// Fix: Split the logic into smaller functions (saveData, redirectUser,
// saveLastSavedTime, logSuccess) and inject external dependencies where needed.

async function saveAndRedirect(data: InternFormState): Promise<void> {
  await fetch('/api/interns', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  window.location.href = '/dashboard'
  localStorage.setItem('lastSaved', new Date().toISOString())
  console.log('Saved successfully')
}

// Pattern: Global mutable state
// FIRST Principle Violated: Independent
// Reason: The shared errorLog array is modified by every call, causing tests
// to interfere with each other and making results dependent on execution order.
// Fix: Avoid module-level mutable state. Pass the error log as a parameter,
// return a new array, or encapsulate the state inside an object or class.

let errorLog: string[] = []

function logError(message: string): void {
  errorLog.push(message)
  console.error(message)
}

function getErrors(): string[] {
  return errorLog
}