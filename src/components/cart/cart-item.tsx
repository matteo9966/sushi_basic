import React from 'react'
import { IItem } from '../../interfaces/IItem'
import styles from './cartitem.module.css'
export const CartItem:React.FC<{item:IItem}> = (props) => {
  return (
    <li className={styles['list-style']}>
        <p className={styles.title}><i>🍣</i>{props.item.id} </p>
        <span className={styles.amount}>
         <i>-</i>{props.item.amount}<i>+</i>
         <i>&#10006;</i>
        </span>
    </li>
  )
}
