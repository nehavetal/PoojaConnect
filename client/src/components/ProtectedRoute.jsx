import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    user = null;
  }

  // ❌ not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ invalid user data safety
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ role mismatch
  if (role && user.role !== role) {
    return <h2 style={{ padding: "20px" }}>🚫 Access Denied</h2>;
  }

  return children;
}