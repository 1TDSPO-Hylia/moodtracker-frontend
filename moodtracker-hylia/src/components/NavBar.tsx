import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkBase =
    "text-sm font-medium transition-colors hover:opacity-80";

  return (
    <header className="app-navbar">
      <nav className="app-container w-full flex items-center justify-between">
        <NavLink
          to="/"
          className="text-lg font-bold tracking-tight text-[#3691E0]"
        >
          MoodTracker
        </NavLink>

        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive ? "text-[#3691E0]" : "text-slate-200"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive ? "text-[#3691E0]" : "text-slate-200"
              }`
            }
          >
            Sobre
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
