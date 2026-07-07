const http = require("http");

// Create an HTTP server.
// req (request) contains information sent by the client such as
// the URL, HTTP method, headers, and request data.
//
// res (response) is used by the server to send data, status codes,
// and headers back to the client (browser).
const server = http.createServer((req, res) => {
  // req.method contains the HTTP request method
  // such as GET, POST, PUT, DELETE, etc.
  //
  // req.url contains the URL/path requested by the client,
  // such as "/", "/about", or "/users".
  console.log(`${req.method} ${req.url}`);

  // Send HTTP status code 200 (OK) and specify that the response is plain text.
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send the response body and end the request.
  res.end("Hello from Node.js!");
});

// Start the server and listen for incoming requests on port 3000.
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
/* 
understanding req and res
req (Request Object):
  Represents the incoming request from the client (browser or API client).
  Contains information like:
    URL (req.url)
    HTTP method (req.method)
    Headers (req.headers)
    Request body (for POST/PUT requests)*/
/*
res (Response Object):
  Represents the response that your server sends back to the client.
  Used to:
    Set status codes (res.writeHead())
    Set headers
    Send data (res.end())*/
// req.method
// Contains the HTTP request method (GET, POST, PUT, DELETE, etc.).
// Used to determine what type of operation the client wants to perform.

// req.url
// Contains the URL path requested by the client,
// such as "/", "/about", or "/users".
// Used to identify which resource or route the client is requesting.
