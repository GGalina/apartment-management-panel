import React from "react";
import styles from "./ApartmentCard.module.css"; 

const ApartmentCard = ({ apartment, onCardClick }) => {
  return (
    <div
      key={apartment._id}
      onClick={() => onCardClick(apartment)}
      className={styles.cardContainer}
    >
      <div className={styles.cardImgContainer}>
        <img
          src={apartment.photos?.[0] || "/assets/img/apartment-default.jpg"} 
          alt={`${apartment.title} preview`}
          className={styles.cardImg}
        />
      </div>
      <div className={styles.cardDesc}>
        <div className={styles.cardInfoContainer}>
          <p className={styles.cardInfo}>{apartment.rooms} rooms</p>
          <p className={styles.cardInfo}>{apartment.price} $</p>
        </div>
        <div className={styles.cardTitleContainer}>
          <h3 className={styles.cardTitle}>{apartment.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;