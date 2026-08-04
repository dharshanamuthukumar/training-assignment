import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ScoreBadge, { getScoreLabel } from "./ScoreBadge";

describe("ScoreBadge", () => {
  describe("getScoreLabel (Unit Tests)", () => {
    test("getScoreLabel(45) returns 'Fail'", () => {
      expect(getScoreLabel(45)).toBe("Fail");
    });

    test("getScoreLabel(92) returns 'Pass'", () => {
      expect(getScoreLabel(92)).toBe("Pass");
    });

    test("getScoreLabel(50) returns 'Pass' (boundary condition)", () => {
      expect(getScoreLabel(50)).toBe("Pass");
    });
  });

  describe("ScoreBadge Component (Component Tests)", () => {
    test("badge renders 'Pass' when score is 92", () => {
      render(<ScoreBadge score={92} />);
      expect(screen.getByText("Pass")).toBeInTheDocument();
    });

    test("badge renders 'Fail' when score is 45", () => {
      render(<ScoreBadge score={45} />);
      expect(screen.getByText("Fail")).toBeInTheDocument();
    });
  });
});
