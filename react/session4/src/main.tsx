import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { ThemeProvider } from "./contexts/theme-context";
import { InternProvider } from "./contexts/intern-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <InternProvider>
        <App />
      </InternProvider>
    </ThemeProvider>
  </StrictMode>,
);
