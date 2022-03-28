import React from "react";
import styles from "./footer.module.css";
import menu from '../../assets/menu.png';
import tavolo from '../../assets/tavolo.png';
import { FooterButton } from "./FooterButton";
import { paths } from "../../globals/paths";
export const Footer = () => {
  return (
    <div className={styles["footer-wrapper"]}>
      <div className={styles["footer-container"]}>

        <span className={styles["footer-item"]}>
          <FooterButton titolo="Menu" img={menu} to={""}></FooterButton>
         </span>
        <span className={styles["footer-item"]}>

           <FooterButton titolo="Info Tavolo" img={tavolo} to={paths.MENU}></FooterButton>
          </span>
      </div>
    </div>
  );
};
