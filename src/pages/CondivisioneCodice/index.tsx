import React from "react";
import { LogoHeader } from "../../components/LogoHeader";
import { Button } from "../../components/UI/Buttons/Button";
import styles from "./condivisione.module.css";
export const CondivisioneCodice = () => {
  return (
    <div className={styles["main-wrapper"]}>
      <LogoHeader></LogoHeader>

      <div className={styles["area-codice"]} >
        <h2>Codice tavolo</h2>
        <span className={styles["codice-wrapper"]}>123AVB</span>
        <Button>Vai al menu</Button>
      </div>
    </div>
  );
};
