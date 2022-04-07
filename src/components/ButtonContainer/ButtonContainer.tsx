import styles from "./buttonContainer.module.css";
import React, { useContext } from "react";
import { TableContext } from "../../store/Table-Context";
import { ItemButton } from "../buttons/ItemButton";

export const ButtonContainer:React.FC<{editable:boolean}> = (props) => {
  const ctx = useContext(TableContext);
  const numeroPortate = ctx.state.tavolo && ctx.state.tavolo.portate;
  if (!numeroPortate) {
    return <></>;
  }

  let arrayDinumeriPortate = Array.from({ length: numeroPortate }, (_, i) => {
    return i + 1;
  });

  return (
    <div className={styles.container}>
      {arrayDinumeriPortate.map((item) => {
        return <ItemButton key={item} id={item} editable={props.editable}></ItemButton>;
      })}
    </div>
  );
};
