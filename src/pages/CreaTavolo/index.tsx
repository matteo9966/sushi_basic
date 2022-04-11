import React, { useContext,useEffect,useState } from "react";
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
import { useLocalStorage } from "../../custom-hooks/use-storage";
import { Dialog } from "../../components/Dialog";
export const CreaTavolo:React.FC<{loggedIn:boolean,setIsLoggedIn:(loggedin:boolean)=>void}> = (props) => {
  const tableCTX = useContext(TableContext);
  const navigator = useNavigate();
  const [value,setValue,remove] = useLocalStorage<{[key:string]:string}>({},"table-data");
  const [aggiornatoValueInLocalStorage,setAggiornatoValueInLocalStorage]=useState(false)
  const [showDialog,setShowDialog] = useState(false);

  const aggiornaInformazioniTavolo=(infoTavolo:{ tavolo: ITable; utente: IUtente })=>{
    
    if(infoTavolo.tavolo && infoTavolo.utente){
      tableCTX.aggiornaInfoTavolo(infoTavolo.tavolo)
      tableCTX.aggiornaInfoUtente(infoTavolo.utente)
    }
    
  }
  
  

  const { error, isLoading, sendRequest } = useHttp<
  CreateTableRequest,
  { tavolo: ITable; utente: IUtente }
  >(HttpOrdini.createTable);


  
  useEffect(()=>{
    if(tableCTX.state && tableCTX.state.tavolo && tableCTX.state.tavolo.portate && tableCTX.state.tavolo.codiceTavolo && tableCTX.state.utente && tableCTX.state.utente.id ){
      console.log({IDutente:tableCTX.state.utente.id,IDtavolo:tableCTX.state.tavolo.codiceTavolo})
      setValue({IDutente:tableCTX.state.utente.id,IDtavolo:tableCTX.state.tavolo.codiceTavolo})
      props.setIsLoggedIn(true);
      setAggiornatoValueInLocalStorage(true);
    }
  },[tableCTX.state,tableCTX.state.tavolo?.codiceTavolo,tableCTX.state.utente?.id,setValue])

  
  useEffect(()=>{
    let timeoutID:NodeJS.Timeout;
    if(!!error){
       setShowDialog(true)
       timeoutID=setTimeout(()=>{setShowDialog(false)},3500);
    }
    
    return ()=>clearTimeout(timeoutID);
    
  },[error])


  useEffect(()=>{

    if(aggiornatoValueInLocalStorage && props.loggedIn){

      navigator("/"+paths.HOME+'/'+paths.CONDIVIDICODICE);
    }
    
  },[navigator,props.loggedIn,aggiornatoValueInLocalStorage])

  
  const {
    value: nomeValue,
    hasError: nomeHasError,
    changeValueHandler: changeNomeValueHandler,
    blurInputHandler: blurNomeInputHandler,
   
    focusInputHandler: focusNomeHandler,
  } = useInput(validators.minLength(2), validators.maxLength(20));

  const {
    value: copertiValue,
    hasError: copertiHasError,
    changeValueHandler: changeCopertiValueHandler,
    blurInputHandler: blurCopertiInputHandler,
    
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
   
    focusInputHandler: focusNumeroPiattiHandler,
  } = useInput(
    validators.minLength(1),
    validators.maxLength(3),
    validators.isInteger()
  );



  const  onClickHandler = async () => {
    if(!nomeValue || !numeroPiattiValue || !copertiValue) return 
    if ( !nomeHasError && !numeroPiattiHasError && !copertiHasError) {
      console.log({nomeHasError, numeroPiattiHasError,copertiHasError});
      console.table({ nomeValue, numeroPiattiValue, copertiValue });
      await sendRequest(
        {
          nome: nomeValue,
          tavolo: { coperti: +copertiValue, portate: +numeroPiattiValue },
        },
        aggiornaInformazioniTavolo
      );
    }
    else{

      return false
    }

    
  };

  return (
    <div className={styles.creatavolo}>
      {showDialog && <Dialog message={error || "Errore,riprova più tardi"} success={false} showDialog={!!error}></Dialog>}
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
