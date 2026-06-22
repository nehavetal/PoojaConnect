import { useState } from "react";
import api from "../services/api";

export default function BookingForm({ panditId, onSuccess }) {
  const [form, setForm] = useState({
    date: "",
    timeSlot: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // validation
    if (!form.date || !form.timeSlot || !form.location) {
      alert("Please fill all fields");
      return;
    }

    // IMPORTANT FIX (prevents ":id" crash)
    if (!panditId || panditId === ":id") {
      alert("Invalid Pandit selected");
      return;
    }

    const payload = {
      panditId: panditId,
      date: form.date,
      timeSlot: form.timeSlot,
      location: form.location,
    };

    console.log("Booking Payload:", payload);

    try {
      setLoading(true);

      const res = await api.post("/bookings", payload);

      alert("Booking Confirmed 🔱");

      if (onSuccess) onSuccess(res.data);

      setForm({
        date: "",
        timeSlot: "",
        location: "",
      });
    } catch (err) {
      console.log("Booking Error:", err);

      alert(
        err?.response?.data?.message ||
        "Booking failed. Check backend required fields."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Book Puja 🔱</h2>

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="timeSlot"
        type="time"
        value={form.timeSlot}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="location"
        placeholder="Enter Location"
        value={form.location}
        onChange={handleChange}
        style={styles.input}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !form.date || !form.timeSlot || !form.location}
        style={{
          ...styles.button,
          opacity: loading ? 0.6 : 1,
          cursor:
            loading || !form.date || !form.timeSlot || !form.location
              ? "not-allowed"
              : "pointer",
        }}
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "20px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "8px",
  },
};