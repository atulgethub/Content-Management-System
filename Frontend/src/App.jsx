import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CMSManagement from "./pages/admin/CMSManagement";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

import UserDashboard from "./pages/user/UserDashboard";
import MyCMS from "./pages/user/MyCMS";
import MyReports from "./pages/user/MyReports";

import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/user/Profile";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="cms" element={<CMSManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* USER */}
      <Route element={<ProtectedRoute role="user" />}>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="cms" element={<MyCMS />} />
          <Route path="reports" element={<MyReports />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

    </Routes>
  );
}