// src/components/ApartmentForm/ApartmentForm.jsx
import React, { useState } from "react";
import "./ApartmentForm.module.css";

const ApartmentForm = ({ apartment = {}, onClose }) => {
  const [formData, setFormData] = useState({
    title: apartment.title || "",
    price: apartment.price || "",
    rooms: apartment.rooms || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData); // Replace with your API logic
    onClose();
  };

  return (
    <form className="apartment-form" onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength={90}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Rooms:
        <select
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
          required
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </label>
      <div className="form-buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ApartmentForm;
