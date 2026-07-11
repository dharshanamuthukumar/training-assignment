interface Intern {
  id: number;
  name: string;
  score: number;
  isPresent: boolean;
  skills: string[];
}

interface InternProfileProps {
  intern: Intern;
}

function InternProfile({ intern }: InternProfileProps) {
  // The Intern interface defines the structure of an intern object only once.
  // It can be reused in multiple components, improving readability,
  // reducing code duplication, and making maintenance easier if the
  // data structure changes in the future.

  return (
    <div className="card">
      <h2>{intern.name}</h2>
      <p>Score: {intern.score}</p>
      <p>{intern.isPresent ? "Present" : "Absent"}</p>

      <ul>
        {intern.skills.map((skill: string, index: number) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default InternProfile;
