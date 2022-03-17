import React, { Fragment } from 'react'
import styles from './input.module.css';
export const Input:React.FC<{type:string,placeholder:string,name:string,id:string,label:string}> = ({type,name,id,placeholder,label}) => {
  return (
      <div className={styles['input-container']}>

          <label htmlFor={name}>{label}</label>
         <input className={styles.input} type={type} name={name} id={id} placeholder={placeholder}/>
      </div>
      
  )
}
