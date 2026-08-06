import { describe, it, expect } from "vitest";
import {
  createIntern,
  validateInternForm,
  calculateAverageScore,
  getScoreLabel,
  filterInterns,
} from "../services/intern-service";

import type { InternFormState, Intern } from "../types/intern";

describe("createIntern", () => {
  const form: InternFormState = {
    name: "  John  ",
    score: 85.6,
    role: "Frontend",
    isPresent: true,
  };

  it("generates an id", () => {
    const intern = createIntern(form, () => 123);

    expect(intern.id).toBe(123);
  });

  it("trims the name", () => {
    const intern = createIntern(form, () => 1);

    expect(intern.name).toBe("John");
  });

  it("rounds the score", () => {
    const intern = createIntern(form, () => 1);

    expect(intern.score).toBe(86);
  });
});

describe("validateInternForm", () => {
  it("returns error for empty name", () => {
    const form: InternFormState = {
      name: "",
      score: 80,
      role: "Frontend",
      isPresent: true,
    };

    expect(validateInternForm(form)).toBe("Name is required");
  });

  it("returns error for score greater than 100", () => {
    const form: InternFormState = {
      name: "John",
      score: 120,
      role: "Frontend",
      isPresent: true,
    };

    expect(validateInternForm(form)).toBe("Score must be 0–100");
  });

  it("returns null when valid", () => {
    const form: InternFormState = {
      name: "John",
      score: 90,
      role: "Frontend",
      isPresent: true,
    };

    expect(validateInternForm(form)).toBeNull();
  });
});

describe("calculateAverageScore", () => {
  it("returns 0 for empty list", () => {
    expect(calculateAverageScore([])).toBe(0);
  });

  it("returns correct average", () => {
    const interns: Intern[] = [
      {
        id: 1,
        name: "John",
        score: 80,
        role: "Frontend",
        isPresent: true,
      },
      {
        id: 2,
        name: "Sam",
        score: 60,
        role: "Backend",
        isPresent: true,
      },
    ];

    expect(calculateAverageScore(interns)).toBe(70);
  });

  it("rounds the average score", () => {
    const interns: Intern[] = [
      {
        id: 1,
        name: "John",
        score: 80,
        role: "Frontend",
        isPresent: true,
      },
      {
        id: 2,
        name: "Sam",
        score: 81,
        role: "Backend",
        isPresent: true,
      },
      {
        id: 3,
        name: "Alex",
        score: 82,
        role: "Fullstack",
        isPresent: true,
      },
    ];

    expect(calculateAverageScore(interns)).toBe(81);
  });
});

describe("getScoreLabel", () => {
  it("returns Pass for 50", () => {
    expect(getScoreLabel(50)).toBe("Pass");
  });

  it("returns Fail for 49", () => {
    expect(getScoreLabel(49)).toBe("Fail");
  });

  it("returns Pass for 100", () => {
    expect(getScoreLabel(100)).toBe("Pass");
  });
});

describe("filterInterns", () => {
  const interns: Intern[] = [
    {
      id: 1,
      name: "John",
      score: 80,
      role: "Frontend",
      isPresent: true,
    },
    {
      id: 2,
      name: "Sam",
      score: 70,
      role: "Backend",
      isPresent: true,
    },
  ];

  it("returns all interns when query is empty", () => {
    expect(filterInterns(interns, "")).toHaveLength(2);
  });

  it("matches by name", () => {
    expect(filterInterns(interns, "John")).toHaveLength(1);
  });

  it("matches by role", () => {
    expect(filterInterns(interns, "Backend")).toHaveLength(1);
  });

  it("is case insensitive", () => {
    expect(filterInterns(interns, "frontend")).toHaveLength(1);
  });
});
