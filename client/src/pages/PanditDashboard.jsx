import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PanditDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "pandit") {
    return (
      <div style={styles.denied}>
        ❌ Access Denied
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>🧑‍🕉 Pandit Dashboard</h1>
        <p>Welcome, {user.name}</p>
      </div>

      <div style={styles.grid}>

        {/* Availability Card */}
        <div style={styles.card}>
          <h3>📅 Availability</h3>
          <p>Manage your free time slots for puja bookings</p>

          <button
            style={styles.button}
            onClick={() => navigate("/pandit/availability")}
          >
            Update Availability →
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #f6f7fb, #eef1f7)",
    fontFamily: "Segoe UI, sans-serif",
  },

header: {
  textAlign: "center",
  marginBottom: "25px",
  padding: "20px",
  background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
},

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },

 card: {
  background: "white",
  padding: "22px",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "0.3s",
  cursor: "pointer",
  border: "1px solid #eee",

  width: "100%",        // full stretch inside grid
  maxWidth: "320px",    // LIMIT width (important fix)
  margin: "0 auto",     // center if single card
},

  button: {
    marginTop: "15px",
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #ff7a45, #ff5722)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },

  denied: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    color: "red",
    fontWeight: "bold",
  },
};