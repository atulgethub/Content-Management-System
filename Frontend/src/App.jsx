import { Routes, Route } from "react-router-dom";

/* ========= LAYOUTS ========= */
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

/* ========= ADMIN PAGES ========= */
import AdminDashboard from "./pages/admin/AdminDashboard";
import CMSManagement from "./pages/admin/CMSManagement";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import UsersManagement from "./pages/admin/UsersManagement";
import AdminBlogs from "./pages/admin/AdminBlogs";

/* ========= USER PAGES ========= */
import UserDashboard from "./pages/user/UserDashboard";
import MyBlogs from "./pages/user/MyBlogs";
import MyReports from "./pages/user/MyReports";
import Profile from "./pages/user/Profile";
import AllBlogs from "./pages/user/AllBlogs";

/* ========= AUTH ========= */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* ========= PROTECTION ========= */
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= ADMIN ================= */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="cms" element={<CMSManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />

        </Route>
      </Route>

      {/* ================= USER ================= */}
      <Route element={<ProtectedRoute role="user" />}>
        <Route path="/user" element={<UserLayout />}>

          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />

          <Route path="blogs" element={<AllBlogs />} />
          <Route path="myblogs" element={<MyBlogs />} />
          <Route path="reports" element={<MyReports />} />
          <Route path="profile" element={<Profile />} />

        </Route>
      </Route>

    </Routes>
  );
}