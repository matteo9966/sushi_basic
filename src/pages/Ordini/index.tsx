import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../components/UI/Buttons/Button";
import { Utente } from "../../components/Utente";
import { HttpOrdini } from "../../fetch/HttpOrdini";
import styles from "./ordini.module.css";
import { TableContext } from "../../store/Table-Context";
import { useHttp } from "../../custom-hooks/use-http";
import { IItem, IItemCart } from "../../interfaces/IItem";
import { ITable } from "../../interfaces/ITable";
import { Dialog } from "../../components/Dialog";
import { Spinner } from "../../components/UI/Spinner";
import { Cart } from "../../components/cart";
const listaUtentiFasulli = Array.from({ length: 15 }, (_, i) => ({
  nome: `matteo ${i}`,
  ordinazioni: i,
}));
export const Ordini: React.FC<{ onOpenCart: () => void }> = (props) => {
  const [ordine, setOrdine] = useState<{ tavolo: ITable; ordine: IItemCart[] }>();
  const [showError, setShowError] = useState(false);
  const [showCart,setShowCart] = useState(false);
  const { error, isLoading, sendRequest } = useHttp<
    string,
    { tavolo: ITable; ordine: IItemCart[] }
  >(HttpOrdini.getCompletOrder);

  const tableCTX = useContext(TableContext);

  useEffect(() => {
    let timeoutID:NodeJS.Timeout;
    if (!!error) {
      setShowError(true);

      timeoutID = setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    return ()=>clearTimeout(timeoutID)
    
  }, [error]);

  useEffect(() => {
    //quando carica la pagina
    (async () => {
      if (!tableCTX.state.tavolo?.codiceTavolo) {
        return;
      }
      await sendRequest(tableCTX.state.tavolo?.codiceTavolo, setOrdine);
    })();
  }, []);

   
  const showCartHandler=(show:boolean)=>{
   return  ()=>setShowCart(show)
  }

  const utentiAlTavolo = ordine?.tavolo.utenti || [];
  // useEffect(()=>{

  // },[])

  return (
    <div className={styles["ordini-wrapper"]}>
      {showError &&
        <Dialog
          message={error || "Errore,riprova più tardi"}
          showDialog={!!error}
          success={false}
        ></Dialog>
      }
      {showCart && <Cart cart={ordine?.ordine || []} onClose={showCartHandler(false)} editable={false} ></Cart>}
      {isLoading && <Spinner></Spinner>}
      <h4 className={styles.titolo}>Coperti</h4>
      <div className={styles.utenti}>
        <ul>
          {utentiAlTavolo.map((utente) => (
            <Utente
              key={utente.nome}
              nome={utente.nome || ""}
              numeroOrdinazioni={utente.ordinazione?.length || 0}
            ></Utente>
          ))}
        </ul>
      </div>

      <div className={styles["ordinazione-btn-wrapper"]}>
        <Button
          onClick={showCartHandler(true)}
        >
          Ordine Tavolo
        </Button>
        <Button   onClick={async () => {
            if (!tableCTX.state.tavolo?.codiceTavolo) {
              return;
            }
            await sendRequest(tableCTX.state.tavolo?.codiceTavolo, setOrdine);
      
          }}>Aggiorna</Button>
        <Button>Ordina di nuovo</Button>
      </div>
    </div>
  );
};
