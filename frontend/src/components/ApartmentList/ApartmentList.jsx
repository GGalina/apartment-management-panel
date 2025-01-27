import React, { useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { fetchAllListings } from "../../redux/apartmentActions"
import { selectAllApartments, selectLoading } from "../../redux/apartmentSelectors";
import Loader from "../Loader/Loader";
import ApartmentCard from "../ApartmentCard/ApartmentCard";
import styles from "./ApartmentList.module.css";

const ApartmentList = ({ onCardClick }) => {
  const dispatch = useDispatch();
  const apartments = useSelector(selectAllApartments);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchAllListings());
  }, [dispatch]);

  if (isLoading) {
    return (
        <Loader />
    );
  };

  if (!isLoading && apartments.length === 0) {
    return <p className={styles.apartmentNoList}>No listings available at the moment</p>;
  }

  return (
    <div className={styles.apartmentList}>
      {apartments.map((apartment) => (
        <ApartmentCard
          key={apartment._id}
          apartment={apartment}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default ApartmentList;
