import React, { useEffect, useState,useContext } from "react";
import { CartContext } from "../../store/Cart-Context";
import { Button } from "../../components/UI/Buttons/Button";
import { Input } from "../../components/UI/Input";
import styles from "./creaTavolo.module.css";
import { useInput } from "../../custom-hooks/use-input";
import { validators } from "../../utils/validators/validators";
import { useHttp } from "../../custom-hooks/use-http";
import { LoadingSpinner } from "../../components/UI/LoadingSpinner";
import { instance as httpFetch } from "../../fetch/HttpFetch";
import { CreateTableRequest } from "../../types/CreateTable/CreateTableRequest";
// import { CreateTableResponse } from "../../types/CreateTable/CreateTableResponse";
import { ITable } from "../../interfaces/ITable";
import { IUtente } from "../../interfaces/IUtente";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/UI/Spinner";
export const CreaTavolo = () => {
  const ctx = useContext(CartContext);
  const navigator = useNavigate();
  const [recievedData, setRecievedData] = useState({});
  const { error, isLoading, sendRequest } = useHttp<
    CreateTableRequest,
    { tavolo: ITable; utente: IUtente }
  >(httpFetch.createTable);
 
  useEffect(() => {
     if(recievedData){
       console.log(recievedData);
       //TODO: continua da qua passa i dati ricevuti al context e vai alla pagina con il codice tavolo;
       //errore è nullo
       console.log("ti porto a una pagina con ")
      }

     if(error){
       //non fare nulla
       console.log(error);
     }

  }, [recievedData,error]);

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

  const resetInputs = () => {
    resetCopertiInputHanler();
    resetnumeroPiattiInputHanler();
    resetNomeInputHanler();
  };

  const  onClickHandler = async () => {
    if (!nomeHasError && !numeroPiattiHasError && !copertiHasError) {
      console.table({ nomeValue, numeroPiattiValue, copertiValue });
      await sendRequest(
        {
          nome: nomeValue,
          tavolo: { coperti: +copertiValue, portate: +numeroPiattiValue },
        },
        setRecievedData
      );
      resetInputs();
      
    }
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
