import { describe, test, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useInternForm from "../hooks/useInternForm";

describe("useInternForm", () => {
  test("submit calls addIntern with valid data", () => {
    const addIntern = vi.fn();

    const { result } = renderHook(() => useInternForm(addIntern, () => 999));

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Rahul",
          type: "text",
        },
      } as any);

      result.current.handleChange({
        target: {
          name: "score",
          value: "92",
          type: "number",
        },
      } as any);
    });

    act(() => {
      result.current.submit();
    });

    expect(addIntern).toHaveBeenCalledTimes(1);

    expect(addIntern).toHaveBeenCalledWith({
      id: 999,
      name: "Rahul",
      score: 92,
      role: "Frontend",
      isPresent: true,
    });
  });

  test("submit does not call addIntern when name is empty", () => {
    const addIntern = vi.fn();

    const { result } = renderHook(() => useInternForm(addIntern));

    act(() => {
      result.current.submit();
    });

    expect(addIntern).not.toHaveBeenCalled();
    expect(result.current.error).toBe("Name is required");
  });

  test("submit does not call addIntern when score is invalid", () => {
    const addIntern = vi.fn();

    const { result } = renderHook(() => useInternForm(addIntern));

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Rahul",
          type: "text",
        },
      } as any);

      result.current.handleChange({
        target: {
          name: "score",
          value: "150",
          type: "number",
        },
      } as any);
    });

    act(() => {
      result.current.submit();
    });

    expect(addIntern).not.toHaveBeenCalled();
    expect(result.current.error).toContain("Score");
  });

  test("error clears after successful submit", () => {
    const addIntern = vi.fn();

    const { result } = renderHook(() => useInternForm(addIntern));

    act(() => {
      result.current.submit();
    });

    expect(result.current.error).toBe("Name is required");

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Rahul",
          type: "text",
        },
      } as any);

      result.current.handleChange({
        target: {
          name: "score",
          value: "95",
          type: "number",
        },
      } as any);
    });

    act(() => {
      result.current.submit();
    });

    expect(result.current.error).toBe("");
  });
});
