import { describe, test, expect } from "vitest";
import { filterInterns } from "../utils/intern-utils";

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

const interns: Intern[] = [
  {
    id: 1,
    name: "Rahul",
    score: 85,
    role: "Frontend",
    isPresent: true,
  },
  {
    id: 2,
    name: "Priya",
    score: 90,
    role: "Backend",
    isPresent: false,
  },
  {
    id: 3,
    name: "Arun",
    score: 78,
    role: "Frontend",
    isPresent: true,
  },
];

describe("filterInterns", () => {
  test("returns all interns when searchTerm is empty", () => {
    const result = filterInterns(interns, "");

    expect(result).toEqual(interns);
    expect(result).toHaveLength(3);
  });

  test("returns only interns whose name matches (case-insensitive)", () => {
    const result = filterInterns(interns, "rahul");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Rahul");
  });

  test("returns only interns whose role matches (case-insensitive)", () => {
    const result = filterInterns(interns, "frontend");

    expect(result).toHaveLength(2);
    expect(result[0].role).toBe("Frontend");
    expect(result[1].role).toBe("Frontend");
  });

  test("returns an empty array when no interns match", () => {
    const result = filterInterns(interns, "Designer");

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  test("returns interns that match on either name OR role", () => {
    const byName = filterInterns(interns, "Priya");
    const byRole = filterInterns(interns, "Backend");

    expect(byName).toHaveLength(1);
    expect(byName[0].name).toBe("Priya");

    expect(byRole).toHaveLength(1);
    expect(byRole[0].role).toBe("Backend");
  });
});

// Task 3.2
// Observation:
// These tests are much simpler than hook tests because `filterInterns` is a
// pure function. There is no need to render hooks, mock React, or set up
// providers. We simply pass input values and verify the returned output,
// making the tests shorter, faster, and easier to understand.
