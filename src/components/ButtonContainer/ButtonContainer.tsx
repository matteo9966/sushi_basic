import styles from "./buttonContainer.module.css";
import React, { Fragment, useContext } from "react";
import { CartContext } from "../../store/Cart-Context";
import { TableContext } from "../../store/Table-Context";
import { ItemButton } from "../buttons/ItemButton";

export const ButtonContainer = () => {
  const ctx = useContext(TableContext);
  const numeroPortate = ctx.state.portate;
  if (!numeroPortate) {
    return <></>;
  }

  let arrayDinumeriPortate = Array.from({ length: numeroPortate }, (_, i) => {
    return i + 1;
  });

  return (
    <div className={styles.container}>
      {arrayDinumeriPortate.map((item) => {
        return <ItemButton key={item} id={item}></ItemButton>;
      })}
    </div>
  );
};
