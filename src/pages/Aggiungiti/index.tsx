import React from "react";

import { Button } from "../../components/UI/Buttons/Button";
import { Input } from "../../components/UI/Input";
import styles from "./aggiungiti.module.css";
import { useInput } from "../../custom-hooks/use-input";
import { validators } from "../../utils/validators/validators";
export const Aggiungiti = () => {
  const {
    value: nomeValue,
    hasError: nomeHasError,
    changeValueHandler: changeNomeValueHandler,
    blurInputHandler: blurNomeInputHandler,
    resetInputHanler: resetNomeInputHanler,
    focusInputHandler: focusNomeHandler,
  } = useInput(validators.minLength(2), validators.maxLength(20));

  const {
    value: codiceTavoloValue,
    hasError: codiceTavoloHasError,
    changeValueHandler: changeCodiceTavoloValueHandler,
    blurInputHandler: blurcodiceTavoloInputHandler,
    resetInputHanler: resetcodiceTavoloInputHanler,
    focusInputHandler: focusCodiceTavoloHandler,
  } = useInput(validators.minLength(2));

  const onClickHandler = () => {
    if (!codiceTavoloHasError && !nomeHasError && !codiceTavoloHasError) {
      console.table({ nomeValue, codiceTavoloValue });
    }
  };

  console.log({ nomeHasError });
  return (
    <div className={styles.aggiungiti}>
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
