import { createContext, ReactNode, useContext, useState } from "react";
import { useInternRepository } from "../repositories/intern-repository";
import {
  createIntern,
  calculateAverageScore,
  filterInterns,
} from "../services/intern-service";
import type { Intern, InternFormState } from "../types/intern";

interface InternContextType {
  interns: Intern[];
  filteredInterns: Intern[];
  search: string;
  setSearch: (value: string) => void;
  averageScore: number;
  addIntern: (form: InternFormState) => void;
  removeIntern: (id: number) => void;
}

export const InternContext = createContext<InternContextType | undefined>(
  undefined,
);

export function useInterns() {
  const context = useContext(InternContext);

  if (!context) {
    throw new Error("useInterns must be used within an InternProvider");
  }

  return context;
}

const INITIAL_INTERNS: InternFormState[] = [
  { name: "Rahul", score: 92, isPresent: true, role: "Frontend" },
  { name: "Priya", score: 78, isPresent: false, role: "Backend" },
  { name: "Amit", score: 45, isPresent: true, role: "Design" },
  { name: "Sneha", score: 88, isPresent: true, role: "Frontend" },
];

const INITIAL_INTERN_OBJECTS = INITIAL_INTERNS.map((form, index) =>
  createIntern(form, () => index + 1),
);

// -----------------------------------------------------------------------------
// Task 6.1 — Boundary validation
// Validate all incoming intern data before it is stored in the repository.
// -----------------------------------------------------------------------------
function validateIntern(intern: Intern): Intern {
  if (!intern.name.trim()) {
    throw new Error("validateIntern: name is required");
  }

  if (intern.score < 0 || intern.score > 100) {
    throw new Error(
      `validateIntern: score must be between 0 and 100, got: ${intern.score}`,
    );
  }

  return intern;
}

export function InternProvider({
  children,
  generateId,
}: {
  children: ReactNode;
  generateId?: () => number;
}) {
  const repo = useInternRepository(INITIAL_INTERN_OBJECTS);
  const [search, setSearch] = useState("");

  const filteredInterns = filterInterns(repo.interns, search);

  const value: InternContextType = {
    interns: repo.interns,
    filteredInterns,
    search,
    setSearch,
    averageScore: calculateAverageScore(repo.interns),

    addIntern: (form: InternFormState) => {
      const intern = createIntern(form, generateId);

      // Task 6.1 — Validate before storing
      validateIntern(intern);

      repo.add(intern);
    },

    removeIntern: (id: number) => {
      repo.remove(id);
    },
  };

  return (
    <InternContext.Provider value={value}>{children}</InternContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// Task 4.1 — Separation of Concerns
// After refactoring, InternProvider only wires the service and repository
// layers together into a context value.
// -----------------------------------------------------------------------------

// Task 4.1
// Intern IDs can now be changed without modifying this file.
// Only createIntern() in intern-service.ts needs to be updated.

// Task 6.2
// One-sentence description:
// "intern-context.tsx wires the service and repository layers together
// into a context value."

// -----------------------------------------------------------------------------
// Silent Failure Audit
// No silent failure patterns found.
// Invalid data is rejected before reaching the repository.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Task 6.1
// The InternProvider acts as the application's boundary for incoming
// intern data. Every intern is validated before being stored.
//
// Without this validation, malformed intern objects could enter the
// repository, leading to incorrect calculations, rendering problems,
// or inconsistent application state.
//
// With boundary validation, invalid data is rejected immediately with
// a descriptive error message, ensuring that only valid data is stored.
// -----------------------------------------------------------------------------
