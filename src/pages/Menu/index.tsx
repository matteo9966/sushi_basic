import { Navbar } from "../../components/header";
import { ButtonContainer } from "../../components/ButtonContainer/ButtonContainer";
import styles from './menu.module.css';
import React, { Fragment } from 'react'

export const Menu:React.FC<{onOpenCart:()=>void}> = ({onOpenCart}) => {
  return (
    <Fragment>
      <div className={styles['main-container']}>
        <Navbar onOpenCart={onOpenCart}></Navbar>
        <ButtonContainer></ButtonContainer>

      </div>
        
    </Fragment>
  )
}
