import React from "react";
import styles from "./utente.module.css";

export const Utente: React.FC<{ nome: string; numeroOrdinazioni: number }> = (
  props
) => {
  return (
    <li className={styles["list-item"]}>
      <span>
        <p>{props.nome}</p>
      </span>
      <span>
        <p className={styles.button}>{props.numeroOrdinazioni}</p>
      </span>
    </li>
  );
};
