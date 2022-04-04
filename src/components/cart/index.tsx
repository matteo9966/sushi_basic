import React, { useContext,useEffect,useState } from "react";
import styles from "./cart.module.css";
import { Modal } from "../UI/Modal";
import { CartItem } from "./cart-item";
import { Button } from "../UI/Buttons/Button";
import { TableContext } from "../../store/Table-Context";
import { useHttp } from "../../custom-hooks/use-http";
import { OrderRequest } from "../../types/CreateOrder/OrderRequest";
import { HttpOrdini } from "../../fetch/HttpOrdini";
import { ITable } from "../../interfaces/ITable";
import { Spinner } from "../UI/Spinner";
import { IItemCart } from "../../interfaces/IItem";
import { Dialog } from "../Dialog";

export const Cart: React.FC<{ onClose: () => void,editable:boolean,cart:IItemCart[],setEditable?:(editable:boolean)=>void }> = (props) => {
  const [showDialog,setShowDialog]= useState(false)
  const sortedCart = props.cart.sort((itemA, itemB) => itemA.id - itemB.id);
  const TableCTX = useContext(TableContext);
  const { error, isLoading, sendRequest,success } = useHttp<OrderRequest,ITable>(HttpOrdini.newOrder);

  useEffect(()=>{
    if(error){
      console.log(TableCTX.state.tavolo);
    }
  },[error,TableCTX.state])

  useEffect(()=>{
    let timeoutID:NodeJS.Timeout;
    console.log("sto eseguendo sideeffect!");
    if(success){
      setShowDialog(true)
      if(props.setEditable){
        props.setEditable(false);
      }
      //imposta come non editable!
      timeoutID= setTimeout(()=>{
       setShowDialog(false)
      },3000)
    }
    return ()=>clearTimeout(timeoutID);
  },[success])




  const submitOrder = async ()=>{
     const ordini = props.cart;
     if(ordini.length<=0){
       return
     }
     const idTavolo = TableCTX.state.tavolo?.codiceTavolo;
     const idUtente = TableCTX.state.utente?.id;

     if(!idTavolo || !idUtente){
       return
     }

    const body:OrderRequest = {idTavolo:idTavolo,idUtente:idUtente,piatti:ordini}
    await sendRequest(body,TableCTX.aggiornaInfoTavolo)
    
    
  }
  return (
    <Modal onClose={props.onClose}>
      {isLoading && <Spinner></Spinner>} 
      {success && showDialog && <Dialog success={success} message="Ordinazione effettuata con successo" showDialog={success}></Dialog>}
      {!!error && showDialog && <Dialog success={false} message={error} showDialog={!!error}></Dialog>}
      <div className={styles["cart-wrapper"]}>
        <i onClick={props.onClose}>&#10006;</i>
        <h5>Ordinazioni</h5>
          {error}
        <ul>
          {sortedCart.map((item) => {
            return <CartItem item={item} key={item.id} editable={props.editable}></CartItem>;
          })}
        </ul>
        <div className={styles['button-area']}>
          {props.cart.length>0 && props.editable && <Button onClick={submitOrder}>Ordina</Button>}
          
        </div>
      </div>
    </Modal>
  );
};
