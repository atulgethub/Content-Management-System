import { Routes, Route } from "react-router-dom";

// AUTH
import Login from "./pages/Login";
import Register from "./pages/Register";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CMSManagement from "./pages/admin/CMSManagement";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import MyCMS from "./pages/user/MyCMS";
import MyReports from "./pages/user/MyReports";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* ========= AUTH ========= */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ========= ADMIN ========= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="cms" element={<CMSManagement />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ========= USER ========= */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="cms" element={<MyCMS />} />
        <Route path="reports" element={<MyReports />} />
      </Route>

    </Routes>
  );
}