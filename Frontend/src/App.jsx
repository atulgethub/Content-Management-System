import { Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CMSManagement from "./pages/admin/CMSManagement";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import Profile from "./pages/user/Profile";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import MyBlogs from "./pages/user/MyBlogs";
import MyReports from "./pages/user/MyReports";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Route protection
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="cms" element={<CMSManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* User Protected Routes */}
      <Route element={<ProtectedRoute role="user" />}>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="blogs" element={<MyBlogs />} /> {/* Fixed path */}
          <Route path="reports" element={<MyReports />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}