import { describe, expect, test } from "vitest";
import { assert } from "../utils/assert";

describe("assert", () => {
  test("does not throw when condition is true", () => {
    expect(() => assert(1 + 1 === 2, "math is broken")).not.toThrow();
  });

  test("throws with message when condition is false", () => {
    expect(() => assert(false, "this should not happen")).toThrow(
      "Assertion failed: this should not happen",
    );
  });
});

