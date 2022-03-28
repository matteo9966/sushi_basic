import React,{useContext,useEffect,useState} from "react";
import { HttpOrdini } from "../../fetch/HttpOrdini";
import { Button } from "../../components/UI/Buttons/Button";
import { Input } from "../../components/UI/Input";
import styles from "./aggiungiti.module.css";
import { useInput } from "../../custom-hooks/use-input";
import { validators } from "../../utils/validators/validators";
import { useHttp } from "../../custom-hooks/use-http";
import { AddUserRequert } from "../../types/AddUser/AddUserRequest";
import { ITable } from "../../interfaces/ITable";
import { IUtente } from "../../interfaces/IUtente";
import { TableContext } from "../../store/Table-Context";
import { Spinner } from "../../components/UI/Spinner";
import { useNavigate } from "react-router-dom";
import { paths } from "../../globals/paths";
import { Dialog } from "../../components/Dialog";
export const Aggiungiti = () => {

  const [showDialog,setShowDialog] = useState(false);
  const tableCTX = useContext(TableContext);
  const navigator = useNavigate()
  const aggiornaInfoTavolo = (data:{tavolo:ITable,utente:IUtente})=>{   
    tableCTX.aggiornaInfoUtente(data.utente);
     tableCTX.aggiornaInfoTavolo(data.tavolo)

  }


  const { error, isLoading, sendRequest } = useHttp<
  AddUserRequert,
  { tavolo: ITable; utente: IUtente }
>(HttpOrdini.newUser);


 useEffect(()=>{
  let timeoutID:NodeJS.Timeout;

  if(!!error){
  
    setShowDialog(true)
    timeoutID=setTimeout(()=>{setShowDialog(false)},3000);
  }

  if(tableCTX.state.utente && tableCTX.state.utente.id ){

    navigator('/'+paths.HOME)
    //tutto è andato bene posso andare alla pagina degli ordini
  }
  
  return ()=>clearTimeout(timeoutID)

 },[error,tableCTX.state])

  const {
    value: nomeValue,
    hasError: nomeHasError,
    changeValueHandler: changeNomeValueHandler,
    blurInputHandler: blurNomeInputHandler,
    focusInputHandler: focusNomeHandler,
  } = useInput(validators.minLength(2), validators.maxLength(20));

  const {
    value: codiceTavoloValue,
    hasError: codiceTavoloHasError,
    changeValueHandler: changeCodiceTavoloValueHandler,
    blurInputHandler: blurcodiceTavoloInputHandler,
    focusInputHandler: focusCodiceTavoloHandler,
  } = useInput(validators.minLength(2));

  const onClickHandler = async () => {
    if (!codiceTavoloHasError && !nomeHasError && !codiceTavoloHasError) {
      console.table({ nomeValue, codiceTavoloValue });

      await sendRequest({idTavolo:codiceTavoloValue,nome:nomeValue},aggiornaInfoTavolo)
    }
  };


  return (
    <div className={styles.aggiungiti}>
      {showDialog && <Dialog message={error || "Errore,riprova più tardi"} success={false} showDialog={!!error}></Dialog>}
      {isLoading && <Spinner></Spinner>}
      <h3>Aggiungiti</h3>
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
          hasError={codiceTavoloHasError}
          onFocus={focusCodiceTavoloHandler}
          onChange={changeCodiceTavoloValueHandler}
          onBlur={blurcodiceTavoloInputHandler}
          value={codiceTavoloValue}
          label="Codice tavolo"
          id="codice-tavolo"
          placeholder="Codice tavolo..."
          type="string"
          name="codice-tavolo"
        ></Input>
      </span>
      <Button onClick={onClickHandler}>Aggiungiti</Button>
    </div>
  );
};
