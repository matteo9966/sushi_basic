import React,{useContext} from 'react'
import { IItem, IItemCart } from '../../interfaces/IItem'
import styles from './cartitem.module.css'
import { CartContext } from '../../store/Cart-Context'
export const CartItem:React.FC<{item:IItemCart,editable:boolean}> = (props) => {
  const ctx = useContext(CartContext);
  
  let quantita = <></> 

  if(props.editable){
    quantita = <>
      <i onClick={()=>ctx.updateItemCount(props.item,-1)}>-</i>{props.item.qnt}<i onClick={()=>ctx.updateItemCount(props.item,1)}>+</i>
         <i onClick={()=>ctx.removeItem(props.item.id)}>&#10006;</i>
    </>
  }
  if(!props.editable){
    quantita = <>{props.item.qnt}</>
  }

  return (
    <li key={props.item.id} className={styles['list-style']}>
        <p className={styles.title}><i>🍣</i>{props.item.id} </p>
        <span className={styles.amount}>
          {quantita}
         {/* <i onClick={()=>ctx.updateItemCount(props.item,-1)}>-</i>{props.item.qnt}<i onClick={()=>ctx.updateItemCount(props.item,1)}>+</i>
         <i onClick={()=>ctx.removeItem(props.item.id)}>&#10006;</i> */}
        </span>
    </li>
  )
}
