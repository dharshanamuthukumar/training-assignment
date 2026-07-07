const fs = require("fs");

// writeFileSync() creates a new file or overwrites the existing file with new content.
// appendFileSync() adds new content to the end of an existing file without removing its current contents.

// Write a file
fs.writeFileSync(
  "nodejs/session1/output.txt",
  "Hello from Node.js file system!",
);

// Read it back
const content = fs.readFileSync("nodejs/session1/output.txt", "utf8");
console.log("File content:", content);

// Append to it
fs.appendFileSync("nodejs/session1/output.txt", "\nThis line was appended.");

// Read again
const updated = fs.readFileSync("nodejs/session1/output.txt", "utf8");
console.log("Updated content:", updated);
