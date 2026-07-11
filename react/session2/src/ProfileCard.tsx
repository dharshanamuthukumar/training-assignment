interface ProfileCardProps {
  name?: string;
  role?: string;
  score?: number;
  skills?: string[];
}

function ProfileCard({
  name = "Unknown",
  role = "Intern",
  score = 0,
  skills = [],
}: ProfileCardProps) {
  // If the default value "skills = []" is removed, TypeScript shows:
  // 'skills' is possibly 'undefined'.
  // This happens because 'skills' is an optional prop. Providing an empty
  // array as the default ensures that methods like .length and .map can be
  // used safely without causing runtime errors.

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score}</p>

      {skills.length > 0 && (
        <ul>
          {skills.map((skill: string, index: number) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfileCard;
