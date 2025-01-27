import React from "react";
import { useDispatch } from "react-redux";
import { filterByRooms, fetchAllListings } from "../../redux/apartmentActions";
import styles from "./RoomFilter.module.css"

const RoomFilter = () => {
  const dispatch = useDispatch();

  const handleRoomChange = (e) => {
    const selectedRooms = e.target.value;

    if (selectedRooms === "") {
      dispatch(fetchAllListings()); 
    } else {
      dispatch(filterByRooms(selectedRooms)); 
    }
  };

  return (
    <div className={styles.filterContainer}>
      <label htmlFor="rooms" className={styles.filterLabel}>
        Filter by Rooms:
      </label>
      <select id="rooms" onChange={handleRoomChange} className={styles.filterSelect}>
        <option value="">All Rooms</option>
        <option value="1">1 Room</option>
        <option value="2">2 Rooms</option>
        <option value="3">3 Rooms</option>
      </select>
    </div>
  );
};

export default RoomFilter;
