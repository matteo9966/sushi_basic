import React,{useContext} from 'react'
import styles from './itemButton.module.css';
import { CartContext } from '../../../store/Cart-Context';
export const ItemButton:React.FC<{id:number}>= ({id}) => {
  const ctx = useContext(CartContext);

  const onClickHandler=(event:React.MouseEvent<HTMLElement>)=>{
    console.log('clicked!')
    ctx.addItem({amount:1,id:id});
  }

  return (
    <div className={styles.button} onClick={onClickHandler}>{id}</div>
  )
}
