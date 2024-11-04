import { NavLink } from "react-router-dom";
import { Coffee } from "lucide-react";

export default function Header() {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto">
          <NavLink to="/" className="flex items-center gap-2">
            <Coffee className="h-6 w-6" />
            <span className="text-xl font-bold">Flavor Fusion</span>
          </NavLink>
          <nav className="flex gap-6">
            <NavLink to="/" className="font-medium">
              Home
            </NavLink>
            <NavLink to="/rezepte" className="font-medium">
              Rezepte
            </NavLink>
            <NavLink to="/uber-uns" className="font-medium">
              Über uns
            </NavLink>
            <NavLink to="/login" className="font-medium">
              Login
            </NavLink>
          </nav>
        </div>
      </header>
    </div>
  );
}
