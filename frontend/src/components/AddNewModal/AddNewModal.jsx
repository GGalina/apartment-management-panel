import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import GeneralModal from "../GeneralModal/GeneralModal";
import GeneralButton from "../GeneralButton/GeneralButton";
import { createListing, fetchAllListings } from "../../redux/apartmentActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AddNewModal.module.css";

const AddNewModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rooms: "1",
    price: "",
    photos: [],
  });

  const [localErrors, setLocalErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (localErrors[name]) {
      setLocalErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photos: Array.from(e.target.files) });

    if (localErrors.photos) {
      setLocalErrors((prev) => ({ ...prev, photos: "" }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.price || formData.price <= 0) newErrors.price = "Price must be greater than 0.";
    if (!formData.rooms) newErrors.rooms = "Please select the number of rooms.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setLocalErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const newListing = new FormData();
    newListing.append("title", formData.title);
    newListing.append("description", formData.description);
    newListing.append("price", formData.price);
    newListing.append("rooms", formData.rooms);

    // Add photos if they exist
    if (formData.photos && formData.photos.length > 0) {
      formData.photos.forEach((photo) => {
        newListing.append("photos", photo);
      });
    }

    dispatch(createListing(newListing))
      .then(() => {
        dispatch(fetchAllListings());
        toast.success("Listing created successfully!");
        setFormData({
          title: "",
          description: "",
          rooms: "1",
          price: "",
          photos: [],
        });
        onClose(); 
      })
      .catch(() => {
        toast.error("Error creating listing. Please check the fields and try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <GeneralModal isOpen={isOpen} onClose={onClose}>
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
              className={styles.input}
            />
            {localErrors.title && <span className={styles.error}>{localErrors.title}</span>}
          </label>
          <label className={styles.label}>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength="335"
              className={styles.textarea}
            />
            {localErrors.description && (
              <span className={styles.error}>{localErrors.description}</span>
            )}
          </label>
          <label className={styles.label}>
            Rooms:
            <select
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
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
              className={styles.input}
            />
            {localErrors.price && <span className={styles.error}>{localErrors.price}</span>}
          </label>
          <label className={styles.label}>
            Photos:
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className={styles.fileInput}
            />
          </label>
          <div className={styles.buttonGroup}>
            <GeneralButton
              type="submit"
              className="submitButton"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </GeneralButton>
            <GeneralButton onClick={onClose} className="cancelButton">
              Cancel
            </GeneralButton>
          </div>
        </form>
      </div>
    </GeneralModal>
  );
};

export default AddNewModal;
