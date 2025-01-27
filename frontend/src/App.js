import React from "react";
import Header from "./components/Header/Header";
import RoomFilter from "./components/RoomFilter/RoomFilter";
import PriceFilter from "./components/PriceFilter/PriceFilter";
import AddNewButton from "./components/AddNewButton/AddNewButton";
import ApartmentList from "./components/ApartmentList/ApartmentList";
import { ToastContainer } from 'react-toastify';
import styles from "./App.module.css"; 

const App = () => {
  return (
    <div className={styles.app}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} />
      <Header/>
      <div className={styles.buttonsContainer}>
        <AddNewButton/>
        <div className={styles.filterContainer}>
          <RoomFilter/>
          <PriceFilter/>
        </div>
      </div>      
      <ApartmentList/>
    </div>
  );
};

export default App;
