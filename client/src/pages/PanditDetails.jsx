import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./panditDetails.css";

export default function PanditDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pandit, setPandit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPandit();
  }, [id]);

  const fetchPandit = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(`/pandits/${id}`);

      console.log("Pandit Details:", res.data);

      if (res.data) {
        setPandit(res.data);
      } else {
        setPandit(null);
      }

    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
      setError("Failed to load pandit details");
      setPandit(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="pd-page">⏳ Loading Pandit Details...</p>;
  }

  // if (error) {
  //   return <p className="pd-page error">❌ {error}</p>;
  // }

  if (!pandit) {
    return <p className="pd-page">🚫 Pandit not found</p>;
  }

  return (
    <div className="pd-page">
      <h1 className="title">🕉 Pandit Profile</h1>

      <div className="card">
        <div className="avatar">🔱</div>

        <h2>{pandit.name}</h2>

        <div className="info">
          <p>📍 {pandit.location}</p>
          <p>⭐ {pandit.experience} Years Experience</p>
          <p>🗣 {pandit.languages?.join(", ") || "Not specified"}</p>
          <p>💰 ₹{pandit.price}</p>
        </div>

        <div className="tags">
          <span>✔ Verified</span>
          <span>🙏 Trusted</span>
          <span>🕉 Experienced</span>
        </div>

       <button
  className="btn"
  onClick={() => navigate(`/book-puja/${id}`)}
>
  Book Puja
</button>
      </div>
    </div>
  );
}