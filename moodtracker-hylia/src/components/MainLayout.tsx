import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  

  return (
    <div className="app-shell">
      <header className="app-navbar">
        <div className="app-container flex items-center justify-between">
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:underline ${
                  isActive ? "font-semibold text-[#3691E0]" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:underline ${
                  isActive ? "font-semibold text-[#3691E0]" : ""
                }`
              }
            >
              Sobre / FAQ / Contato
            </NavLink>
          </nav>

           
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="app-container flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="app-footer-inner">
          <span>MoodTracker – Global Solution FIAP 1TDS</span>
          <span>Backend: Java + Quarkus · Frontend: React + Vite + Tailwind</span>
        </div>
        
      </footer>
    </div>
  );
}
