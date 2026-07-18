// import { test, expect } from "vitest";

// // FIRST Principles Violated: Fast and Repeatable
// //
// // Fast: This test depends on a real API server running at localhost.
// // Network requests make tests slower compared to isolated unit tests,
// // and the test cannot run if the API server is unavailable.
// //
// // Repeatable: The test depends on external data from the API. If the API
// // response changes, the network fails, or the server is not running,
// // the test result changes. It may pass locally but fail in CI where the
// // API server is not available.

// test("loads interns from API", async () => {
//   const response = await fetch("http://localhost:5173/api/interns");

//   const data = await response.json();

//   expect(data).toHaveLength(4);
// });
