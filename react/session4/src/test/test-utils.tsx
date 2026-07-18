import { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "../contexts/theme-context";
import { InternProvider } from "../contexts/intern-context";

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <InternProvider>{children}</InternProvider>
    </ThemeProvider>
  );
}

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  });
}

export * from "@testing-library/react";
export { customRender as render };
