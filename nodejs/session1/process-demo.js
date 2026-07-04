// Returns the current Node.js version.
// Useful for checking compatibility with packages and debugging version-specific issues.
console.log("Node version:", process.version);

// Returns the operating system platform (e.g., win32, linux, darwin).
// Useful when writing code that behaves differently on different operating systems.
console.log("Platform:", process.platform);

// Returns the current working directory from which the Node.js process was started.
// Useful for locating files and understanding where the application is running.
console.log("Current directory:", process.cwd());

// Returns an object containing memory usage statistics of the current Node.js process.
// Useful for monitoring memory consumption and detecting memory leaks.
console.log("Memory usage:", process.memoryUsage());
// process.argv returns an array containing the command-line arguments.
// It is useful for building command-line tools where users provide input
// such as filenames, usernames, or configuration options.

const args = process.argv;

console.log("All arguments:", args);
console.log("Your input:", args[2]);
// process.env contains environment variables.
// Environment variables are commonly used to store configuration values
// such as database URLs, API keys, and application settings.
// This keeps sensitive information out of the source code and allows
// different environments (development, testing, production) to have
// different configurations without modifying the code.

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("HOME:", process.env.HOME || process.env.USERPROFILE);
