import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RoleRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  if (user.role !== role)
    return <Navigate to={`/${user.role}/dashboard`} />;

  return children;
}