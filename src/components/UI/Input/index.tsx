import React, { Fragment } from "react";
import styles from "./input.module.css";
type onChange = (event: React.FormEvent<HTMLInputElement>) => void;
type onBlur = () => void;
type onFocus = () => void;
export const Input: React.FC<{
  type?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  label?: string;
  value?: string;
  hasError?:boolean;
  onChange?: onChange;
  onBlur?:onBlur;
  onFocus?:onFocus;
}> = ({ type, name, id, placeholder, label, value,onChange,onBlur,onFocus,hasError }) => {
 
  const inputstyle = (!hasError) ? styles.input : `${styles.input} ${styles.errorBorder}`
  const placeHolderWError = (!hasError)? placeholder  : `${name} non valido...`;
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        className={inputstyle}
        type={type}
        name={name}
        id={id}
        placeholder={placeHolderWError}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
};
