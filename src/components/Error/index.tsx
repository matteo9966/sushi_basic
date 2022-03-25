import React from 'react'
import styles from './error.module.css';
export const Error:React.FC<{message:string,showError:boolean}> = (props) => {

  
if(!props.showError){
    return <></>
}

  return (
    <div className={styles.error}>
        <p>{props.message}</p>
    </div>
  )
}
