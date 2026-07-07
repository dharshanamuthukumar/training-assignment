const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Create the absolute path to data.json.
const filePath = path.join(__dirname, "data.json");

// Create the HTTP server.
const server = http.createServer((req, res) => {
  // Display the request method and URL in the terminal.
  console.log(`${req.method} ${req.url}`);

  // Read the JSON file.
  const raw = fs.readFileSync(filePath, "utf8");

  // Convert JSON string into JavaScript array.
  const users = JSON.parse(raw);

  // Set response type as JSON.
  res.setHeader("Content-Type", "application/json");

  // Return all users.
  if (req.url === "/users") {
    res.writeHead(200);
    res.end(JSON.stringify(users));

    // Return users whose score is 90 or above.
  } else if (req.url === "/users/top") {
    const topUsers = users.filter((user) => user.score >= 90);

    res.writeHead(200);
    res.end(JSON.stringify(topUsers));

    // Return a single user by id.
  } else if (req.url.startsWith("/users/")) {
    const id = parseInt(req.url.split("/")[2]);

    const user = users.find((u) => u.id === id);

    if (user) {
      res.writeHead(200);
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "User not found" }));
    }

    // Return health status of the server.
  } else if (req.url === "/health") {
    // Calculate memory in MB.
    const totalMB = Math.round(os.totalmem() / 1024 / 1024);
    const freeMB = Math.round(os.freemem() / 1024 / 1024);

    const health = {
      status: "ok",
      platform: os.platform(),
      memory: {
        totalMB,
        freeMB,
      },
      uptime: process.uptime(),
    };

    res.writeHead(200);
    res.end(JSON.stringify(health));

    // Handle unknown routes.
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

// Start the server on port 3000.
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

/*
Health Check Endpoint

A health check endpoint is used to check whether the server is
running properly.

Monitoring tools such as Docker, Kubernetes, AWS Load Balancer,
and monitoring services periodically call this endpoint.

If the endpoint returns a successful response, the service is
considered healthy. If it fails, the monitoring tool can restart
the application or stop sending user requests to it.
*/
