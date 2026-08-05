// Code smell audit
// Smell 1: Mixed responsibilities — InternProvider manages React state while also performing business operations such as creating and validating interns.
// Smell 2: Duplicate validation logic — validateIntern() repeats validation that should ideally exist in a single validation/service layer.
// Smell 3: Hardcoded seed data — INITIAL_INTERNS contains embedded sample data instead of loading it from a dedicated data source or configuration.
import { createContext, ReactNode, useContext, useState } from "react";
import { useInternRepository } from "../repositories/intern-repository";
import {
  createIntern,
  calculateAverageScore,
  filterInterns,
  validateInternForm,
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

function validateIntern(intern: Intern): Intern {
  const error = validateInternForm(intern.name, intern.score);

  if (error) {
    throw new Error(`validateIntern: ${error}`);
  }

  return intern;
}
// Duplication removal reflection:
// The validation logic for checking an intern's name and score existed in both
// intern-validation.ts and intern-context.tsx.
// Leaving duplicated validation increases the risk of inconsistent behavior if the
// validation rules change in one place but not the other.
// Reusing validateInternForm() creates a single source of truth and makes future
// validation changes easier to maintain.

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
// Refactoring priority:
// I would remove the duplicate validation logic first because having validation rules in multiple places can lead to inconsistent behavior if one copy is updated and the other is forgotten.