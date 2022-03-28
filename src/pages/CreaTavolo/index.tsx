import React, { useEffect,useContext } from "react";
import { TableContext } from "../../store/Table-Context";
import { Button } from "../../components/UI/Buttons/Button";
import { Input } from "../../components/UI/Input";
import styles from "./creaTavolo.module.css";
import { useInput } from "../../custom-hooks/use-input";
import { validators } from "../../utils/validators/validators";
import { useHttp } from "../../custom-hooks/use-http";
import { CreateTableRequest } from "../../types/CreateTable/CreateTableRequest";
import { ITable } from "../../interfaces/ITable";
import { IUtente } from "../../interfaces/IUtente";
import {  useNavigate } from "react-router-dom";
import { Spinner } from "../../components/UI/Spinner";
import { paths } from "../../globals/paths";
import { HttpOrdini } from "../../fetch/HttpOrdini";
import path from "node:path/win32";
export const CreaTavolo = () => {
  const tableCTX = useContext(TableContext);


  const aggiornaInformazioniTavolo=(infoTavolo:{ tavolo: ITable; utente: IUtente })=>{
    
    if(infoTavolo.tavolo.codiceTavolo && infoTavolo.tavolo.portate){
      tableCTX.aggiornaInfoTavolo(infoTavolo.tavolo)
      tableCTX.aggiornaInfoUtente(infoTavolo.utente)

      // tableCTX.aggiornaIDTavolo(infoTavolo.tavolo.codiceTavolo);
      // tableCTX.aggiornaNumeroPortate(infoTavolo.tavolo.portate);
    }

  }

  const navigator = useNavigate();
  // const [recievedData, setRecievedData] = useState({});
  const { error, isLoading, sendRequest } = useHttp<
    CreateTableRequest,
    { tavolo: ITable; utente: IUtente }
  >(HttpOrdini.createTable);
 
  useEffect(() => {
  
     if(tableCTX.state && tableCTX.state.tavolo && tableCTX.state.tavolo.portate && tableCTX.state.tavolo.codiceTavolo ){
       navigator("/"+paths.HOME+'/'+paths.CONDIVIDICODICE);
      }

     if(error){
       console.log(error);
     }

  }, [tableCTX.state]);

  const {
    value: nomeValue,
    hasError: nomeHasError,
    changeValueHandler: changeNomeValueHandler,
    blurInputHandler: blurNomeInputHandler,
    resetInputHanler: resetNomeInputHanler,
    focusInputHandler: focusNomeHandler,
  } = useInput(validators.minLength(2), validators.maxLength(20));

  const {
    value: copertiValue,
    hasError: copertiHasError,
    changeValueHandler: changeCopertiValueHandler,
    blurInputHandler: blurCopertiInputHandler,
    resetInputHanler: resetCopertiInputHanler,
    focusInputHandler: focusCopertiHandler,
  } = useInput(
    validators.minLength(1),
    validators.maxLength(3),
    validators.isInteger()
  );

  const {
    value: numeroPiattiValue,
    hasError: numeroPiattiHasError,
    changeValueHandler: changeNumeroPiattiValueHandler,
    blurInputHandler: blurNumeroPiattiInputHandler,
    resetInputHanler: resetnumeroPiattiInputHanler,
    focusInputHandler: focusNumeroPiattiHandler,
  } = useInput(
    validators.minLength(1),
    validators.maxLength(3),
    validators.isInteger()
  );



  const  onClickHandler = async () => {
    if ( nomeHasError || numeroPiattiHasError || copertiHasError) {
      return false
    }
    console.table({ nomeValue, numeroPiattiValue, copertiValue });
    await sendRequest(
      {
        nome: nomeValue,
        tavolo: { coperti: +copertiValue, portate: +numeroPiattiValue },
      },
      aggiornaInformazioniTavolo
    );
    // resetInputs();
  };

  return (
    <div className={styles.creatavolo}>
      {isLoading && <Spinner></Spinner>}
      <h3>Crea un tavolo</h3>
      <span className={styles["input-area"]}>
        <Input
          onFocus={focusNomeHandler}
          onChange={changeNomeValueHandler}
          onBlur={blurNomeInputHandler}
          hasError={nomeHasError}
          value={nomeValue}
          id="nome"
          placeholder="Nome..."
          type="string"
          name="nome"
          label="Il tuo nome"
        ></Input>

        <Input
          hasError={copertiHasError}
          onFocus={focusCopertiHandler}
          onChange={changeCopertiValueHandler}
          onBlur={blurCopertiInputHandler}
          value={copertiValue}
          label="Numero coperti"
          id="coperti"
          placeholder="Coperti..."
          type="number"
          name="coperti"
        ></Input>

        <Input
          hasError={numeroPiattiHasError}
          onFocus={focusNumeroPiattiHandler}
          onChange={changeNumeroPiattiValueHandler}
          onBlur={blurNumeroPiattiInputHandler}
          value={numeroPiattiValue}
          label="Numero piatti"
          id="numero-piatti"
          placeholder="Numero piatti..."
          type="number"
          name="piatti"
        ></Input>
      </span>
      <Button onClick={onClickHandler}>Crea tavolo</Button>
    </div>
  );
};
