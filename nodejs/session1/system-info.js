const os = require("os");

// The os module provides information about the operating system.
// Real-world example:
// A Node.js application may check the operating system to perform
// platform-specific tasks (such as using different file paths or commands).
// It can also check available memory to avoid running memory-intensive
// operations or to optimize performance when processing large files.

console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("Hostname:", os.hostname());
console.log("Home directory:", os.homedir());
console.log("CPUs:", os.cpus().length);
console.log("Total memory (MB):", Math.round(os.totalmem() / 1024 / 1024));
console.log("Free memory (MB):", Math.round(os.freemem() / 1024 / 1024));
