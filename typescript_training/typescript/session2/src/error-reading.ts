/*
=========================================================
Error 1
=========================================================

Error:
TS2339: Property 'username' does not exist on type 'User'.

Meaning:
Trying to access a property that is not defined in the interface or type.

Code that produces the error:
*/

interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Alice",
  age: 25,
};

// Error
// console.log(user.username);

/*
Fix:
Use an existing property or add 'username' to the interface.
*/

// Correct
console.log(user.name);

/*
=========================================================
Error 2
=========================================================

Error:
TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

Meaning:
A function expects a number, but a string is passed.

Code that produces the error:
*/

function square(num: number): number {
  return num * num;
}

// Error
// square("5");

/*
Fix:
Pass a number instead of a string.
*/

square(5);

/*
=========================================================
Error 3
=========================================================

Error:
TS7006: Parameter 'data' implicitly has an 'any' type.

Meaning:
A function parameter has no type annotation when strict mode is enabled.

Code that produces the error:
*/

// Error
// function print(data) {
//     console.log(data);
// }

/*
Fix:
Add a type annotation.
*/

function print(data: string): void {
  console.log(data);
}

/*
=========================================================
Error 4
=========================================================

Error:
TS2532: Object is possibly 'undefined'.

Meaning:
TypeScript thinks a variable may be undefined before it is used.

Code that produces the error:
*/

const fruits = ["Apple", "Banana"];

// Error
// console.log(fruits[5].toUpperCase());

/*
Fix:
Check that the value exists before using it.
*/

const fruit = fruits[5];

if (fruit !== undefined) {
  console.log(fruit.toUpperCase());
}

/*
=========================================================
Error 5
=========================================================

Error:
TS2322: Type 'string | undefined' is not assignable to type 'string'.

Meaning:
A variable might be undefined, but another variable expects only a string.

Code that produces the error:
*/

const names = ["Alice"];

// Error
// let firstName: string = names[1];

/*
Fix:
Provide a default value or check for undefined.
*/

let firstName: string = names[1] ?? "Unknown";

console.log(firstName);
