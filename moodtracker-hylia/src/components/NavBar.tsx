import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkBase =
    "text-sm font-medium transition-colors hover:opacity-80";

  return (
    <header className="h-16 border-b flex items-center">
      <nav className="max-w-6xl mx-auto w-full flex items-center justify-between px-4">
        <NavLink to="/" className="text-lg font-bold tracking-tight">
          MoodTracker
        </NavLink>

        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "underline" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "underline" : ""}`
            }
          >
            Sobre / FAQ / Contato / Integrantes
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
