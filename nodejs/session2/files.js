const fs = require("fs");
const path = require("path");

// Create the absolute path to output.txt.
const filePath = path.join(__dirname, "output.txt");

// Write data to the file.
// If the file already exists, its contents will be overwritten.
fs.writeFileSync(filePath, "Line 1 — written by Node.js");
console.log("File written");

// Read the file contents as a UTF-8 string.
const content = fs.readFileSync(filePath, "utf8");
console.log("Content:", content);

// Append new lines to the existing file.
// This adds data without removing the existing content.
fs.appendFileSync(filePath, "\nLine 2 — appended");
fs.appendFileSync(filePath, "\nLine 3 — appended again");

// Read the updated file.
const updated = fs.readFileSync(filePath, "utf8");
console.log("Updated:\n", updated);

/*
Difference between writeFileSync() and appendFileSync()

1. writeFileSync()
   - Creates a new file if it does not exist.
   - If the file already exists, it overwrites all existing content.
   - Used when you want to replace the file contents completely.

2. appendFileSync()
   - Creates the file if it does not exist.
   - Adds new content to the end of the existing file.
   - Used when you want to preserve existing data and add more.
*/
// Create the path for a file that may not exist.
const checkPath = path.join(__dirname, "missing.txt");

// Check whether the file exists before trying to read it.
if (fs.existsSync(checkPath)) {
  console.log("File exists");
} else {
  console.log("File does not exist — creating it");

  // Create the file because it was missing.
  fs.writeFileSync(checkPath, "Created because it was missing");
}

/*
What happens if readFileSync() is called on a missing file?

If you call fs.readFileSync() on a file that does not exist,
Node.js throws an ENOENT (Error NO ENTry) exception and the
program stops unless the error is handled.

Proper way to handle it:
1. Check if the file exists using fs.existsSync(), or
2. Use a try...catch block to catch the error and handle it gracefully
   without crashing the application.
*/
