import React,{FC, useContext} from "react";
import sushicat from "../../assets/sushicat.png";
import styles from "./Navbar.module.css";
import { LogoHeader } from "../LogoHeader";
import { CartContext } from '../../store/Cart-Context';
export const Navbar:FC<{onOpenCart:()=>void}> = (props) => {
    const ctx = useContext(CartContext);
    const amount  = ctx.state.cart.length;


  return (
    <div className={styles["navbar-container"]}>
      <LogoHeader></LogoHeader>

      <div className={styles["cart-button-area"]}>
        <button onClick={props.onOpenCart}>
          <span className={styles["ordinazioni-button-logo"]}></span>{" "}
          <span className={styles.carrello}>Carrello</span>{" "}
          <span className={styles.counter}>{amount}</span>
          <span className={styles["ordinazioni-button-logo"]}></span>
        </button>
      </div>
    </div>
  );
};
