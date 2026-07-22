import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface Intern {
  id: number;
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
  addIntern: (intern: Intern) => void;
  removeIntern: (id: number) => void;
}

const InternContext = createContext<InternContextType | null>(null);

const initialInterns: Intern[] = [
  { id: 1, name: "Rahul", score: 92, role: "Frontend", isPresent: true },
  { id: 2, name: "Priya", score: 78, role: "Backend", isPresent: true },
  { id: 3, name: "Amit", score: 45, role: "Frontend", isPresent: false },
  { id: 4, name: "Sneha", score: 95, role: "Fullstack", isPresent: true },
];

export function InternProvider({ children }: { children: ReactNode }) {
  const [interns, setInterns] = useState<Intern[]>(initialInterns);
  const [search, setSearch] = useState<string>("");
  const [isLoading] = useState<boolean>(false);

  function addIntern(intern: Intern): void {
    setInterns((prev) => [...prev, intern]);
  }

  function removeIntern(id: number): void {
    setInterns((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <InternContext.Provider
      value={{ interns, search, setSearch, isLoading, addIntern, removeIntern }}
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
