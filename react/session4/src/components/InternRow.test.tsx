import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import InternRow from "./InternRow";

// screen.debug() prints the current DOM rendered during the test.
// It helps us inspect the HTML structure and identify the best query,
// such as getByRole, getByText, or getByLabelText.

test("finds the Remove button by role", () => {
  render(<InternRow id={1} name="Rahul" score={92} onRemove={() => {}} />);

  // Uncomment this to inspect the rendered HTML.
  // screen.debug();

  const removeButton = screen.getByRole("button", {
    name: "Remove",
  });

  expect(removeButton).toBeInTheDocument();
});
//task 7.1
// vi.fn() creates a mock function that records how it is called.
// Unlike a real function, it lets us verify the number of calls
// and the arguments passed without executing any real logic.

test("calls onRemove with the correct id when Remove is clicked", async () => {
  const user = userEvent.setup();
  const onRemove = vi.fn();

  render(<InternRow id={1} name="Rahul" score={92} onRemove={onRemove} />);

  await user.click(
    screen.getByRole("button", {
      name: "Remove",
    }),
  );

  expect(onRemove).toHaveBeenCalledTimes(1);
  expect(onRemove).toHaveBeenCalledWith(1);
});

test("does not call onRemove when row is only rendered", () => {
  const onRemove = vi.fn();

  render(<InternRow id={1} name="Rahul" score={92} onRemove={onRemove} />);

  // No interaction has occurred, so the callback should not be called.
  expect(onRemove).not.toHaveBeenCalled();
});
