const fs = require("fs");
const path = require("path");

// ----------------------------------------------------
// Task 1: fs.promises with async/await
// ----------------------------------------------------

const inputFile = path.join(__dirname, "data.json");
const outputFile = path.join(__dirname, "output.txt");

async function readAndWriteFile() {
  try {
    // Read file using fs.promises.readFile
    const data = await fs.promises.readFile(inputFile, "utf8");

    console.log("File content read successfully");

    // Write file using fs.promises.writeFile
    await fs.promises.writeFile(outputFile, data);

    console.log("File written successfully");
  } catch (error) {
    console.log("Error:", error.message);
  }
}

readAndWriteFile();

// ----------------------------------------------------
// Task 4: fs.readdirSync
// List all .js files with file sizes
// ----------------------------------------------------

console.log("\nJavaScript Files in session2 folder:");

const files = fs.readdirSync(__dirname);

files.forEach((file) => {
  if (file.endsWith(".js")) {
    const filePath = path.join(__dirname, file);

    const stats = fs.statSync(filePath);

    const sizeKB = (stats.size / 1024).toFixed(2);

    console.log(`${file} - ${sizeKB} KB`);
  }
});
