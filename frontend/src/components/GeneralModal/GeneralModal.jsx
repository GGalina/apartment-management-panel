import React from "react";
import styles from "./GeneralModal.module.css";

const GeneralModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default GeneralModal;
