import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminBookings.css";
export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/")
      .then((res) => {
        console.log("API RESPONSE:", res);
        console.log("DATA:", res.data);
        setBookings(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
  <div className="page">
    <h2 className="title">📅 All Bookings</h2>

    {bookings.length === 0 ? (
      <p>No bookings found</p>
    ) : (
      <div className="grid">
        {bookings.map((b) => (
          <div key={b._id} className="card">
            <p><b>User:</b> {b.userId?.name}</p>
            <p><b>Pandit:</b> {b.panditId?.name}</p>
            <p><b>Location:</b> {b.location}</p>
            <p><b>Date:</b> {b.date}</p>
            <p><b>Time:</b> {b.timeSlot}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);
}