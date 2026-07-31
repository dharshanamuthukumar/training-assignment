import { render, screen } from "../test/test-utils";
import InternListWithCallback from "./InternListWithCallback";

vi.mock("../contexts/intern-context", async () => {
  const actual = await vi.importActual<
    typeof import("../contexts/intern-context")
  >("../contexts/intern-context");

  return {
    ...actual,

    useInterns: () => ({
      interns: [
        {
          id: 1,
          name: "Rahul",
          score: 92,
          role: "Frontend",
          isPresent: true,
        },
        {
          id: 2,
          name: "Priya",
          score: 78,
          role: "Backend",
          isPresent: true,
        },
        {
          id: 3,
          name: "Amit",
          score: 45,
          role: "Fullstack",
          isPresent: false,
        },
      ],
      removeIntern: vi.fn(),
      addIntern: vi.fn(),
      isLoading: false,
    }),
  };
});

test("renders all interns from the mocked context", () => {
  render(<InternListWithCallback />);

  expect(screen.getByText("Rahul — 92")).toBeInTheDocument();
  expect(screen.getByText("Priya — 78")).toBeInTheDocument();
  expect(screen.getByText("Amit — 45")).toBeInTheDocument();
});

test("renders the correct number of Remove buttons", () => {
  render(<InternListWithCallback />);

  const removeButtons = screen.getAllByRole("button", {
    name: "Remove",
  });

  expect(removeButtons).toHaveLength(3);
});
