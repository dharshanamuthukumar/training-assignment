import { useCallback } from "react";
import { useInterns } from "../contexts/intern-context";
import InternRow from "./InternRow";

function InternListWithCallback() {
  const { interns, search, removeIntern } = useInterns();

  const handleRemove = useCallback(
    (id: number): void => {
      removeIntern(id);
    },
    [removeIntern],
  );

  const query = (search || "").toLowerCase().trim();
  const filtered = interns.filter(
    (i) =>
      i.name.toLowerCase().includes(query) ||
      (i.role && i.role.toLowerCase().includes(query)),
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
