import React from "react";
import sushicat from "../../assets/sushicat.png";
import styles from "./logoheader.module.css";
export const LogoHeader: React.FC = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.title}>
        <img src={sushicat} alt="logo" />
        <h3>Sushi Bamm</h3>
      </div>
    </nav>
  );
};
