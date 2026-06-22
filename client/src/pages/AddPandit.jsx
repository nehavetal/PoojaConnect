import { useState } from "react";
import api from "../services/api";
import "./addPandit.css";

export default function AddPandit() {
  const [form, setForm] = useState({
    name: "",
    experience: "",
    location: "",
    price: ""
  });

  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("experience", form.experience);
    data.append("location", form.location);
    data.append("price", form.price);
    data.append("photo", photo);

    try {
      const res = await api.post("/pandits", data);
      console.log(res.data);
      alert("🙏 Pandit Added Successfully!");
    } catch (err) {
      console.log(err);
      alert("❌ Error adding pandit");
    }
  };

  return (
    <div className="add-pandit-page">
      <div className="add-pandit-card">

        <h2>➕ Add New Pandit</h2>
        <p>Fill details to register a new pandit</p>

        <form onSubmit={handleSubmit} className="form">

          <input
            name="name"
            placeholder="Pandit Name"
            onChange={handleChange}
            className="input"
          />

          <input
            name="experience"
            placeholder="Experience (years)"
            onChange={handleChange}
            className="input"
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="input"
          />

          <input
            name="price"
            placeholder="Price (₹)"
            onChange={handleChange}
            className="input"
          />

          {/* <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="input"
          /> */}

          <button type="submit" className="btn">
            Add Pandit
          </button>

        </form>
      </div>
    </div>
  );
}