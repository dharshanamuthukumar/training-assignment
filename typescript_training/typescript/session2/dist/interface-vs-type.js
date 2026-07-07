"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = {
    page: 1,
    pageSize: 10,
    total: 25,
    data: ["Alice", "Bob", "Charlie"],
};
let tags = "TypeScript";
tags = ["JavaScript", "TypeScript"];
const email = {
    id: "N001",
    message: "Welcome!",
    email: "alice@example.com",
};
const push = {
    id: "N002",
    message: "New update available",
    deviceId: "DEVICE123",
};
const printNumber = (value) => {
    console.log(value);
};
printNumber(100);
const method = "GET";
console.log(users);
console.log(tags);
console.log(email);
console.log(push);
console.log(method);
//# sourceMappingURL=interface-vs-type.js.map