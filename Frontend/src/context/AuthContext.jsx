import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Axios instance
  const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // send cookies/session
  });

  // ---- REGISTER ----
  const register = async (form) => {
    try {
      const res = await API.post("/auth/register", form);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // ---- LOGIN ----
  const login = async (form) => {
    try {
      const res = await API.post("/auth/login", form);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // ---- LOGOUT ----
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // ---- Axios interceptor to add token ----
  API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <AuthContext.Provider value={{ user, register, login, logout, API }}>
      {children}
    </AuthContext.Provider>
  );
};