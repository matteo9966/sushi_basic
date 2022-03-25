import React from 'react'
import styles from './dialog.module.css';
export const Dialog:React.FC<{message:string,showDialog:boolean,success:boolean}> = (props) => {


  
if(!props.showDialog){
    return <></>
}

const style = props.success ? styles.success : styles.error


  return (
    <div className={style}>
        <p>{props.message}</p>
    </div>
  )
}
