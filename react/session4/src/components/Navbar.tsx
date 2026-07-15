import { useTheme } from "../contexts/theme-context";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        background: theme === "light" ? "#f5f5f5" : "#1a1a1a",
        color: theme === "light" ? "#000" : "#fff",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>Intern Dashboard</span>

      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
}

export default Navbar;
