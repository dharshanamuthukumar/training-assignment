import { createContext, useContext, useState, ReactNode } from "react";

export interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

interface NewIntern {
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

export interface InternContextType {
  interns: Intern[];
  search: string;
  setSearch: (value: string) => void;
  isLoading: boolean;
  addIntern: (intern: NewIntern) => void;
  removeIntern: (id: number) => void;
}

interface InternProviderProps {
  children: ReactNode;
  generateId?: () => number;
}

const InternContext = createContext<InternContextType | null>(null);

const initialInterns: Intern[] = [
  { id: 1, name: "Rahul", score: 92, role: "Frontend", isPresent: true },
  { id: 2, name: "Priya", score: 78, role: "Backend", isPresent: true },
  { id: 3, name: "Amit", score: 45, role: "Frontend", isPresent: false },
  { id: 4, name: "Sneha", score: 95, role: "Fullstack", isPresent: true },
];

export function InternProvider({
  children,
  generateId = () => Date.now(),
}: InternProviderProps) {
  const [interns, setInterns] = useState<Intern[]>(initialInterns);
  const [search, setSearch] = useState("");
  const [isLoading] = useState(false);

  function addIntern(intern: NewIntern): void {
    const newIntern: Intern = {
      id: generateId(),
      ...intern,
    };

    setInterns((prev) => [...prev, newIntern]);
  }

  function removeIntern(id: number): void {
    setInterns((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <InternContext.Provider
      value={{
        interns,
        search,
        setSearch,
        isLoading,
        addIntern,
        removeIntern,
      }}
    >
      {children}
    </InternContext.Provider>
  );
}

export function useInterns(): InternContextType {
  const context = useContext(InternContext);

  if (!context) {
    throw new Error("useInterns must be used inside InternProvider");
  }

  return context;
}

// Task 1.1
// Testability audit — intern-context.tsx
// Q1 Predictable output? PARTIALLY — depends on React Context state.
// Q2 No external deps? PARTIALLY — relies on React Context.
// Q3 Dependencies injectable? YES — generateId can now be injected.
// Verdict: MODERATELY TESTABLE

// Task 5.1
// Injecting generateId makes the provider easier to test. Tests can supply a
// fixed ID generator so results are deterministic and repeatable, while the
// default behavior still works normally in production.
