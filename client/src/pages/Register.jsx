import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registered Successfully!");

      setName("");
      setEmail("");
      setPassword("");
      setRole("user");

      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔱 PujaConnect Register</h2>

        <form onSubmit={handleRegister}>
          <input style={styles.input} placeholder="Name"
            value={name} onChange={(e) => setName(e.target.value)} />

          <input style={styles.input} placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <input style={styles.input} type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* FIXED ROLE */}
          <select style={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="pandit">Pandit</option>
            <option value="admin">Admin</option>
          </select>

          <button style={styles.button} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
  },

  card: {
    width: "360px",
    padding: "25px",
    background: "white",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  title: {
    color: "#ff6f00",
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#ff6f00",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  footerText: {
    marginTop: "10px",
    fontSize: "13px",
  },

  link: {
    color: "#ff6f00",
    cursor: "pointer",
    fontWeight: "bold",
  },
};