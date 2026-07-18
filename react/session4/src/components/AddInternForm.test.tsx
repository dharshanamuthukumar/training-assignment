import { render, screen, waitFor } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import AddInternForm from "./AddInternForm";

// userEvent is preferred over fireEvent because it simulates
// real user interactions such as typing, clicking, focusing,
// and keyboard events. This makes tests closer to actual user behavior.

test("updates name when user types", async () => {
  const user = userEvent.setup();

  render(<AddInternForm onAdd={() => {}} count={0} />);

  await user.type(screen.getByPlaceholderText("Name"), "Rahul");

  expect(screen.getByDisplayValue("Rahul")).toBeInTheDocument();
});

test("updates score when user types", async () => {
  const user = userEvent.setup();

  render(<AddInternForm onAdd={() => {}} count={0} />);

  const scoreInput = screen.getByPlaceholderText("Score");

  await user.clear(scoreInput);
  await user.type(scoreInput, "92");

  expect(screen.getByDisplayValue("92")).toBeInTheDocument();
});
// expect.objectContaining() checks only the specified properties
// of an object. It ignores any additional properties, making the
// test more flexible than comparing the entire object.

test("resets name input when Reset is clicked", async () => {
  const user = userEvent.setup();

  render(<AddInternForm onAdd={() => {}} count={0} />);

  await user.type(screen.getByPlaceholderText("Name"), "Rahul");
  await user.click(screen.getByRole("button", { name: "Reset" }));

  expect(screen.getByPlaceholderText("Name")).toHaveValue("");
});

test("calls onAdd with intern data when form is submitted", async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn();

  render(<AddInternForm onAdd={onAdd} count={0} />);

  await user.type(screen.getByPlaceholderText("Name"), "Rahul");

  await user.clear(screen.getByPlaceholderText("Score"));
  await user.type(screen.getByPlaceholderText("Score"), "92");

  await user.click(screen.getByRole("button", { name: "Add Intern" }));

  expect(onAdd).toHaveBeenCalledTimes(1);

  expect(onAdd).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Rahul",
      score: 92,
    }),
  );
});
//task 4.1
// not.toHaveBeenCalled() is clearer because it directly states
// that the mock function should never have been called.
// It is easier to read than checking that it was called zero times.

test("shows error when name is empty on submit", async () => {
  const user = userEvent.setup();

  render(<AddInternForm onAdd={() => {}} count={0} />);

  await user.click(screen.getByRole("button", { name: "Add Intern" }));

  expect(screen.getByText("Name is required")).toBeInTheDocument();
});

test("shows error when score is above 100", async () => {
  const user = userEvent.setup();

  render(<AddInternForm onAdd={() => {}} count={0} />);

  await user.type(screen.getByPlaceholderText("Name"), "Rahul");

  await user.clear(screen.getByPlaceholderText("Score"));
  await user.type(screen.getByPlaceholderText("Score"), "150");

  await user.click(screen.getByRole("button", { name: "Add Intern" }));

  expect(
    screen.getByText("Score must be between 0 and 100"),
  ).toBeInTheDocument();
});

test("does not call onAdd when form is invalid", async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn();

  render(<AddInternForm onAdd={onAdd} count={0} />);

  await user.click(
    screen.getByRole("button", {
      name: "Add Intern",
    }),
  );

  expect(onAdd).not.toHaveBeenCalled();
});
//task 4.2
test("error clears when valid name is entered after failed submit", async () => {
  const user = userEvent.setup();

  render(<AddInternForm onAdd={() => {}} count={0} />);

  // Trigger the validation error
  await user.click(screen.getByRole("button", { name: "Add Intern" }));

  expect(screen.getByText("Name is required")).toBeInTheDocument();

  // Fix the error by typing a valid name
  await user.type(screen.getByPlaceholderText("Name"), "Rahul");

  // Wait until the error disappears
  await waitFor(() => {
    expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
  });
});
// queryBy returns null if the element is not found, making it suitable
// for checking that an element has disappeared. getBy would throw an
// error immediately if the element is missing.
//task 8.1
// Keep describe blocks to two levels at most.
// Shallow nesting keeps test names clear, makes failures easier to locate,
// and improves readability. Deeply nested describe blocks create long,
// confusing test paths and make the test file harder to maintain.
