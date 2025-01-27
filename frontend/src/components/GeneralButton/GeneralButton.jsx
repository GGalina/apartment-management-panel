// GeneralButton.js
import React from 'react';
import styles from './GeneralButton.module.css';  

const GeneralButton = ({ onClick, children, className = '', type = 'button' }) => {
  return (
    <button className={`${styles.generalButton} ${className ? styles[className] : ''}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default GeneralButton;
