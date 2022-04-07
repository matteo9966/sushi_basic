import { Navbar } from "../../components/header";
import { ButtonContainer } from "../../components/ButtonContainer/ButtonContainer";
import styles from './menu.module.css';
import React, { Fragment } from 'react'

export const Menu:React.FC<{onOpenCart:()=>void,editableButton:boolean}> = ({onOpenCart,editableButton}) => {
  return (
    <Fragment>
      <div className={styles['main-container']}>
        <Navbar onOpenCart={onOpenCart}></Navbar>
        <ButtonContainer editable={editableButton}></ButtonContainer>

      </div>
        
    </Fragment>
  )
}
