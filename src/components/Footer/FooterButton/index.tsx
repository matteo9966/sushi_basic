import React from 'react'
import styles from './footerButton.module.css';
import { useNavigate } from 'react-router-dom';
export const FooterButton:React.FC<{titolo:string,img:string,to:string}> = (props) => {
  const navigator = useNavigate();
  const onClick = ()=>{
    navigator(props.to);
  }
  return (
  <div onClick={onClick} className={styles['button-wrapper']}>
<img className={styles.logo} src={props.img} alt="" />
       <span className={styles.titolo}>
      <p >{props.titolo}</p>
       </span>
    
  </div>
  )
}
