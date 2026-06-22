import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>🔱 PujaConnect</h3>
        <p>Connecting Devotees with Verified Pandits</p>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/book">Book Puja</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} PujaConnect | Made with ❤️ for Devotional Services
        </p>
      </div>
    </footer>
  );
}