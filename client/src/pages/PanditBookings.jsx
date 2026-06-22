import { useEffect, useState } from "react";
import api from "../services/api";

const getStatusStyle = (status) => {
  return {
    display: "inline-block",
    marginTop: "8px",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    textTransform: "capitalize",
    background:
      status === "pending"
        ? "#ffeaa7"
        : status === "approved"
        ? "#55efc4"
        : "#ff7675",
    color: "#2d3436",
  };
};

export default function PanditBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/bookings");
      setBookings(res.data);

    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      await api.patch(`/bookings/${id}/status`, { status });

      fetchBookings();

    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📩 Incoming Bookings</h2>

      {loading ? (
        <p style={styles.empty}>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p style={styles.empty}>No bookings found</p>
      ) : (
        <div style={styles.grid}>
          {bookings.map((b) => (
            <div key={b._id} style={styles.card}>
              
              <p><b>User:</b> {b.userId?.name}</p>
              <p><b>Location:</b> {b.location}</p>

              <p>
                <b>Date:</b>{" "}
                {new Date(b.date).toLocaleDateString()}
              </p>

              <p><b>Time:</b> {b.timeSlot}</p>

              <span style={getStatusStyle(b.status)}>
                {b.status}
              </span>

              <div style={styles.btnWrap}>
                <button
                  style={styles.accept}
                  disabled={updatingId === b._id || b.status !== "pending"}
                  onClick={() => updateStatus(b._id, "approved")}
                >
                  {updatingId === b._id ? "Updating..." : "Accept"}
                </button>

                <button
                  style={styles.reject}
                  disabled={updatingId === b._id || b.status !== "pending"}
                  onClick={() => updateStatus(b._id, "rejected")}
                >
                  {updatingId === b._id ? "Updating..." : "Reject"}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "24px",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f6f7fb, #eef1f7)",
    fontFamily: "Arial",
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#222",
  },

  empty: {
    color: "#777",
    fontSize: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  },

  card: {
    background: "#fff",
    padding: "18px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
  },

  btnWrap: {
    marginTop: "12px",
    display: "flex",
    gap: "10px",
  },

  accept: {
    background: "#00b894",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  reject: {
    background: "#d63031",
    color: "#fff",
    border: "none",
    padding: "7px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};