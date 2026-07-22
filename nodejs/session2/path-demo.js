const path = require("path");

// Returns the absolute path of the directory where this file is located.
// Use it to build file paths that work regardless of where the script is run.
console.log("Current directory:", __dirname);

// Returns the absolute path of the current JavaScript file.
// Useful for debugging or logging the exact file being executed.
console.log("Current file:     ", __filename);

// Joins multiple path segments into a single platform-independent path.
// Use it to safely create file or folder paths.
const filePath = path.join(__dirname, "data", "users.json");
console.log("Joined path:", filePath);

// Returns only the last part of a file path (file name).
// Useful when you need to extract a file name from a full path.
console.log("Basename:", path.basename("/home/user/notes.txt"));

// Returns the file extension.
// Useful for checking the file type before processing it.
console.log("Extension:", path.extname("index.html"));

// Returns the directory portion of a path.
// Useful when you need the folder containing a file.
console.log("Dirname:  ", path.dirname("/home/user/notes.txt"));

// Manual string concatenation — fragile
// This works, but it can break because different operating systems
// use different path separators (/ on Linux/macOS and \ on Windows).
const manual = __dirname + "/data/users.json";
console.log("Manual:    ", manual);

// path.join() — safe across all operating systems
// It joins path segments using the correct separator for the current OS.
const joined = path.join(__dirname, "data", "users.json");
console.log("path.join: ", joined);

// path.resolve() — always returns an absolute path
// If the path is relative, it resolves it from the current working directory.
// If the path is already absolute, it returns the absolute path.
const resolved = path.resolve("data", "users.json");
console.log("Resolved:  ", resolved);

/*
Findings:

1. path.join()
   - Joins multiple path segments into a single path.
   - Uses the correct separator for the operating system.
   - Does not depend on the current working directory if __dirname is used.

2. path.resolve()
   - Always returns an absolute path.
   - Resolves relative paths based on the current working directory (process.cwd()).
   - If an absolute path is provided, it ignores the previous segments and returns that absolute path.

Example:
path.join('data', 'users.json')
=> data/users.json (relative path)

path.resolve('data', 'users.json')
=> C:\\Users\\dhars\\OneDrive\\Desktop\\training assessment\\data\\users.json (absolute path)
*/
