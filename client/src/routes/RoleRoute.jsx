import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RoleRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  // 🔥 while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  // 🔥 not logged in → login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 role check safety (avoid crash if role missing)
  if (!user.role || user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // 🔥 allow access
  return children;
}