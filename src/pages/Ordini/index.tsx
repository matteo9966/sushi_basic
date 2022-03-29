import React from 'react'
import { Utente } from '../../components/Utente'
import styles from './ordini.module.css';
const listaUtentiFasulli=Array.from({length:15},(_,i)=>({nome:`matteo ${i}`,ordinazioni:i}))
export const Ordini = () => {
  return (
    <div>
            <h4 className={styles.titolo}>Coperti</h4>
        <div className={styles.utenti}>
           <ul>
              {listaUtentiFasulli.map(utente=>(<Utente key={utente.nome} nome={utente.nome} numeroOrdinazioni={utente.ordinazioni}></Utente>))} 
           </ul>
        </div>
        <div className="ordinazione-btn">

        </div>


    </div>
  )
}
