import React, { useState } from "react";
import ApartmentList from "./components/ApartmentList/ApartmentList";
import ApartmentForm from "./components/ApartmentForm/ApartmentForm";
import Header from "./components/Header/Header";
import Modal from "./components/GeneralModal/GeneralModal";
import AddNewButton from "./components/AddNewButton/AddNewButton";
import styles from "./App.module.css"; 

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState(null);

  const openModal = (apartment = null) => {
    setEditingApartment(apartment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingApartment(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.app}>
      <Header/>
      <div className={styles.buttonsContainer}>
        <AddNewButton/>
      </div>      
      <ApartmentList onEdit={openModal} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ApartmentForm
            apartment={editingApartment}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
