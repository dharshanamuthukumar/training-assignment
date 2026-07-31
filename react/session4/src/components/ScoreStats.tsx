import { useEffect, useState } from "react";

interface Intern {
  id: number;
  name: string;
  score: number;
}

function ScoreStats() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInterns([
        { id: 1, name: "Rahul", score: 92 },
        { id: 2, name: "Priya", score: 78 },
      ]);

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <p>Loading interns...</p>;
  }

  return (
    <div>
      <h2>Intern Scores</h2>

      {interns.map((intern) => (
        <div key={intern.id}>
          <p>{intern.name}</p>
          <p>Score: {intern.score}</p>
        </div>
      ))}
    </div>
  );
}

export default ScoreStats;
