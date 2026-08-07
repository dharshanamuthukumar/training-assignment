import { describe, test, expect } from "vitest";
import { render, screen, rerender } from "@testing-library/react";
import { SummaryBar } from "../components/SummaryBar";

describe("SummaryBar", () => {
  test("shows correct total", () => {
    render(<SummaryBar total={3} presentCount={2} averageScore={80} />);

    expect(screen.getByText("Total Interns: 3")).toBeInTheDocument();
  });

  test("shows correct present count", () => {
    render(<SummaryBar total={5} presentCount={2} averageScore={75} />);

    expect(screen.getByText("Present: 2")).toBeInTheDocument();
  });

  test("shows average score of 0", () => {
    render(<SummaryBar total={0} presentCount={0} averageScore={0} />);

    expect(screen.getByText("Average Score: 0")).toBeInTheDocument();
  });

  test("updates values when props change", () => {
    const { rerender } = render(
      <SummaryBar total={3} presentCount={2} averageScore={80} />,
    );

    rerender(<SummaryBar total={6} presentCount={5} averageScore={95} />);

    expect(screen.getByText("Total Interns: 6")).toBeInTheDocument();
    expect(screen.getByText("Present: 5")).toBeInTheDocument();
    expect(screen.getByText("Average Score: 95")).toBeInTheDocument();
  });
});

// Task 5.2
// Observation:
// The tests do not use vi.mock() and do not require an InternProvider.
// Since SummaryBar receives all required data through props, it is a
// presentational component that is simple to test. The container component
// is responsible for reading data from context, while the presentational
// component focuses only on rendering the UI.
