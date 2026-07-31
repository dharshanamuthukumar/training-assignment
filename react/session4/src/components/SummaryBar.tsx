import { useInterns } from "../contexts/intern-context";

interface SummaryBarProps {
  total: number;
  presentCount: number;
  averageScore: number;
}

// Presentational Component
export function SummaryBar({
  total,
  presentCount,
  averageScore,
}: SummaryBarProps) {
  return (
    <div>
      <p>Total Interns: {total}</p>
      <p>Present: {presentCount}</p>
      <p>Average Score: {averageScore}</p>
    </div>
  );
}

// Container Component
export function SummaryBarContainer() {
  const { interns } = useInterns();

  const total = interns.length;

  const presentCount = interns.filter((intern) => intern.isPresent).length;

  const averageScore =
    interns.length > 0
      ? Math.round(
          interns.reduce((sum, intern) => sum + intern.score, 0) /
            interns.length,
        )
      : 0;

  return (
    <SummaryBar
      total={total}
      presentCount={presentCount}
      averageScore={averageScore}
    />
  );
}
