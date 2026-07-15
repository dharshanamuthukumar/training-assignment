import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

interface InternContextType {
  interns: Intern[];
  isLoading: boolean;
  addIntern: (intern: Intern) => void;
  removeIntern: (id: number) => void;
}

const InternContext = createContext<InternContextType | null>(null);

export function InternProvider({ children }: { children: ReactNode }) {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setInterns([
        { id: 1, name: "Rahul", score: 92, role: "Frontend", isPresent: true },
        { id: 2, name: "Priya", score: 78, role: "Backend", isPresent: true },
        { id: 3, name: "Amit", score: 45, role: "Frontend", isPresent: false },
        { id: 4, name: "Sneha", score: 95, role: "Fullstack", isPresent: true },
      ]);

      setIsLoading(false);
    }, 800);
  }, []);

  function addIntern(intern: Intern): void {
    setInterns((prev) => [...prev, intern]);
  }

  function removeIntern(id: number): void {
    setInterns((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <InternContext.Provider
      value={{ interns, isLoading, addIntern, removeIntern }}
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
