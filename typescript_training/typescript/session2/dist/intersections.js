"use strict";
// Task A — Base types
Object.defineProperty(exports, "__esModule", { value: true });
// Task C — Function
function isDeleted(record) {
    return record.isDeleted;
}
// Task D — Objects
const baseRecord = {
    id: "BR001",
    createdAt: new Date(),
    updatedAt: new Date(),
};
const userRecord = {
    id: "U001",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Alice",
    email: "alice@example.com",
};
const auditedUser = {
    id: "U002",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Bob",
    email: "bob@example.com",
    isDeleted: true,
    deletedAt: new Date(),
};
console.log(isDeleted(auditedUser));
console.log(isDeleted({ isDeleted: false }));
/*
Explore: Intersecting conflicting property types

type A = { value: string };
type B = { value: number };
type C = A & B;

The type of C['value'] becomes 'never'.

This is because a value cannot be both a string and a number
at the same time.

Example:

const obj: C = {
  value: "hello" // Error
};

const obj2: C = {
  value: 100 // Error
};

No value can satisfy both types, so creating an object of type C
is impossible.
*/
//# sourceMappingURL=intersections.js.map