const fs = require("fs");
const path = require("path");

// Create the absolute path to output.txt.
const filePath = path.join(__dirname, "output.txt");

// ---------------- Synchronous Example ----------------

// This message is printed before reading the file.
console.log("1 — before sync read");

// readFileSync() blocks the program until the file is completely read.
const data = fs.readFileSync(filePath, "utf8");

// This is printed only after the file has been read.
console.log("2 — sync read done:", data.split("\n").length, "lines");

// Printed after the synchronous read finishes.
console.log("3 — after sync read");

console.log("---");

// ---------------- Asynchronous Example ----------------

// Printed before starting the asynchronous read.
console.log("4 — before async read");

// readFile() starts reading the file in the background.
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) throw err;

  // This executes only after the file has finished reading.
  console.log("6 — async read done:", data.split("\n").length, "lines");
});

// This executes immediately without waiting for the file read.
console.log("5 — after async read (does not wait)");

/*
Why does this ordering matter?

Synchronous operations block the program until they finish.
If a server uses synchronous file operations, every user request
must wait for the current operation to complete, reducing performance.

Asynchronous operations allow Node.js to continue handling other
requests while waiting for the file operation to finish.
This makes Node.js efficient for applications with many users
accessing the server at the same time.
*/
