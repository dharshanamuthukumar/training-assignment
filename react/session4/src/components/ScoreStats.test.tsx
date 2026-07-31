import { render, screen, waitFor } from "../test/test-utils";
import ScoreStats from "./ScoreStats";

test("shows loading state initially", () => {
  render(<ScoreStats />);

  expect(screen.getByText("Loading interns...")).toBeInTheDocument();
});

test("shows intern data after loading completes", async () => {
  render(<ScoreStats />);

  // findByText waits until the element appears.
  const rahul = await screen.findByText("Rahul");

  expect(rahul).toBeInTheDocument();

  expect(screen.queryByText("Loading interns...")).not.toBeInTheDocument();
});
// findByText returns a Promise and automatically waits for
// an element to appear in the DOM. It is useful for testing
// asynchronous UI updates such as API calls or delayed loading.
//task 5.2
// findBy is best when waiting for a single element to appear.
// waitFor is used when waiting for multiple conditions or more
// complex assertions to become true.

test("multiple elements appear after data loads", async () => {
  render(<ScoreStats />);

  await waitFor(() => {
    expect(screen.getByText("Rahul")).toBeInTheDocument();
    expect(screen.getByText("Priya")).toBeInTheDocument();
  });
});
