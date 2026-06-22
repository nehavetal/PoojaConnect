import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { user, token } = res.data;

      if (!user || !token) {
        alert("Invalid server response");
        return;
      }

      // 🔥 LOGIN (store role properly)
      login(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token
      );

      // reset form
      setEmail("");
      setPassword("");

      // 🔥 ROLE BASED REDIRECT (ONLY ONE PLACE)
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "pandit") {
        navigate("/pandit/dashboard");
      }
       else {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>🔱 PujaConnect</h2>
        <p>Welcome back! Please login</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="bottom-text">
          Don’t have account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}