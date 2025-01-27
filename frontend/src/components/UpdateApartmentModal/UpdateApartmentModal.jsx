import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateListing, fetchAllListings } from "../../redux/apartmentActions";
import GeneralModal from "../GeneralModal/GeneralModal";
import GeneralButton from "../GeneralButton/GeneralButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./UpdateApartmentModal.module.css";

const UpdateApartmentModal = ({ isOpen, onClose, apartment }) => {
    const dispatch = useDispatch();
    const [updatedListing, setUpdatedListing] = useState({
        title: "",
        description: "",
        rooms: "1",
        price: "",
        photos: [],
    });
    const [localErrors, setLocalErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (apartment) {
            setUpdatedListing({
                title: apartment.title,
                description: apartment.description,
                rooms: apartment.rooms.toString(),
                price: apartment.price,
                photos: apartment.photos || [],
            });
        }
    }, [apartment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedListing({ ...updatedListing, [name]: value });

        if (localErrors[name]) {
            setLocalErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleFileChange = (e) => {
        setUpdatedListing({ ...updatedListing, photos: Array.from(e.target.files) });

        if (localErrors.photos) {
            setLocalErrors((prev) => ({ ...prev, photos: "" }));
        }
    };

    const validateFields = () => {
        const newErrors = {};
        if (!updatedListing.title.trim()) newErrors.title = "Title is required.";
        if (!updatedListing.description.trim()) newErrors.description = "Description is required.";
        if (!updatedListing.price || updatedListing.price <= 0) newErrors.price = "Price must be greater than 0.";
        if (!updatedListing.rooms) newErrors.rooms = "Please select the number of rooms.";
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
    
        const formData = new FormData();
        formData.append("title", updatedListing.title);
        formData.append("description", updatedListing.description);
        formData.append("price", updatedListing.price);
        formData.append("rooms", updatedListing.rooms);
    
        // If photos are selected, append each file to FormData
        if (updatedListing.photos.length > 0) {
            updatedListing.photos.forEach((photo) => {
                formData.append("photos", photo); // Append each file individually
            });
        }
    
        dispatch(updateListing({ id: apartment._id, aptData: formData }))
            .then(() => {
                dispatch(fetchAllListings());
                toast.success("Listing updated successfully!");
                onClose();
            })
            .catch((error) => {
                toast.error("Error updating listing. Please try again.");
                console.error("Error:", error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };
    
    return (
        <GeneralModal isOpen={isOpen} onClose={onClose}>
            <div className={styles.modalContainer}>
                <h2 className={styles.modalTitle}>Update Listing</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={updatedListing.title}
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
                            value={updatedListing.description}
                            onChange={handleChange}
                            maxLength="335"
                            className={styles.textarea}
                        />
                        {localErrors.description && <span className={styles.error}>{localErrors.description}</span>}
                    </label>
                    <label className={styles.label}>
                        Rooms:
                        <select
                            name="rooms"
                            value={updatedListing.rooms}
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
                            value={updatedListing.price}
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
                        <GeneralButton type="submit" className="submitButton" disabled={isSubmitting}>
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

export default UpdateApartmentModal;
