import React, { useContext } from "react";
import styles from "./cart.module.css";
import { Modal } from "../UI/Modal";
import { CartContext } from "../../store/Cart-Context";
import { CartItem } from "./cart-item";
export const Cart: React.FC<{ onClose: () => void }> = (props) => {
  const ctx = useContext(CartContext);

  return (
    <Modal onClose={props.onClose}>
      <div className={styles["cart-wrapper"]}>
        <i onClick={props.onClose}>&#10006;</i>
        <h5>Ordinazioni</h5>
        <ul>
          {ctx.state.cart.map((item) => {
            return <CartItem item={item} key={item.id}></CartItem>;
          })}
        </ul>
      </div>
    </Modal>
  );
};
