"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filter(items, predicate) {
    return items.filter(predicate);
}
function transform(items, fn) {
    return items.map(fn);
}
const handleEvent = (eventName, payload) => {
    console.log(`Event: ${eventName}`);
    console.log("Payload:", payload);
};
handleEvent("login", { user: "Alice" });
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filter(numbers, (num) => num % 2 === 0);
const numberStrings = transform(numbers, (num) => num.toString());
console.log("Even Numbers:", evenNumbers);
console.log("Number Strings:", numberStrings);
//# sourceMappingURL=callbacks.js.map