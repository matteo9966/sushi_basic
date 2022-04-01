import React,{useEffect,useState} from 'react'
import styles from './error.module.css';

export const Error:React.FC<{message:string,showError:boolean}> = (props) => {
  const [showError,setShowError]=useState(false);
 
  useEffect(()=>{
    setShowError(props.showError);
    const timeoutID = setTimeout(()=>{
    return ()=>clearTimeout(timeoutID); 
    },3000)

  },[props.showError])
  
if(!showError){
    return <></>
}

  return (
    <div className={styles.error}>
        <p>{props.message}</p>
    </div>
  )
}
