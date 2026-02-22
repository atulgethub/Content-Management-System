import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex">

      <Sidebar role="user" />

      <div className="flex-1 bg-slate-100 min-h-screen">

        <Navbar />

        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}