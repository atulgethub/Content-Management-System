import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-slate-100">
        <Navbar />
        <div className="p-6">
          <Outlet /> {/* This renders nested user routes */}
        </div>
      </div>
    </div>
  );
}