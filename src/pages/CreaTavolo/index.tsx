import React from "react";
import { Button } from "../../components/UI/Buttons/Button";
import { Input } from "../../components/UI/Input";
import styles from "./creaTavolo.module.css";
import { useInput } from "../../custom-hooks/use-input";
import { validators } from "../../utils/validators/validators";
export const CreaTavolo = () => {
  const {
    value: nomeValue,
    hasError: nomeHasError,
    changeValueHandler: changeNomeValueHandler,
    blurInputHandler: blurNomeInputHandler,
    resetInputHanler: resetNomeInputHanler,
    focusInputHandler: focusNomeHandler,
  } = useInput(validators.minLength(2), validators.maxLength(20));

  const {
    value: copertiValue,
    hasError: copertiHasError,
    changeValueHandler: changeCopertiValueHandler,
    blurInputHandler: blurCopertiInputHandler,
    resetInputHanler: resetCopertiInputHanler,
    focusInputHandler: focusCopertiHandler,
  } = useInput(
    validators.minLength(1),
    validators.maxLength(3),
    validators.isInteger()
  );

  const {
    value: numeroPiattiValue,
    hasError: numeroPiattiHasError,
    changeValueHandler: changeNumeroPiattiValueHandler,
    blurInputHandler: blurNumeroPiattiInputHandler,
    resetInputHanler: resetnumeroPiattiInputHanler,
    focusInputHandler: focusNumeroPiattiHandler,
  } = useInput(
    validators.minLength(1),
    validators.maxLength(3),
    validators.isInteger()
  );

  // console.log({nomeHasError,codiceTavoloHasError,copertiHasError,numeroPiattiHasError})
  
   const resetInputs = ()=>{
     resetCopertiInputHanler();
     resetnumeroPiattiInputHanler();
     resetNomeInputHanler();
   }

  const onClickHandler = () => {
    if(!nomeHasError && !numeroPiattiHasError && !copertiHasError){
      console.table({ nomeValue, numeroPiattiValue, copertiValue });
      resetInputs();
    
    }

  };

  console.log({ nomeHasError });
  return (
    <div className={styles.creatavolo}>
      <h3>Crea un tavolo</h3>
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
          hasError={copertiHasError}
          onFocus={focusCopertiHandler}
          onChange={changeCopertiValueHandler}
          onBlur={blurCopertiInputHandler}
          value={copertiValue}
          label="Numero coperti"
          id="coperti"
          placeholder="Coperti..."
          type="number"
          name="coperti"
        ></Input>

        <Input
          hasError={numeroPiattiHasError}
          onFocus={focusNumeroPiattiHandler}
          onChange={changeNumeroPiattiValueHandler}
          onBlur={blurNumeroPiattiInputHandler}
          value={numeroPiattiValue}
          label="Numero piatti"
          id="numero-piatti"
          placeholder="Numero piatti..."
          type="number"
          name="piatti"
        ></Input>
      </span>
      <Button onClick={onClickHandler}>Crea tavolo</Button>
    </div>
  );
};
