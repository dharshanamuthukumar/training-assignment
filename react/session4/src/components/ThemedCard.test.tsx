import { render, screen } from "../test/test-utils";
import ThemedCard from "./ThemedCard";

// We import render from ../test/test-utils so every component is
// automatically wrapped with ThemeProvider. This allows ThemedCard
// to access the theme context without manually wrapping it in each test.
test("renders the intern name", () => {
  render(<ThemedCard name="Rahul" score={92} />);

  expect(screen.getByText("Rahul")).toBeInTheDocument();
});

test("renders the score", () => {
  render(<ThemedCard name="Rahul" score={92} />);

  expect(screen.getByText("Score: 92")).toBeInTheDocument();
});

test("shows Pass when score is 50 or above", () => {
  render(<ThemedCard name="Rahul" score={92} />);

  expect(screen.getByText("Pass")).toBeInTheDocument();
});

test("shows Fail when score is below 50", () => {
  render(<ThemedCard name="Amit" score={45} />);

  expect(screen.getByText("Fail")).toBeInTheDocument();
});
// getBy is used when the element should exist in the document.
// queryBy is used when the element should NOT exist because it
// returns null instead of throwing an error if the element is absent.

test("does not show Fail when the intern has passed", () => {
  render(<ThemedCard name="Rahul" score={92} />);

  expect(screen.queryByText("Fail")).not.toBeInTheDocument();
});

test("does not show Pass when the intern has failed", () => {
  render(<ThemedCard name="Amit" score={45} />);

  expect(screen.queryByText("Pass")).not.toBeInTheDocument();
});
// Edge cases help verify that the component works correctly for
// minimum and maximum values. Testing score={0} and score={100}
// ensures the conditional logic handles extreme inputs correctly,
// not just typical values like 92.

test("renders score of 0 correctly", () => {
  render(<ThemedCard name="Neha" score={0} />);

  expect(screen.getByText("Score: 0")).toBeInTheDocument();
  expect(screen.getByText("Fail")).toBeInTheDocument();
});

test("renders score of 100 correctly", () => {
  render(<ThemedCard name="Neha" score={100} />);

  expect(screen.getByText("Score: 100")).toBeInTheDocument();
  expect(screen.getByText("Pass")).toBeInTheDocument();
});

test("renders a different name and score without mixing up values", () => {
  render(<ThemedCard name="Priya" score={75} />);

  expect(screen.getByText("Priya")).toBeInTheDocument();
  expect(screen.getByText("Score: 75")).toBeInTheDocument();
  expect(screen.getByText("Pass")).toBeInTheDocument();
});
//task 7.3
// vi.fn() creates a standalone mock function that records how it is called.
// vi.mock() replaces an entire module with a mocked implementation.
// vi.spyOn() watches an existing function and can optionally replace its implementation.

test("no console errors during ThemedCard render", () => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});

  render(<ThemedCard name="Rahul" score={92} />);

  expect(spy).not.toHaveBeenCalled();

  spy.mockRestore();
});
