// src/layouts/MainLayout.tsx (ou onde estiver)
import { Outlet, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function MainLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`app-shell ${
        theme === "dark" ? "theme-dark" : "theme-light"
      }`}
    >
      <header className="app-navbar">
        <div className="app-container flex items-center justify-between">
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" className="hover:underline">
              Home
            </NavLink>
            <NavLink to="/sobre" className="hover:underline">
              Sobre / FAQ / Contato
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            className="text-xs app-chip"
          >
            {theme === "dark" ? "Tema claro" : "Tema escuro"}
          </button>
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
          <span>Backend: Java + Quarkus · Frontend: React + Vite + Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
