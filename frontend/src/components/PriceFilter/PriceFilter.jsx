import React from "react";
import { useDispatch } from "react-redux";
import { filterByPrice, fetchAllListings } from "../../redux/apartmentActions";
import styles from "./PriceFilter.module.css"

const PriceFilter = () => {
  const dispatch = useDispatch();

  const handlePriceChange = (e) => {
    const selectedPrice = e.target.value;

    if (selectedPrice === "") {
      dispatch(fetchAllListings()); 
    } else {
      dispatch(filterByPrice(selectedPrice)); 
      console.log(selectedPrice)
    }
  };

  return (
    <div className={styles.filterContainer}>
      <label htmlFor="price" className={styles.filterLabel}>
        Filter by Price:
      </label>
      <select id="price" onChange={handlePriceChange} className={styles.filterSelect}>
        <option value="">Show all</option>
        <option value="1000">under 1000</option>
        <option value="2000">under 2000</option>
        <option value="3000">under 3000</option>
      </select>
    </div>
  );
};

export default PriceFilter;
