import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // ================= ADMIN LINKS =================
  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "All Blogs", path: "/admin/blogs" },
    { name: "Users Management", path: "/admin/users" },
    { name: "CMS Management", path: "/admin/cms" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Settings", path: "/admin/settings" },
    { name: "Profile", path: "/admin/profile" },
  ];

  // ================= USER LINKS =================
  const userLinks = [
    { name: "Dashboard", path: "/user" },
    { name: "All Blogs", path: "/user/blogs" },
    { name: "My Blogs", path: "/user/myblogs" },
    { name: "My Reports", path: "/user/reports" },
    { name: "Profile", path: "/user/profile" },
  ];

  const links = user?.role === "admin" ? adminLinks : userLinks;

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col p-6">

      {/* LOGO */}
      <h1 className="text-2xl font-bold mb-10">
        CMS Dashboard
      </h1>

      {/* MENU */}
      <div className="flex-1 space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`block px-4 py-3 rounded transition ${
              location.pathname === link.path
                ? "bg-slate-700"
                : "hover:bg-slate-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* USER INFO */}
      <div className="border-t border-slate-700 pt-4">
        <p className="text-sm">Logged in as</p>
        <p className="font-semibold capitalize">
          {user?.role}
        </p>

        <button
          onClick={logout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 p-2 rounded"
        >
          Logout
        </button>
      </div>

    </div>
  );
}