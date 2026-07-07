// strict-demo.ts

// Example for noImplicitAny
// Error when strict mode is ON.
// Works when strict mode is OFF.

function greet(name: string) {
  console.log("Hello, " + name);
}

greet("Dharshana");

// Example for strictNullChecks
// Error when strict mode is ON.
// Works when strict mode is OFF.

let username: string = "dharshana";

console.log(username);
