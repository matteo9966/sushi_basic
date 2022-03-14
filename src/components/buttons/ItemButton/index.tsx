import React,{useContext,useState,useEffect} from 'react'
import styles from './itemButton.module.css';
import { CartContext } from '../../../store/Cart-Context';
export const ItemButton:React.FC<{id:number}>= ({id}) => {
  const ctx = useContext(CartContext);
  const [selected,setSelected] =useState(false);
   const cartItems = ctx.state.cart;
   
   useEffect(()=>{
    //se id non è in carrello rimuovo 
    const item = cartItems.find(item=>item.id===id);
    if(!item){
      setSelected(false)
    }

   },[cartItems,id])

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
