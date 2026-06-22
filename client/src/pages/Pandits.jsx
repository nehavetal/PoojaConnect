import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "./pandits.css";

export default function Pandits() {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPandits();
  }, []);

  const fetchPandits = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/pandits");

      console.log("Pandits API Response:", res.data);

      console.log("PANDITS LENGTH:", res.data.length);
      console.log("FIRST PANDIT:", res.data[0]);
      // safety check
      if (Array.isArray(res.data)) {
        setPandits(res.data);
      } else {
        setPandits([]);
      }

    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
      setError("Failed to load pandits. Please check backend API.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="panditPage">⏳ Loading pandits...</p>;
  }

  if (error) {
    return <p className="panditPage error">{error}</p>;
  }

  return (
    <div className="panditPage">
      <h2 className="title">🙏 Available Verified Pandits</h2>
      <p className="subtitle">
        Choose experienced pandits for your puja, havan & rituals
      </p>

      {pandits.length === 0 ? (
        <div className="empty">
          <p>🚫 No pandits available</p>
          <small>Admin needs to add pandits first</small>
        </div>
      ) : (
        <div className="grid">
          {pandits.map((p) => (
            <div className="pandit-card" key={p._id}>
              <div className="avatar">🔱</div>

              <h3>{p.name}</h3>
              <p className="location">📍 {p.location}</p>

              <p>⭐ {p.experience} Years Experience</p>
              <p>💰 ₹{p.price}</p>

              <div className="info">
                <span>✔ Verified</span>
                <span>🕉 Trusted</span>
              </div>

              <div className="actions">
                <Link to={`/pandit/${p._id}`} className="btn">
                  View Profile
                </Link>

                {/* <Link to="/book-puja/:id" className="btn book">
                  Book Puja
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}