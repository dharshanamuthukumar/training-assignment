import { describe, test, expect } from "vitest";
import { prepareInternRequest } from "../utils/intern-request";

describe("prepareInternRequest", () => {
  test("creates the correct request payload", () => {
    const intern = {
      name: "Rahul",
      score: 92,
      isPresent: true,
      role: "Frontend",
    };

    const result = prepareInternRequest(intern);

    expect(result).toEqual({
      url: "/api/interns",
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(intern),
      },
    });
  });
});

// Task 4.3
// Observation:
// prepareInternRequest is a pure function. It simply transforms input data
// into a request object without performing any network calls or browser
// operations. Therefore, the test requires zero mocking and only verifies
// the returned object.
