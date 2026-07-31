// import { test, expect } from "vitest";

// // FIRST Principle Violated: Repeatable
// // This test depends on the current system date. It passes only when the
// // current date matches the hardcoded value. Since today's date is different,
// // the test fails. A repeatable test should give the same result regardless
// // of when it is executed.
// test("score report has today's date", () => {
//   const report = {
//     date: new Date().toISOString().slice(0, 10),
//   };

//   expect(report.date).toBe("2024-11-15"); // hardcoded — fails tomorrow
// });
