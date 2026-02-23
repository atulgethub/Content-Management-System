import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  /* ================= REGISTER ================= */
  const register = async (form) => {
    const res = await API.post("/auth/register", form);

    setUser(res.data.user);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    redirectUser(res.data.user.role);
  };

  /* ================= LOGIN ================= */
  const login = async (form) => {
    const res = await API.post("/auth/login", form);

    setUser(res.data.user);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    redirectUser(res.data.user.role);
  };

  /* ================= REDIRECT ================= */
  const redirectUser = (role) => {
    if (role === "admin") navigate("/admin/dashboard");
    else navigate("/user/dashboard");
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, API }}>
      {children}
    </AuthContext.Provider>
  );
};