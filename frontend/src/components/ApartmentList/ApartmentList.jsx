// src/components/ApartmentList/ApartmentList.jsx
import React from "react";
import ApartmentCard from "../ApartmentCard/ApartmentCard";
import "./ApartmentList.module.css";

const ApartmentList = ({ onEdit }) => {
  const apartments = [
    { id: 1, title: "Apartment 1", price: 1000, rooms: 2 },
    { id: 2, title: "Apartment 2", price: 1200, rooms: 3 },
  ]; // Placeholder data

  return (
    <div className="apartment-list">
      {apartments.map((apartment) => (
        <ApartmentCard
          key={apartment.id}
          apartment={apartment}
          onEdit={() => onEdit(apartment)}
        />
      ))}
    </div>
  );
};

export default ApartmentList;
