import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createListing } from "../../redux/apartmentActions";
import GeneralModal from "../GeneralModal/GeneralModal";
import GeneralButton from "../GeneralButton/GeneralButton";
import styles from "./AddNewModal.module.css";

const AddNewModal = ({ isOpen, onRequestClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rooms: "1",
    price: "",
    photos: null,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photos: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || formData.price <= 0 || !formData.rooms) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const newListing = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      rooms: parseInt(formData.rooms, 10),
      photos: formData.photos,
    };

    dispatch(createListing(newListing))
      .then(() => {
        console.log("Listing created successfully!");
        setFormData({
          title: "",
          description: "",
          rooms: "1",
          price: "",
          photos: null,
        });
        onRequestClose();
      })
      .catch((error) => {
        alert("Error creating listing. Please try again.");
        console.error("Error creating listing:", error);
      });
  };

  return (
    <div className={isOpen ? styles.modalOverlay : ''}>
    <GeneralModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>Add New Listing</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength="90"
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength="335"
              required
              className={styles.textarea}
            />
          </label>
          <label className={styles.label}>
            Rooms:
            <select
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
          <label className={styles.label}>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Photos:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
          </label>
          <div className={styles.buttonGroup}>
          <GeneralButton type="submit" className="submitButton">
            Submit
          </GeneralButton>
          <GeneralButton onClick={onRequestClose} className="cancelButton">
            Cancel
          </GeneralButton>
        </div>
        </form>
      </div>
    </GeneralModal>
    </div>
  );
};

export default AddNewModal;
