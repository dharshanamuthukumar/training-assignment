const path = require("path");

// path.join() safely combines path segments using the correct separator
// for the operating system (e.g., '\' on Windows and '/' on Linux/macOS).
// It avoids errors caused by manually concatenating strings and makes the
// code portable across different operating systems.

console.log("Directory name:", __dirname);
console.log("File name:", __filename);

const joined = path.join(__dirname, "data", "users.json");
console.log("Joined path:", joined);

console.log("Extension:", path.extname("index.html"));
console.log("Basename:", path.basename("/users/rahul/notes.txt"));
console.log("Dirname:", path.dirname("/users/rahul/notes.txt"));
