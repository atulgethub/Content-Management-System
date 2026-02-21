import { Link } from "react-router-dom";

export default function Sidebar({ role }) {

  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "CMS Management", path: "/admin/cms" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Settings", path: "/admin/settings" },
  ];

  const userLinks = [
    { name: "Dashboard", path: "/user" },
    { name: "My CMS", path: "/user/cms" },
    { name: "My Reports", path: "/user/reports" },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen p-5">

      <h1 className="text-xl font-bold mb-8">CMS Dashboard</h1>

      {links.map(link => (
        <Link key={link.name} to={link.path}
          className="block py-3 hover:bg-slate-700 px-3 rounded">
          {link.name}
        </Link>
      ))}
    </div>
  );
}