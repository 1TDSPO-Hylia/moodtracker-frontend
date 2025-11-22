import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./NavBar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
