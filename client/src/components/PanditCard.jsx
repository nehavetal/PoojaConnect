import { Link } from "react-router-dom";
import "./card.css";

export default function PanditCard({ pandit }) {
  if (!pandit) return null; // FIX: prevent broken UI

  return (
    <div className="card">
      
      {/* Name */}
      <h3>{pandit.name}</h3>

      {/* Location */}
      <p>📍 {pandit.location}</p>

      {/* Experience */}
      <p>⭐ {pandit.experience} Years Experience</p>

      {/* Price */}
      <p>💰 ₹{pandit.price}</p>

      {/* Link */}
      <Link className="btn" to={`/pandit/${pandit._id}`}>
        View Details
      </Link>
    </div>
  );
}