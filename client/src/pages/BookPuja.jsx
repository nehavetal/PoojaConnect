import { useNavigate, useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";

export default function BookPuja() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBooking = (data) => {
    alert("🕉 Booking Successful!");
    navigate("/bookings");
  };

  return (
    <div style={styles.page}>
      <h1>🕉 Book Puja</h1>

      <p style={styles.subText}>Select Pandit and proceed booking</p>

      <div style={styles.formBox}>
        <BookingForm panditId={id} onSuccess={handleBooking} />
      </div>
    </div>
  );
}

const styles = {
  page: {
    textAlign: "center",
    padding: "20px",
    background: "#f5f6fa",
    minHeight: "100vh",
  },
  subText: {
    color: "#555",
    marginBottom: "15px",
  },
  formBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
};