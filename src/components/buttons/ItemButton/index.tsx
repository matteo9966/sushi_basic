import React,{useContext,useState,useEffect} from 'react'
import styles from './itemButton.module.css';
import { CartContext } from '../../../store/Cart-Context';
export const ItemButton:React.FC<{id:number}>= ({id}) => {
  const ctx = useContext(CartContext);
  const [selected,setSelected] =useState(false);
   const cartItems = ctx.state.cart;
   useEffect(()=>{
     console.log("devo aggiornare il bordo dei tasti selezionati")
   },[cartItems])

   const buttonStyle = selected ? `${styles.button} ${styles.selected}` : styles.button

  const onClickHandler=(event:React.MouseEvent<HTMLElement>)=>{
    
    if(selected){
      setSelected(false)
    }
    else {
      setSelected(true);
    }
    ctx.addItem({amount:1,id:id});
  }

  return (
    <div  className={buttonStyle} onClick={onClickHandler}>{id}</div>
  )
}
