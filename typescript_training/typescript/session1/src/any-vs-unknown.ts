// Part A — any
let dangerousValue: any = "hello";

dangerousValue = 42;
dangerousValue = { name: "Alice" };

// No TypeScript error, but this will crash at runtime
console.log(dangerousValue.foo.bar);

// Part B — unknown
let safeValue: unknown = "hello";

// This gives a TypeScript error
// console.log(safeValue.toUpperCase());

// Fix using a type check
if (typeof safeValue === "string") {
  console.log(safeValue.toUpperCase());
}

/*
Type narrowing means reducing a variable from a general type (like unknown)
to a more specific type (such as string or number) using checks like typeof.
After narrowing, TypeScript knows the variable's type and safely allows
access to its properties and methods.
*/
