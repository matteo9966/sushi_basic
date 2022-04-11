import React from "react";
import styles from "./utente.module.css";

export const Utente: React.FC<{
  nome: string;
  numeroOrdinazioni: number;
  onClickOrdineUtente: () => void;
  onClickRimuoviUtente:() =>  void;
  isAdmin:boolean;
}> = (props) => {
  return (
    <li className={styles["list-item"]}>
      <span className={styles['list-item-name']}>
        {props.isAdmin && 
        <p className={styles['btn-rimuovi']} onClick={props.onClickRimuoviUtente}>
          X
          </p>}
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
