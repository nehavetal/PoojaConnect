export default function Loader() {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading PujaConnect...</p>

      {/* spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  overlay: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #fff3e0, #ffffff)",
  },

  spinner: {
    width: "60px",
    height: "60px",
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #ff9800",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  text: {
    marginTop: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#ff5722",
  },
};