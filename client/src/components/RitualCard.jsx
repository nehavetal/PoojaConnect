export default function RitualCard({ ritual }) {
  if (!ritual) return null;

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{ritual.name}</h3>

      <p style={styles.text}>{ritual.description}</p>

      <p style={styles.text}>
        Duration: {ritual.duration}
      </p>

      <p style={styles.price}>
        Price: ₹{ritual.price}
      </p>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    margin: "10px",
  },

  title: {
    marginBottom: "8px",
    color: "#333",
  },

  text: {
    margin: "4px 0",
    color: "#555",
  },

  price: {
    marginTop: "8px",
    fontWeight: "bold",
    color: "#ff9800",
  },
};