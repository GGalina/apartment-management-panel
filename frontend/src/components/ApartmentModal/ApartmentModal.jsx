import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import GeneralModal from "../GeneralModal/GeneralModal";
import GeneralButton from "../GeneralButton/GeneralButton";
import UpdateApartmentModal from "../UpdateApartmentModal/UpdateApartmentModal";
import { deleteListing, fetchAllListings } from "../../redux/apartmentActions";
import { toast } from "react-toastify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css"; 
import defaultImage from "../../assets/img/apartment-default.jpg";
import styles from "./ApartmentModal.module.css";

const ApartmentModal = ({ isOpen, onClose, apartment }) => {
    const dispatch = useDispatch();
    const [modalType, setModalType] = useState(null); 
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
            setModalType("apartment"); 
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
        document.body.classList.remove("no-scroll");
        };
    }, [isOpen]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await dispatch(deleteListing(apartment._id));
            toast.success("The listing was successfully deleted.");
            dispatch(fetchAllListings());
            onClose();
        } catch (error) {
            toast.error("Failed to delete the listing. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    const openUpdateModal = () => {
        setModalType("update"); 
    };

    const closeModal = () => {
        setModalType(null); 
        onClose(); 
    };

    return (
        <>
            {modalType === "apartment" && (
                <GeneralModal isOpen={isOpen} onClose={closeModal}>
                    <div className={styles.apartmentModalContainer}>
                        <div className={styles.closeContainer} onClick={closeModal}>
                            <span className={styles.closeIcon}>X</span>
                        </div>
                        <h2 className={styles.title}>{apartment.title}</h2>
                        <div className={styles.imageSlider}>
                            {apartment.photos && apartment.photos.length > 0 ? (
                                <Splide
                                    options={{
                                    type: "loop",
                                    perPage: 1,
                                    pagination: true,
                                    arrows: true,
                                }}
                                >
                                    {apartment.photos.map((photo, index) => (
                                        <SplideSlide key={index}>
                                            <img
                                                src={photo}
                                                alt={`Apartment slide ${index + 1}`}
                                                className={styles.slideImage}
                                            />
                                        </SplideSlide>
                                    ))}
                                </Splide>
                                ) : (
                                <img
                                    src={defaultImage}
                                    alt="Default"
                                    className={styles.slideImage}
                                />
                            )}
                        </div>
                        <p className={styles.description}>{apartment.description}</p>
                        <div className={styles.internalContainer}>
                            <p className={styles.info}>
                                <span className={styles.boldText}>Rooms: </span>
                                    {apartment.rooms}
                            </p>
                            <p className={styles.info}>
                                <span className={styles.boldText}>Price: </span>
                                    {apartment.price} $
                            </p>
                        </div>
                        <div className={styles.buttonGroup}>
                            <GeneralButton className="updateButton" onClick={openUpdateModal}>
                                Update
                            </GeneralButton>
                            <GeneralButton
                                className="deleteButton"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </GeneralButton>
                        </div>
                    </div>
                </GeneralModal>
            )}

        {modalType === "update" && (
            <UpdateApartmentModal
                isOpen={modalType === "update"}
                onClose={closeModal} // Close Update modal and reset state
                apartment={apartment}
            />
        )}
        </>
    );
};

export default ApartmentModal;
