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

// Seperation of concerns
// Job: "This component displays summary statistics about interns."
// Concerns mixed : None (or mention if it calculates statistics itself)

// A presentational component should not import the service layer directly.
// The container component or context should call the service and pass the
// required data as props. This keeps the UI component focused only on
// displaying data and maintains separation of concerns.

// If a presentational component imports services directly, its tests need
// to mock the service layer and become coupled to business logic.
// If the container calls the service and passes props, the component can be
// tested with simple input props without mocking anything, making tests
// simpler and more reliable.

//after refactor
// "SummaryBar.tsx displays summary information received through props."