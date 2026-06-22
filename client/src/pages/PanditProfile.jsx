import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function PanditProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await api.get("/pandits/me");
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();   // ✔️ direct call
}, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  if (!profile) return <p style={{ padding: "20px" }}>No profile found</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>🧑‍🕉️ Pandit Profile</h2>

        <p><b>Name:</b> {profile.name}</p>
        {/* <p><b>Email:</b> {profile.email}</p> */}
        <p><b>Location:</b> {profile.location}</p>
        <p><b>Experience:</b> {profile.experience} years</p>
        <p><b>Price:</b> ₹{profile.price}</p>

        <button style={styles.btn}>Edit Profile</button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
    minHeight: "100vh",
    background: "#f5f6fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  btn: {
    marginTop: "15px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    background: "rgb(241, 141, 65)",
    color: "#fff",
    cursor: "pointer",
  },
};