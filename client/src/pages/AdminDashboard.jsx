import { useEffect, useState } from "react";
import api from "../services/api";
import "./adminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    pandits: 0,
    bookings: 0,
    pending: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/admin/stats");

      console.log("Admin Stats API:", res.data);

      const data = res.data || {};

      setStats({
      users: res.data?.users || 0,
      pandits: res.data?.pandits || 0,
      bookings: res.data?.bookings || 0,
      pending: res.data?.pending || 0,
    });

    } catch (err) {
      console.log("Dashboard Error:", err.response?.data || err.message);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">🛕 Admin Dashboard</h1>

      {loading ? (
        <p className="loading">⏳ Loading dashboard...</p>
      ) : error ? (
        <p className="error">❌ {error}</p>
      ) : (
        <div className="admin-grid">

          <div className="card users">
            👤 Users
            <h2>{stats.users}</h2>
          </div>

          <div className="card pandits">
            🧑‍🕉️ Pandits
            <h2>{stats.pandits}</h2>
          </div>

          <div className="card bookings">
            📅 Bookings
            <h2>{stats.bookings}</h2>
          </div>

          <div className="card pending">
            ⏳ Pending
            <h2>{stats.pending}</h2>
          </div>

        </div>
      )}
    </div>
  );
}