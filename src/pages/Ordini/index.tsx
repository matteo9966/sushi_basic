import React,{useContext,useEffect,useState} from 'react'
import { Button } from '../../components/UI/Buttons/Button';
import { Utente } from '../../components/Utente'
import { HttpOrdini } from '../../fetch/HttpOrdini';
import styles from './ordini.module.css';
import { TableContext } from '../../store/Table-Context';
import { useHttp } from '../../custom-hooks/use-http';
import { IItem } from '../../interfaces/IItem';
import { ITable } from '../../interfaces/ITable';
const listaUtentiFasulli=Array.from({length:15},(_,i)=>({nome:`matteo ${i}`,ordinazioni:i}))
export const Ordini = () => {
  const [ordine,setOrdine]=useState<{tavolo:ITable,ordine:IItem[]}>()
  const { error, isLoading, sendRequest } = useHttp<
  string,
  { tavolo: ITable; ordine: IItem[] }
>(HttpOrdini.getCompletOrder);

  const tableCTX = useContext(TableContext);

  

  useEffect( ()=>{ //quando carica la pagina
    (async ()=>{
      if(!tableCTX.state.tavolo?.codiceTavolo){return}
      await sendRequest(tableCTX.state.tavolo?.codiceTavolo,setOrdine)  

    })()
  },[])


  const onClickHandler = async ()=>{
    if(!tableCTX.state.tavolo?.codiceTavolo){return}
    await sendRequest(tableCTX.state.tavolo?.codiceTavolo,setOrdine) 
  }
  
  const utentiAlTavolo = ordine?.tavolo.utenti || [] ; 
  // useEffect(()=>{
    
  // },[])

  return (
    <div className={styles['ordini-wrapper']}>
            <h4 className={styles.titolo}>Coperti</h4>
        <div className={styles.utenti}>
           <ul>
              {utentiAlTavolo.map(utente=>(<Utente key={utente.nome} nome={utente.nome ||"" } numeroOrdinazioni={utente.ordinazione?.length || 0}></Utente>))} 
           </ul>
        </div>

        <div className={styles["ordinazione-btn-wrapper"]}>
             <Button onClick={async ()=>{
               if(!tableCTX.state.tavolo?.codiceTavolo){return}
               await HttpOrdini.getCompletOrder(tableCTX.state.tavolo?.codiceTavolo)}}>Ordine Tavolo</Button>
             <Button >Aggiorna</Button>
        </div>


    </div>
  )
}
