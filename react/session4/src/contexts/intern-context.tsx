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

// After refactoring, InternProvider only wires the service and repository
// layers together, so it is much smaller.
// Yes, intern ID generation can now be changed without modifying
// intern-context.tsx — change createIntern in intern-service.ts instead.
// "intern-context.tsx wires the service and repository layers together into a context value."
