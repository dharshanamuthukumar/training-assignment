"use strict";
// strict-demo.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Example for noImplicitAny
// Error when strict mode is ON.
// Works when strict mode is OFF.
function greet(name) {
    console.log("Hello, " + name);
}
greet("Dharshana");
// Example for strictNullChecks
// Error when strict mode is ON.
// Works when strict mode is OFF.
let username = "dharshana";
console.log(username);
//# sourceMappingURL=strict-demo.js.map