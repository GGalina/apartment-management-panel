import React from "react";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
        <Logo /> 
        <h2 className={styles.headerText}>Apartment Management Panel</h2>
    </div>
  );
};

export default Header;