import React from "react";
import styles from "./utente.module.css";

export const Utente: React.FC<{
  nome: string;
  numeroOrdinazioni: number;
  onClickOrdineUtente: () => void;
}> = (props) => {
  return (
    <li className={styles["list-item"]}>
      <span>
        <p>{props.nome}</p>
      </span>
      <span>
        <span>
          <p className={styles.button} onClick={props.onClickOrdineUtente}>{props.numeroOrdinazioni}</p>
        </span>
      </span>
    </li>
  );
};
