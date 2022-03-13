import styles from './buttonContainer.module.css';
import React,{useContext} from 'react';
import { CartContext } from '../../store/Cart-Context';
import { ItemButton } from '../buttons/ItemButton';


export const ButtonContainer = () => {
  const ctx = useContext(CartContext);
  return (
    <div className={styles.container}>
        {ctx.state.items.map(item=>{
          return (<ItemButton key={item.id} id={item.id}></ItemButton>)
        })}
    </div>
  )
}
