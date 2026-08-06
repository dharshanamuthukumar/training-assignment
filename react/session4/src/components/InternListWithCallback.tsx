import { useCallback } from "react";
import { useInterns } from "../contexts/intern-context";
import InternRow from "./InternRow";

function InternListWithCallback() {
  const ctx = useInterns();
  const { removeIntern } = ctx;
  // Support mocks that only provide `interns` (without filteredInterns)
  const filtered: typeof ctx.interns =
    (ctx as any).filteredInterns ?? ctx.interns ?? [];

  const handleRemove = useCallback(
    (id: number): void => {
      removeIntern(id);
    },
    [removeIntern],
  );

  if (filtered.length === 0) {
    return (
      <div style={{ marginTop: "16px" }}>
        <p>No interns found</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "16px" }}>
      {filtered.map((i) => (
        <InternRow
          key={i.id}
          id={i.id}
          name={i.name}
          score={i.score}
          role={i.role}
          isPresent={i.isPresent}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}

export default InternListWithCallback;
