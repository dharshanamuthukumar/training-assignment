const fs = require("fs");

// JSON.parse() converts a JSON string into a JavaScript object.
// If the JSON file contains a syntax error (such as a missing comma or
// an unclosed bracket), JSON.parse() throws a SyntaxError and the
// program stops until the error is fixed.

const raw = fs.readFileSync("nodejs/session1/data.json", "utf8");
const data = JSON.parse(raw);

console.log("All users:", data.users);
console.log("First user:", data.users[0].name);

const interns = data.users.filter((u) => u.role === "intern");
console.log(
  "Interns:",
  interns.map((u) => u.name),
);
