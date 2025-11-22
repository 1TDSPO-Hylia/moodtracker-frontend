// src/layouts/MainLayout.tsx
import { Outlet, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function MainLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app-shell ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      <header className="app-navbar">
        <div className="app-container flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">MoodTracker</span>
            <span className="text-[11px] text-muted-foreground">
              Monitoramento de humor e risco de burnout
            </span>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" className="hover:underline">
              Home
            </NavLink>
            <NavLink to="/sobre" className="hover:underline">
              Sobre / FAQ / Contato
            </NavLink>

            <button
              type="button"
              onClick={toggleTheme}
              className="ml-4 app-chip text-xs"
            >
              {theme === "dark" ? "Tema claro" : "Tema escuro"}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="app-container">
          <Outlet />
        </div>
      </main>

      <footer className="app-footer">
        <div className="app-footer-inner">
          <span>MoodTracker – Global Solution FIAP</span>
          <span>Java + Quarkus · Oracle · React + Vite + Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
