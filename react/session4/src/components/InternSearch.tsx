import { useInterns } from "../contexts/intern-context";
import useInternSearch from "../hooks/useInternSearch";

function InternSearch() {
  const { interns } = useInterns();

  const { search, setSearch, filtered, stats } = useInternSearch(interns);

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Search interns..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ margin: "12px 0" }}>
        <p>Total Interns: {stats.total}</p>
        <p>Present: {stats.present}</p>
        <p>Average Score: {stats.avg}</p>
      </div>

      <h3>Filtered Interns</h3>

      {filtered.map((intern) => (
        <div
          key={intern.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "8px",
          }}
        >
          <p>
            <strong>{intern.name}</strong>
          </p>
          <p>Role: {intern.role}</p>
          <p>Score: {intern.score}</p>
          <p>{intern.isPresent ? "Present" : "Absent"}</p>
        </div>
      ))}
    </div>
  );
}

export default InternSearch;
// Without useMemo, the statistics would be recalculated on every component
// render, even if the interns array had not changed. This is wasteful because
// the calculations are repeated unnecessarily. useMemo caches the result and
// only recalculates it when the interns dependency changes.
