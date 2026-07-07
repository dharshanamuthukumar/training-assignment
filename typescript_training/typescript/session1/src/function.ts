// Task 4.1 — Parameter and Return Types

function multiply(a: number, b: number): number {
  return a * b;
}

function formatName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

function isAdult(age: number): boolean {
  return age >= 18;
}

function getFirstElement(arr: string[]): string | undefined {
  return arr[0];
}

// Correct function calls
console.log(multiply(5, 4));
console.log(formatName("Alice", "Smith"));
console.log(isAdult(20));
console.log(getFirstElement(["Apple", "Banana", "Cherry"]));

// // Wrong function calls (intentional errors)
// multiply(5, 4);
// formatName(10, "Smith");
// isAdult("18");
// getFirstElement([1, 2, 3]);
