import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header className="page-header">
        <NavLink to="/">Home</NavLink>
      </header>
      <Outlet />
      <footer className="page-footer">Footer</footer>
    </div>
  );
}
