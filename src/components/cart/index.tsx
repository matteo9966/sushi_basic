import React, { useContext } from "react";
import styles from "./cart.module.css";
import { Modal } from "../UI/Modal";
import { CartContext } from "../../store/Cart-Context";
import { CartItem } from "./cart-item";
import { Button } from "../UI/Buttons/Button";
export const Cart: React.FC<{ onClose: () => void }> = (props) => {
  const ctx = useContext(CartContext);
  const sortedCart = ctx.state.cart.sort((itemA, itemB) => itemA.id - itemB.id);
  return (
    <Modal onClose={props.onClose}>
      <div className={styles["cart-wrapper"]}>
        <i onClick={props.onClose}>&#10006;</i>
        <h5>Ordinazioni</h5>
        <ul>
          {sortedCart.map((item) => {
            return <CartItem item={item} key={item.id}></CartItem>;
          })}
        </ul>
        <div className={styles['button-area']}>
          {ctx.state.cart.length>0 && <Button onClick={() => {}}>Ordina</Button>}
          
        </div>
      </div>
    </Modal>
  );
};
