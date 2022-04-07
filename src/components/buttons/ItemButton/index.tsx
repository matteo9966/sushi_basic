import React,{useContext,useState,useEffect} from 'react'
import styles from './itemButton.module.css';
import { CartContext } from '../../../store/Cart-Context';
export const ItemButton:React.FC<{id:number;editable:boolean}>= ({id,editable}) => {
  const ctx = useContext(CartContext);
  const [selected,setSelected] =useState(false);
   const cartItems = ctx.state.cart;
   
   useEffect(()=>{
    
    const item = cartItems.find(item=>item.id===id);
    if(!item){
      setSelected(false)
    }
    if(item){
      setSelected(true)
    }

   },[cartItems,id])

   const buttonStyle = selected ? `${styles.button} ${styles.selected}` : styles.button

  const onClickHandler=(event:React.MouseEvent<HTMLElement>)=>{
    if(!editable)return
    //se è editabile allora posso cliccarci sopra altrimenti i  bottoni sono bloccati e nn fa nulla
    if(selected){
      setSelected(false)
    }
    else {
      setSelected(true);
    }
    ctx.addItem({id:id});
  }

  return (
    <div  className={buttonStyle} onClick={onClickHandler}>{id}</div>
  )
}
