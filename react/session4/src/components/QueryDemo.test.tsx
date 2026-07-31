import { render, screen } from "../test/test-utils";
import ThemedCard from "./ThemedCard";

// getBy is used when exactly one matching element should exist.
// getAllBy is used when multiple matching elements are expected.
// getAllByRole returns an array of elements, whereas getByRole
// returns a single element and throws an error if none or more than one match is found.

// getBy — throws if element is not found
test("getByText throws when element is missing", () => {
  render(<ThemedCard name="Rahul" score={92} />);

  // This passes because the element exists.
  expect(screen.getByText("Rahul")).toBeInTheDocument();

  // Uncomment to see the failure.
  // screen.getByText("Priya");
});

// queryBy — returns null if element is not found
test("queryBy returns null when element is missing", () => {
  render(<ThemedCard name="Rahul" score={92} />);

  // Use queryBy when checking that something is NOT rendered.
  expect(screen.queryByText("Fail")).not.toBeInTheDocument();
});

// getAllBy — finds multiple matching elements
test("getAllBy finds multiple elements", () => {
  render(
    <div>
      <ThemedCard name="Rahul" score={92} />
      <ThemedCard name="Priya" score={78} />
    </div>,
  );

  // Both cards display "Pass".
  const passBadges = screen.getAllByText("Pass");

  expect(passBadges).toHaveLength(2);
});
