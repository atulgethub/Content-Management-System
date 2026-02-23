import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 ml-64">

        {/* NAVBAR */}
        <div className="fixed top-0 left-64 right-0 z-50">
          <Navbar />
        </div>

        {/* PAGE CONTENT */}
        <main className="mt-16 p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <Outlet />
        </main>

      </div>
    </div>
  );
}