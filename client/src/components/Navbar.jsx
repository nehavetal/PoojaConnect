import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className="nav">
      <h2 className="logo">🔱 PujaConnect</h2>

      <div className="nav-links">

        {/* COMMON */}
        <Link className={isActive("/") ? "active" : ""} to="/">
          Home
        </Link>

        <Link className={isActive("/pandits") ? "active" : ""} to="/pandits">
          Pandits
        </Link>

        {/* USER */}
        {user?.role === "user" && (
          <>
            {/* <Link className={isActive("/book-puja") ? "active" : ""} to="/book-puja">
              Book Puja
            </Link> */}

            <Link className={isActive("/bookings") ? "active" : ""} to="/bookings">
              My Bookings
            </Link>
          </>
        )}

        {/* PANDIT */}
        {user?.role === "pandit" && (
          <>
            <Link className={isActive("/pandit/dashboard") ? "active" : ""} to="/pandit/dashboard">
              Availability
            </Link>

            <Link className={isActive("/pandit/bookings") ? "active" : ""} to="/pandit/bookings">
              My Bookings
            </Link>

            <Link className={isActive("/pandit/profile") ? "active" : ""} to="/pandit/profile">
              Profile
            </Link>
          </>
        )}

        {/* ADMIN */}
        {user?.role === "admin" && (
          <>
            <Link className={isActive("/admin") ? "active" : ""} to="/admin">
              Dashboard
            </Link>

            {/* <Link className={isActive("/admin/pandits") ? "active" : ""} to="/admin/pandits">
              Manage Pandits
            </Link> */}

            <Link className={isActive("/admin/add-pandit") ? "active" : ""} to="/admin/add-pandit">
              Add Pandit
            </Link>

            <Link className={isActive("/admin/bookings") ? "active" : ""} to="/admin/bookings">
              All Bookings
            </Link>
          </>
        )}

        {/* AUTH */}
        {!user ? (
          <Link className="login-btn" to="/login">
            Login
          </Link>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}