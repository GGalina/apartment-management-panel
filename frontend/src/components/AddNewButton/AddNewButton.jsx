import React, { useState } from "react";
import GeneralButton from "../GeneralButton/GeneralButton";
import AddNewModal from "../AddNewModal/AddNewModal";
import styles from "./AddNewButton.module.css"

const AddNewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={styles.addContainer}>
      <GeneralButton className="addButton" onClick={handleOpenModal} label="Add New Listing">Add New Listing</GeneralButton>
      {isModalOpen && <AddNewModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default AddNewButton;
