import React from "react";
import { Overlay } from "../ModalOverlay";
import loading from "../../../assets/loading.gif";
import styles from "./spinner.module.css";
export const Spinner: React.FC = () => {
  return (
    <Overlay>
      <div className={styles["spinner-container"]}>
        <img
          src={loading}
          className={styles["spinner-gif"]}
          alt="caricamento...."
        ></img>
      </div>
    </Overlay>
  );
};
