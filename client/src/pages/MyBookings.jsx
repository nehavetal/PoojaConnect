import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/bookings");

      const userBookings = res.data.filter(
        (b) => b.userId?._id === user?.id
      );

      setBookings(userBookings);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div style={styles.page}>
      <h2>🕉 My Bookings</h2>

      {loading ? (
        <p style={{ color: "#ff5722", fontWeight: "bold" }}>
          ⏳ Loading your bookings...
        </p>
      ) : bookings.length === 0 ? (
        <p style={styles.empty}>😔 No bookings found yet</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i} style={styles.card}>
            <h3>📅 Booking {i + 1}</h3>

            <p><b>Date:</b> {b.date}</p>
            <p><b>Time:</b> {b.timeSlot}</p> {/* FIXED */}
            <p><b>Location:</b> {b.location}</p>
            <p><b>Status:</b> {b.status}</p>
            <p><b>Pandit:</b> {b.panditId?.name}</p>
          </div>
        ))
      )}

      <button onClick={loadBookings} style={styles.button}>
        Refresh
      </button>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px 20px",
    background: "linear-gradient(135deg, #fff5f2, #ffe9e3)",
    minHeight: "100vh",
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "25px",
    color: "#222",
  },

  card: {
    background: "white",
    padding: "22px",
    margin: "18px auto",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(255,87,34,0.15)",
    maxWidth: "450px",
    textAlign: "left",
    borderLeft: "6px solid #ff5722",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  cardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 18px 40px rgba(255,87,34,0.25)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: "8px 0",
    fontSize: "14px",
    color: "#444",
  },

  label: {
    fontWeight: "600",
    color: "#222",
  },

  badge: {
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    color: "white",
    display: "inline-block",
  },

  empty: {
    color: "#777",
    marginTop: "25px",
    fontSize: "16px",
  },

  button: {
    marginTop: "30px",
    padding: "12px 22px",
    border: "none",
    borderRadius: "12px",
    background: "#ff5722",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(255,87,34,0.3)",
    transition: "0.3s",
  },
};