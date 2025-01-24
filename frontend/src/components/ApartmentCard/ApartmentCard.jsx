// src/components/ApartmentCard/ApartmentCard.jsx
import React from "react";
import "./ApartmentCard.module.css";

const ApartmentCard = ({ apartment, onEdit }) => {
  return (
    <div className="apartment-card">
      <h2>{apartment.title}</h2>
      <p>Price: ${apartment.price}</p>
      <p>Rooms: {apartment.rooms}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

export default ApartmentCard;
