import { useMemo } from "react";
import { useInterns } from "../contexts/intern-context";

function ScoreStats() {
  const { interns } = useInterns();

  // useMemo recalculates the statistics only when the interns array changes.
  // Without useMemo, these calculations would run on every render, even when
  // the intern data has not changed, which can be wasteful for large datasets.
  const stats = useMemo(() => {
    console.log("Recalculating stats...");

    const scores = interns.map((i) => i.score);

    return {
      highest: scores.length > 0 ? Math.max(...scores) : 0,
      lowest: scores.length > 0 ? Math.min(...scores) : 0,
      average:
        scores.length > 0
          ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          : 0,
      passing: interns.filter((i) => i.score >= 50).length,
    };
  }, [interns]);

  return (
    <div
      style={{
        padding: "12px",
        background: "#f9f9f9",
        marginBottom: "12px",
      }}
    >
      <p>
        Highest: {stats.highest} | Lowest: {stats.lowest} | Avg: {stats.average}
      </p>

      <p>
        Passing: {stats.passing} of {interns.length}
      </p>
    </div>
  );
}

export default ScoreStats;
