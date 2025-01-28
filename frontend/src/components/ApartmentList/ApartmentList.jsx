import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllListings } from "../../redux/apartmentActions";
import { selectAllApartments, selectLoading } from "../../redux/apartmentSelectors";
import Loader from "../Loader/Loader";
import ApartmentCard from "../ApartmentCard/ApartmentCard";
import ApartmentModal from "../ApartmentModal/ApartmentModal";
import UpdateApartmentModal from "../UpdateApartmentModal/UpdateApartmentModal";
import styles from "./ApartmentList.module.css";

const ApartmentList = () => {
  const dispatch = useDispatch();
  const apartments = useSelector(selectAllApartments);
  const isLoading = useSelector(selectLoading);

  const [modalType, setModalType] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);

  useEffect(() => {
    dispatch(fetchAllListings());
  }, [dispatch]);

  const openApartmentModal = (apartment) => {
    setSelectedApartment(apartment);
    setModalType("apartment");
  };

  const openUpdateModal = () => {
    setModalType("update");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedApartment(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && apartments.length === 0) {
    return <p className={styles.apartmentNoList}>No listings available at the moment</p>;
  }

  return (
    <div className={styles.apartmentList}>
      {apartments.map((apartment) => (
        <ApartmentCard
          key={apartment._id}
          apartment={apartment}
          onCardClick={() => openApartmentModal(apartment)}
        />
      ))}

      {modalType === "apartment" && (
        <ApartmentModal
          isOpen={modalType === "apartment"}
          onClose={closeModal}
          onOpenUpdateModal={openUpdateModal}
          apartment={selectedApartment}
        />
      )}
      
      {modalType === "update" && (
        <UpdateApartmentModal
          isOpen={modalType === "update"}
          onClose={closeModal}
          apartment={selectedApartment}
        />
      )}
    </div>
  );
};

export default ApartmentList;
