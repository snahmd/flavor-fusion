import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
      <footer className="page-footer">Footer</footer>
    </div>
  );
}
