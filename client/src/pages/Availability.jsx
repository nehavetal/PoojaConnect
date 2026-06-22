import { useState } from "react";
import api from "../services/api";

export default function Availability() {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!date || !slot) {
      alert("Please select date and slot");
      return;
    }

    try {
      setLoading(true);

      await api.post("/availability", {
        date,
        slot,
      });

      alert("Availability updated successfully!");

      setDate("");
      setSlot("");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to update availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>📅 Set Availability</h2>

        <form onSubmit={handleSave}>
          
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />

          <label>Time Slot</label>
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Slot</option>
            <option value="Morning 8-10">Morning 8-10</option>
            <option value="Morning 10-12">Morning 10-12</option>
            <option value="Evening 5-7">Evening 5-7</option>
            <option value="Evening 7-9">Evening 7-9</option>
          </select>

          <button style={styles.button} disabled={loading}>
            {loading ? "Saving..." : "Save Availability"}
          </button>

        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f6f7fb",
  },

  card: {
    width: "350px",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#f59332",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};