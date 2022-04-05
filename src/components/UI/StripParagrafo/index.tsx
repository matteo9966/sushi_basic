import React from 'react'
import styles from './strip.module.css';
/**
 * @description una stringa di testo orizzontale con un messaggio personalizzato
 * 
 */
export const Strip:React.FC<{classlist?:string[]}> = (props) => {
  return (
    <span className={`${styles["paragraph-strip"]} ${props.classlist && props.classlist.join(' ')}`}>
    <p>{props.children}</p>
  </span>
  )
}
