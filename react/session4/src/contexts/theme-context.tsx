import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// The context is initialized with null because there is no valid
// theme value until a ThemeProvider supplies one.
// This helps detect when the hook is used outside the provider.
const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  function toggleTheme(): void {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  // Throwing an error makes incorrect usage obvious.
  // Returning a default value could hide the mistake and
  // cause the application to behave unexpectedly.
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");

  return context;
}

// Finding:
// Calling useTheme() outside a React function component or a custom hook
// results in an "Invalid hook call" error because React Hooks can only
// be called inside function components or other custom hooks.
