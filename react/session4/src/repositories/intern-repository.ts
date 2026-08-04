import { useState } from "react";
import type { Intern } from "../types/intern";

const INITIAL_INTERNS: Intern[] = [
  { id: 1, name: "Rahul", score: 92, isPresent: true, role: "Frontend" },
  { id: 2, name: "Priya", score: 78, isPresent: false, role: "Backend" },
  { id: 3, name: "Amit", score: 45, isPresent: true, role: "Design" },
  { id: 4, name: "Sneha", score: 88, isPresent: true, role: "Frontend" },
];

export function useInternRepository(initialState: Intern[] = []) {
  const [interns, setInterns] = useState<Intern[]>(initialState);

  const add = (intern: Intern): void => setInterns((prev) => [...prev, intern]);

  const remove = (id: number): void =>
    setInterns((prev) => prev.filter((i) => i.id !== id));

  const update = (intern: Intern): void =>
    setInterns((prev) => prev.map((i) => (i.id === intern.id ? intern : i)));

  return { interns, add, remove, update };
}
// The repository layer should only manage data storage and state updates.
// It should not contain business logic such as validation, ID generation,
// or calculations. Keeping these responsibilities in the service layer
// makes the repository simple, reusable, and easier to test.qq