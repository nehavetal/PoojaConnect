import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <h1>🔱 Find Trusted Pandits Online</h1>

        <p>
          Book verified Pandits for Satyanarayan Katha, Griha Pravesh,
          Havan, Naamkaran, Mundan & more — all in one place.
        </p>

        <Link to="/pandits" className="btn">
          Explore Pandits
        </Link>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="card">
          <h3>✔ Verified Pandits</h3>
          <p>All pandits are verified for authenticity and experience.</p>
        </div>

        <div className="card">
          <h3>📅 Easy Booking</h3>
          <p>Choose date, time & puja type in just a few clicks.</p>
        </div>

        <div className="card">
          <h3>💰 Transparent Pricing</h3>
          <p>No hidden charges. Clear pricing for every ritual.</p>
        </div>

        <div className="card">
          <h3>📍 Local Availability</h3>
          <p>Find pandits near your city and preferred language.</p>
        </div>
      </section>

      {/* BANNER */}
      <section className="banner">
        <h2>🙏 Bring Spiritual Peace to Your Home</h2>
        <p>Book puja services anytime, anywhere with ease.</p>
      </section>

    </div>
  );
}