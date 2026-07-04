// require('dayjs') imports the Day.js library so it can be used in this file.
// Node.js first checks if 'dayjs' is a built-in module. Since it is not,
// it searches the node_modules folder in the current project and loads
// the package from there.

const dayjs = require("dayjs");

console.log("Today:", dayjs().format("DD MMM YYYY"));
console.log("Day of week:", dayjs().format("dddd"));
console.log("Next week:", dayjs().add(7, "day").format("DD /MMM/ YYYY"));
console.log("Is before 2030?", dayjs().isBefore("2030-01-01"));
