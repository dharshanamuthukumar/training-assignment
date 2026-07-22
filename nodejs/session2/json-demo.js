const fs = require("fs");
const path = require("path");

// Create the absolute path to data.json.
const filePath = path.join(__dirname, "data.json");

// Read the JSON file as a string.
const raw = fs.readFileSync(filePath, "utf8");

// Convert the JSON string into a JavaScript array of objects.
const users = JSON.parse(raw);

// Display all users.
console.log("All users:", users);

// Display the total number of users.
console.log("Total:", users.length);

// Filter users whose score is 90 or above.
const top = users.filter((u) => u.score >= 90);

// Display the names of the top scorers.
console.log(
  "Top scorers:",
  top.map((u) => u.name),
);

// Calculate the average score of all users.
const avg = users.reduce((sum, u) => sum + u.score, 0) / users.length;

// Display the average score with one decimal place.
console.log("Average score:", avg.toFixed(1));

/*
JSON.parse()

- Converts a JSON string into a JavaScript object or array.
- This allows us to access the data using JavaScript methods
  like filter(), map(), reduce(), and length.

Without JSON.parse():
- The file content would remain as a plain string.
- We cannot access properties like users[0].name
  or use array methods because it is not a JavaScript array.
*/
// Add a new user.
const newUser = { id: 5, name: "Vikram", role: "intern", score: 88 };
users.push(newUser);

// Convert the updated JavaScript array into a JSON string.
// null, 2 formats the JSON with proper indentation for better readability.
const updated = JSON.stringify(users, null, 2);

// Write the updated JSON back to the file.
fs.writeFileSync(filePath, updated);
console.log("User added and file updated");

// Read the updated file again to verify the changes.
const verify = JSON.parse(fs.readFileSync(filePath, "utf8"));
console.log("Total after update:", verify.length);

/*
JSON.stringify(users, null, 2)

- Converts the JavaScript object/array into a JSON string.
- null means no custom replacer function is used.
- 2 means the JSON is formatted with 2 spaces of indentation,
  making it easy to read.

Without null, 2:
- The JSON would be written in a single line without indentation.
- The data would still be correct, but it would be difficult to read.
*/
// Read the updated JSON file.
const currentData = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Find the index of the user whose name is "Amit".
const index = currentData.findIndex((u) => u.name === "Amit");

// Update Amit's score if the user exists.
if (index !== -1) {
  currentData[index].score = 90;

  // Write the updated data back to the JSON file.
  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));

  console.log("Amit score updated to 90");
}

/*
Difference between Array.find() and Array.findIndex()

- Array.find() returns the actual object that matches the condition.
- Array.findIndex() returns the index (position) of the matching object.

When to use findIndex():
- Use findIndex() when you need to update, replace, or remove an
  element from the array because you need its position.

When to use find():
- Use find() when you only need the object and do not need its index.
*/
