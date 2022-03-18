import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/sushicat.png";
import { Button } from "../../components/UI/Buttons/Button";
import styles from "./home.module.css";
export const Home: React.FC = (props) => {
 const navigate = useNavigate();
  const onClickHandler = (path:string)=>{
    return ()=>{ 
         navigate(path);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Sushi Bamm</h1>

      <img src={logo} alt="sushi cat logo" className={styles.logo}></img>
      <span className={styles["paragraph-strip"]}>
        <p>Crea il tuo tavolo o aggiungiti a un tavolo con un codice!</p>
      </span>

      <span className={styles["button-area"]}>
        <Button onClick={onClickHandler('aggiungiti')}>Aggiungiti</Button>
        <Button onClick={onClickHandler('crea-tavolo')}>Crea un tavolo</Button>
      </span>
    </div>
  );
};
