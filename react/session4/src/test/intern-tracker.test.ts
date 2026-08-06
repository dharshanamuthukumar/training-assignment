import { describe, it, expect } from "vitest";
import { InternTracker } from "../services/intern-tracker";
import { vi } from "vitest";

global.fetch = vi.fn().mockResolvedValue({
  json: async () => [
    {
      id: 1,
      name: "Rahul",
      score: 80,
      role: "Frontend",
      isPresent: true,
    },
  ],
}) as any;
describe("InternTracker.updateScore", () => {
  it("throws RangeError if score is out of 0–100 range", () => {
    const tracker = new InternTracker();

    expect(() => tracker.updateScore(1, 120)).toThrow(RangeError);
  });

  it("throws if the intern does not exist", () => {
    const tracker = new InternTracker();

    expect(() => tracker.updateScore(999, 90)).toThrow("Intern not found");
  });

  it("updates the score without exposing internal state", async () => {
    const tracker = new InternTracker();

    // Load interns (normally fetched from API)
    await tracker.loadAll();

    const intern = tracker.getById(1);

    if (!intern) {
      throw new Error("Test setup failed");
    }

    tracker.updateScore(1, 95);

    expect(tracker.getById(1)?.score).toBe(95);
  });
});
