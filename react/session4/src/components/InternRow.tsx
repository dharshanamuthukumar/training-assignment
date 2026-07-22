import { useTheme } from "../contexts/theme-context";

interface InternRowProps {
  id: number;
  name: string;
  score: number;
  role?: string;
  isPresent?: boolean;
  onRemove: (id: number) => void;
}

function InternRow({
  id,
  name,
  score,
  role = "Frontend",
  isPresent = true,
  onRemove,
}: InternRowProps) {
  let theme = "light";
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
  } catch {
    // optional fallback
  }

  const isPass = score >= 50;

  return (
    <div
      role="row"
      style={{
        background: theme === "light" ? "#fff" : "#2a2a2a",
        color: theme === "light" ? "#000" : "#eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: "8px",
      }}
    >
      <h3 style={{ margin: "0 8px 0 0" }}>{name}</h3>
      <p style={{ margin: "0 8px 0 0" }}>{name} — {score}</p>
      <p style={{ margin: "0 8px 0 0" }}>Role: {role}</p>
      <span
        className="badge"
        style={{
          display: "inline-block",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "12px",
          background: isPass ? "#d4edda" : "#f8d7da",
          color: isPass ? "#155724" : "#721c24",
          marginRight: "8px",
        }}
      >
        {isPass ? "Pass" : "Fail"}
      </span>
      <p style={{ margin: "0 8px 0 0" }}>{isPresent ? "Present" : "Absent"}</p>

      <button onClick={() => onRemove(id)}>Remove</button>
    </div>
  );
}

export default InternRow;
