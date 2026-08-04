import { describe, test, expect } from "vitest";
import { generateInternId } from "../utils/generate-id";

describe("generateInternId", () => {
  test("returns the expected ID using injected values", () => {
    const fakeNow = () => 1722412800000;
    const fakeRandom = () => 0.12345;

    const id = generateInternId(fakeNow, fakeRandom);

    expect(id).toBe("intern-1722412800000-0.12345");
  });

  test("returns identical IDs when called twice with the same injected values", () => {
    const fakeNow = () => 1722412800000;
    const fakeRandom = () => 0.12345;

    const id1 = generateInternId(fakeNow, fakeRandom);
    const id2 = generateInternId(fakeNow, fakeRandom);

    expect(id1).toBe(id2);
  });
});

// Task 4.2
// The function is now testable because the time source and random source are
// injected as parameters. During testing, fixed values can be supplied,
// producing deterministic and repeatable results without relying on
// Date.now() or Math.random().
