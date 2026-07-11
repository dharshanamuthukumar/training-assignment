import Avatar from "./Avatar";
import Badge from "./Badge";
import ScoreBar from "./ScoreBar";

interface InternCardProps {
  name: string;
  score: number;
  isPresent: boolean;
  role: string;
}

function InternCard({ name, score, isPresent, role }: InternCardProps) {
  // The Badge component is reusable and avoids repeating the same span
  // markup multiple times. Different labels and colors can be passed as
  // props, making the code cleaner, easier to maintain, and TypeScript
  // ensures every Badge receives the correct props.

  return (
    <div className="card">
      <Avatar name={name} />

      <h2>{name}</h2>

      <ScoreBar score={score} />

      <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
        <Badge label={role} color="#4f46e5" />

        <Badge
          label={isPresent ? "Present" : "Absent"}
          color={isPresent ? "green" : "#e53e3e"}
        />

        {score >= 90 && <Badge label="Top Performer" color="#d97706" />}
      </div>
    </div>
  );
}

export default InternCard;
