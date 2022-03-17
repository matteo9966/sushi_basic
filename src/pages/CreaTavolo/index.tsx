import React from "react";
import { Button } from "../../components/UI/Buttons/Button";
import { Input } from "../../components/UI/Input";
import styles from "./creaTavolo.module.css";
export const CreaTavolo = () => {
  return (
    <div className={styles.creatavolo}>
      <h3>Crea un tavolo</h3>
      <span className={styles["input-area"]}>
        <Input
          id="nome"
          placeholder="Nome..."
          type="string"
          name="nome"
          label="Il tuo nome"
        ></Input>
        <Input
         label="Numero coperti"
          id="coperti"
          placeholder="Coperti..."
          type="number"
          name="coperti"
        ></Input>
        <Input
          label="Numero piatti"
          id="numero-piatti"
          placeholder="Numero piatti..."
          type="number"
          name="piatti"
        ></Input>
      </span>
      <Button>Crea tavolo</Button>
    </div>
  );
};
