import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../components/UI/Buttons/Button";
import { Utente } from "../../components/Utente";
import { HttpOrdini } from "../../fetch/HttpOrdini";
import styles from "./ordini.module.css";
import { TableContext } from "../../store/Table-Context";
import { useHttp } from "../../custom-hooks/use-http";
import {  IItemCart } from "../../interfaces/IItem";
import { ITable } from "../../interfaces/ITable";
import { Dialog } from "../../components/Dialog";
import { Spinner } from "../../components/UI/Spinner";
import { Cart } from "../../components/cart";
import { IUtente } from "../../interfaces/IUtente";

export const Ordini: React.FC<{
  onOpenCart: () => void;
  ordineEffettuato: boolean;
  setOrdineModificabile: (ordinato: boolean) => void;
}> = (props) => {
  const [ordine, setOrdine] = useState<{
    tavolo: ITable;
    ordine: IItemCart[];
  }>();
  const [showError, setShowError] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [titoloCart,setTitoloCart]=useState("Ordini tavolo")
  const [cartDaVisualizzare,setCartDaVisualizzare] = useState<IItemCart[]>([])
  const { error, isLoading, sendRequest } = useHttp<
    string,
    { tavolo: ITable; ordine: IItemCart[] }
  >(HttpOrdini.getCompletOrder);

  const {
    error: nuovoOrdineError, //TODO: error quando la richiesta non va a buon fine
    isLoading: nuovoOrdineLoading, //TODO: loading spinner richiesta login
    sendRequest: sendNuovoOrdineRequest,
    success:nuovoOrdineConSuccesso
  } = useHttp<
    {
      idTavolo: string;
      idUtente: string;
    },
    { tavolo: ITable; ordine: IItemCart[] }
  >(HttpOrdini.deleteUserOrder);

  const tableCTX = useContext(TableContext);

  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    if (!!error) {
      setShowError(true);

      timeoutID = setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutID);
  }, [error]);

  useEffect(()=>{
    if(nuovoOrdineConSuccesso){
      props.setOrdineModificabile(true);
    }
  },[nuovoOrdineConSuccesso])

  useEffect(() => {
    //quando carica la pagina
    
    (async () => {
      if (!tableCTX.state.tavolo?.codiceTavolo) {
        return;
      }
      await sendRequest(tableCTX.state.tavolo?.codiceTavolo, setOrdine);
    })();
  }, []);

  const showCartHandler = (show: boolean) => {
    return () => setShowCart(show);
  };
  
  console.log({ordine});
  let utentiAlTavolo:IUtente[]=[]

  console.log({tavolo:ordine?.tavolo});
  if(ordine && ordine?.tavolo && ordine.tavolo?.utenti){
    utentiAlTavolo = ordine.tavolo.utenti;
  
  }
  
  // console.log({utentiAlTavoloFuoriDaIf:utentiAlTavolo})

  const onOrdinaDiNuovoClickHandler= async ()=>{
    if (!tableCTX.state.tavolo?.codiceTavolo || !tableCTX.state.utente?.id) {
       return;
    }
    const idUtente = tableCTX.state.utente.id;
    const idTavolo = tableCTX.state.tavolo.codiceTavolo;
    await sendNuovoOrdineRequest({idTavolo,idUtente}, setOrdine);
  
    

  }

  const onClickVisualizzaOrdini =(cart:IItemCart[],titoloCart="Ordine completo tavolo")=>{
    return ()=>{
      console.log('visualizza il tavolo')
      setTitoloCart(titoloCart)
      setCartDaVisualizzare(cart)
      setShowCart(true);
    }

  }

  

  return (
    <div className={styles["ordini-wrapper"]}>
      {showError && (
        <Dialog
          message={error || "Errore,riprova più tardi"}
          showDialog={!!error}
          success={false}
        ></Dialog>
      )}
      {showCart && (
        <Cart
          cart={cartDaVisualizzare}
          onClose={showCartHandler(false)}
          editable={false}
          ordineEffettuato={false}
          titoloCart={titoloCart}
        ></Cart>
      )}
      {isLoading && <Spinner></Spinner>}
      <h4 className={styles.titolo}>Coperti</h4>
      <div className={styles.utenti}>
        <ul>
          {utentiAlTavolo.map((utente) => (
            <Utente
              key={utente.nome}
              nome={utente.nome || ""}
              numeroOrdinazioni={utente.ordinazione?.length || 0}
              onClickOrdineUtente={onClickVisualizzaOrdini(utente.ordinazione || [],`Ordinazione di ${utente.nome}`)}
            ></Utente>
          ))}
        </ul>
      </div>

      <div className={styles["ordinazione-btn-wrapper"]}>
        <Button onClick={onClickVisualizzaOrdini(ordine?.ordine || [])}>Ordine Tavolo</Button>
        <Button
          onClick={async () => {
            if (!tableCTX.state.tavolo?.codiceTavolo) {
              return;
            }
            await sendRequest(tableCTX.state.tavolo?.codiceTavolo, setOrdine);
          }}
        >
          Aggiorna
        </Button>
        {props.ordineEffettuato && <Button onClick={onOrdinaDiNuovoClickHandler}>Ordina di nuovo</Button>}
      </div>
    </div>
  );
};
