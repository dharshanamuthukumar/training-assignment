const http = require("http");

// Create an HTTP server.
const server = http.createServer((req, res) => {
  // Log the HTTP request method and URL.
  console.log(`${req.method} ${req.url}`);

  // Route for the home page.
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home page");

    // Route for the about page.
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About page");

    // Route for the status page.
  } else if (req.url === "/status") {
    // Send a JSON response with the server status and uptime.
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "ok",
        uptime: process.uptime(),
      }),
    );

    // Route not found.
  } else if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(`
    <html>
      <head>
        <title>Node.js Server</title>
      </head>
      <body>
        <h1>Welcome to Node.js Server</h1>
        <p>Session 2 Activity Tasks Completed</p>
      </body>
    </html>
  `);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 — Page not found");
  }
});

// Start the server on port 3001.
server.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});

/*
Findings:

1. process.uptime()
   - Returns the number of seconds the current Node.js process
     has been running since the server started.
   - The value increases continuously while the server is running.

2. Content-Type: application/json
   - Tells the browser/client that the response is JSON data.
   - The browser or API client knows to interpret the response
     as a JSON object instead of plain text or HTML.
*/
