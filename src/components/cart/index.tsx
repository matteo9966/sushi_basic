import React, { useContext,useEffect } from "react";
import styles from "./cart.module.css";
import { Modal } from "../UI/Modal";
import { CartContext } from "../../store/Cart-Context";
import { CartItem } from "./cart-item";
import { Button } from "../UI/Buttons/Button";
import { TableContext } from "../../store/Table-Context";
import { useHttp } from "../../custom-hooks/use-http";
import { OrderRequest } from "../../types/CreateOrder/OrderRequest";
import { HttpOrdini } from "../../fetch/HttpOrdini";
import { ITable } from "../../interfaces/ITable";
import { Spinner } from "../UI/Spinner";

export const Cart: React.FC<{ onClose: () => void }> = (props) => {
  const ctx = useContext(CartContext);
  const sortedCart = ctx.state.cart.sort((itemA, itemB) => itemA.id - itemB.id);
  const TableCTX = useContext(TableContext);
  const { error, isLoading, sendRequest } = useHttp<OrderRequest,ITable>(HttpOrdini.newOrder);

  useEffect(()=>{
    if(TableCTX.state.tavolo && TableCTX.state.tavolo.utenti){
      console.log(TableCTX.state.tavolo);
    }
  },[error,TableCTX.state])




  const submitOrder = async ()=>{
     const ordini = ctx.state.cart;
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
      {isLoading && <Spinner></Spinner>} {/* é da vedere che succede... */}
      <div className={styles["cart-wrapper"]}>
        <i onClick={props.onClose}>&#10006;</i>
        <h5>Ordinazioni</h5>
        <ul>
          {sortedCart.map((item) => {
            return <CartItem item={item} key={item.id}></CartItem>;
          })}
        </ul>
        <div className={styles['button-area']}>
          {ctx.state.cart.length>0 && <Button onClick={submitOrder}>Ordina</Button>}
          
        </div>
      </div>
    </Modal>
  );
};
