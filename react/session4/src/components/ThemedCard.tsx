import { useTheme } from "../contexts/theme-context";

interface ThemedCardProps {
  name: string;
  score: number;
}

function ThemedCard({ name, score }: ThemedCardProps) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        background: theme === "light" ? "#ffffff" : "#2a2a2a",
        color: theme === "light" ? "#000" : "#eee",
        border: `1px solid ${theme === "light" ? "#ddd" : "#444"}`,
        padding: "12px",
        margin: "8px 0",
        borderRadius: "4px",
      }}
    >
      <h3>{name}</h3>

      <p>Score: {score}</p>

      <p style={{ color: score >= 50 ? "green" : "red" }}>
        {score >= 50 ? "Pass" : "Fail"}
      </p>
    </div>
  );
}

export default ThemedCard;
