import React,{useContext,useEffect,useState} from "react";
import { HttpOrdini } from "../../fetch/HttpOrdini";
import { Button } from "../../components/UI/Buttons/Button";
import { Input } from "../../components/UI/Input";
import styles from "./aggiungiti.module.css";
import { useInput } from "../../custom-hooks/use-input";
import { validators } from "../../utils/validators/validators";
import { useHttp } from "../../custom-hooks/use-http";
import { useLocalStorage } from "../../custom-hooks/use-storage";
import { AddUserRequert } from "../../types/AddUser/AddUserRequest";
import { ITable } from "../../interfaces/ITable";
import { IUtente } from "../../interfaces/IUtente";
import { TableContext } from "../../store/Table-Context";
import { Spinner } from "../../components/UI/Spinner";
import { useNavigate } from "react-router-dom";
import { paths } from "../../globals/paths";
import { Dialog } from "../../components/Dialog";
import { CartContext } from "../../store/Cart-Context";
export const Aggiungiti = () => {
  const cartCTX = useContext(CartContext);
  const [value,setValue,remove] = useLocalStorage<{[key:string]:string}>({},"table-data");
  const aggiornaInfoTavolo = (data:{tavolo:ITable,utente:IUtente})=>{ 
    if(data.utente.id && data.tavolo.codiceTavolo){
      setValue({IDutente:data.utente.id,IDtavolo:data.tavolo.codiceTavolo}) 

    } 
    tableCTX.aggiornaInfoUtente(data.utente);
     tableCTX.aggiornaInfoTavolo(data.tavolo)

  }
   
  
   const setThisTableInfo =(idUtente:string)=>{
    //  console.log({ID_utente:idUtente})
    return (tavolo:ITable)=>{
      console.log({tavolo,idUtente});
      const utente = tavolo.utenti && tavolo.utenti.find(utente=>utente.id===idUtente);
      if(!utente){
        remove();
        throw new Error("nessun utente!") //
      }
      const itemsOfUtente = utente.ordinazione || [];
      itemsOfUtente.forEach(item=>cartCTX.addItem(item))
      aggiornaInfoTavolo({tavolo,utente})
    

      
    }

   }




  const [showDialog,setShowDialog] = useState(false);
  const tableCTX = useContext(TableContext);
  const navigator = useNavigate()


  const { error, isLoading, sendRequest } = useHttp<AddUserRequert,{ tavolo: ITable; utente: IUtente }>(HttpOrdini.newUser);
  const {error:getThisTableError,isLoading:getThisTableLoading,sendRequest:sendRequestForThisTable}=useHttp<string,ITable>(HttpOrdini.thisTable)


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

  useEffect(()=>{
    
   const sendAsyncRequest = async ()=>{
     await sendRequest({idTavolo:codiceTavoloValue,nome:nomeValue},aggiornaInfoTavolo)
   }
     
 
    if(getThisTableError){
     sendAsyncRequest()
    }
  },[getThisTableError,codiceTavoloValue,nomeValue])

  
  const onClickHandler = async () => {
    if (!codiceTavoloHasError && !nomeHasError && !codiceTavoloHasError) {
      console.table({ nomeValue, codiceTavoloValue });
      //vado a vedere nel sessionStorage se c'è qualcosa, se c'è qualcosa faccio una  richiesta diversa non quella di newUser
      if(value.hasOwnProperty('IDutente') && value.hasOwnProperty('IDtavolo')){
          //c'è in memoria, allora faccio una richiesta con questi dati 
          console.log(value);
          await sendRequestForThisTable(value.IDtavolo,setThisTableInfo(value.IDutente))
          
       
      }else{
        
        await sendRequest({idTavolo:codiceTavoloValue,nome:nomeValue},aggiornaInfoTavolo)

      }
      
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
