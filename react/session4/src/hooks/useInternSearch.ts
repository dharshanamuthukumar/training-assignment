// Code smell audit 
// Smell 1: Duplicate business logic — average score calculation is implemented here instead of reusing a shared service function.
// Smell 2: Inline statistics calculation — stats object contains multiple calculations inside useMemo(), making it harder to extend or test independently.
// Smell 3: Primitive obsession — stats is returned as an anonymous object instead of using a dedicated Stats type/interface.
import { useMemo, useState } from "react";
import { filterInterns } from "../utils/intern-utils";

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

interface UseInternSearchReturn {
  search: string;
  setSearch: (value: string) => void;
  filtered: Intern[];
  stats: {
    total: number;
    present: number;
    avg: number;
  };
}

function useInternSearch(
  interns: Intern[],
  filter: typeof filterInterns = filterInterns,
): UseInternSearchReturn {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => filter(interns, search),
    [interns, search, filter],
  );

  const stats = useMemo(
    () => ({
      total: interns.length,
      present: interns.filter((intern) => intern.isPresent).length,
      // Rename audit:
      // Old name: i
      // New name: intern
      // Reason: "intern" clearly describes the object being processed, while "i" requires the reader to infer its meaning from context.
      avg:
        interns.length > 0
          ? Math.round(
              interns.reduce((sum, intern) => sum + intern.score, 0) /
                interns.length,
            )
          : 0,
    }),
    [interns],
  );

  return {
    search,
    setSearch,
    filtered,
    stats,
  };
}

export default useInternSearch;
// Refactoring priority:
// I would extract the statistics calculation into a shared service/helper function first.
// This removes duplicated business logic, improves reusability, and makes the hook focus only on search state.