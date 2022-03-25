import React,{useContext} from "react";
import { TableContext } from "../../store/Table-Context";
import { LogoHeader } from "../../components/LogoHeader";
import { Button } from "../../components/UI/Buttons/Button";
import styles from "./condivisione.module.css";
import { useNavigate } from "react-router-dom";
import { paths } from "../../globals/paths";
export const CondivisioneCodice = () => {
  const navigator = useNavigate();
  const tableCTX = useContext(TableContext);
  const onClick =()=>{
     if(tableCTX.state.tavolo && tableCTX.state.tavolo.portate){
       navigator('/'+paths.MENU);
     }
  }
  return (
    <div className={styles["main-wrapper"]}>
      <LogoHeader></LogoHeader>

      <div className={styles["area-codice"]} >
        <h2>Codice tavolo</h2>
        <span className={styles["codice-wrapper"]}>{tableCTX.state.tavolo && tableCTX.state.tavolo.codiceTavolo}</span>
        <Button onClick={onClick}>Vai al menu</Button>
      </div>
    </div>
  );
};
