const os = require("os");

// Returns the operating system platform (e.g., win32, linux, darwin).
// Useful for writing platform-specific code.
console.log("Platform:     ", os.platform());

// Returns the CPU architecture (e.g., x64, arm64).
// Useful for checking system compatibility.
console.log("Architecture: ", os.arch());

// Returns the computer's hostname (device name on the network).
// Useful for identifying the current machine.
console.log("Hostname:     ", os.hostname());

// Returns the current user's home directory.
// Useful for storing user-specific files and configurations.
console.log("Home dir:     ", os.homedir());

// Returns information about all CPU cores.
// .length gives the total number of CPU cores available.
console.log("CPU cores:    ", os.cpus().length);

// Returns the total system memory in bytes.
// Converted to megabytes (MB) for easier reading.
const totalMB = Math.round(os.totalmem() / 1024 / 1024);

// Returns the currently available (free) memory in bytes.
// Converted to megabytes (MB).
const freeMB = Math.round(os.freemem() / 1024 / 1024);

// Displays the free memory and total memory in MB.
// Useful for monitoring system resources.
console.log(`Memory: ${freeMB}MB free of ${totalMB}MB`);

//task2.2
// Get the current operating system platform.
// Possible values: 'win32', 'darwin' (macOS), 'linux'.
const platform = os.platform();

// Check which operating system the application is running on.
if (platform === "win32") {
  console.log("Running on Windows");
} else if (platform === "darwin") {
  console.log("Running on Mac");
} else {
  console.log("Running on Linux");
}

// Calculate the percentage of free system memory.
const freePercent = Math.round((os.freemem() / os.totalmem()) * 100);

// Display a warning if available memory is less than 20%.
if (freePercent < 20) {
  console.log("Warning: Low memory —", freePercent + "% free");
} else {
  console.log("Memory OK —", freePercent + "% free");
}

/*
Real-world Example:

A Node.js application may need to check the operating system
to perform platform-specific tasks.

Example:
- On Windows, use Windows file paths or execute Windows commands.
- On Linux/macOS, use Unix shell commands like 'ls' or 'chmod'.
- An installer or deployment script can install different software
  or configure files based on the detected operating system.
*/
