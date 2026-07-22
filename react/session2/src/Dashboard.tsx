interface Intern {
  id: number;
  name: string;
  score: number;
  isPresent: boolean;
  role: string;
}

import Card from "./Card";
import InternCard from "./InternCard";

const interns: Intern[] = [
  { id: 1, name: "Rahul", score: 92, isPresent: true, role: "Frontend" },
  { id: 2, name: "Priya", score: 78, isPresent: true, role: "Backend" },
  { id: 3, name: "Amit", score: 45, isPresent: false, role: "Frontend" },
  { id: 4, name: "Sneha", score: 95, isPresent: true, role: "Fullstack" },
];

function Dashboard(): JSX.Element {
  const total: number = interns.length;

  const present: number = interns.filter(
    (intern: Intern) => intern.isPresent,
  ).length;

  const totalScore: number = interns.reduce(
    (sum: number, intern: Intern) => sum + intern.score,
    0,
  );

  const averageScore: number = totalScore / total;

  return (
    <Card title="Intern Dashboard">
      <p>
        <strong>
          Total: {total} | Present: {present} | Avg Score:{" "}
          {averageScore.toFixed(2)}
        </strong>
      </p>

      {interns.map(
        (intern: Intern): JSX.Element => (
          <InternCard
            key={intern.id}
            name={intern.name}
            score={intern.score}
            isPresent={intern.isPresent}
            role={intern.role}
          />
        ),
      )}
    </Card>
  );
}

export default Dashboard;
