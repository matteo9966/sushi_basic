import React from "react";
import { paths } from "../../globals/paths";
import { Button } from "../../components/UI/Buttons/Button";
import { Input } from "../../components/UI/Input";
import styles from "./creaTavolo.module.css";
import { useLocation } from "react-router-dom";

export const CreaTavolo = () => {
  const location = useLocation();
  // console.log(location.pathname.slice(1))

  let path = location.pathname.slice(1) 
  const isCreaTavolo = path === paths.CREATAVOLO ? true : false;
  const titolo = isCreaTavolo?'Crea tavolo' : 'Aggiungiti';



  
  

  return (
    <div className={styles.creatavolo}>
      <h3>{titolo}</h3>
      <span className={styles["input-area"]}>
        <Input
          id="nome"
          placeholder="Nome..."
          type="string"
          name="nome"
          label="Il tuo nome"
        ></Input>
     { isCreaTavolo &&  <Input
         label="Numero coperti"
          id="coperti"
          placeholder="Coperti..."
          type="number"
          name="coperti"
        ></Input>}
  {isCreaTavolo &&   <Input
          label="Numero piatti"
          id="numero-piatti"
          placeholder="Numero piatti..."
          type="number"
          name="piatti"
        ></Input>}
         {!isCreaTavolo &&   <Input
          label="Codice tavolo"
          id="codice-tavolo"
          placeholder="Codice tavolo..."
          type="string"
          name="codice-tavolo"
        ></Input>}


      </span>
      <Button>{titolo}</Button>
    </div>
  );
};
