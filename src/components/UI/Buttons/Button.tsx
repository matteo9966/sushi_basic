import React from 'react'
import styles from './button.module.css';
export const Button:React.FC<{onClick:()=>void}> = (props) => {
  return (
    <button onClick={props.onClick} className={styles['custom-button']}>
        {props.children}
    </button>
  )
}
