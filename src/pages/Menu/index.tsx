import { Navbar } from "../../components/header";
import { ButtonContainer } from "../../components/ButtonContainer/ButtonContainer";

import React, { Fragment } from 'react'

export const Menu:React.FC<{onOpenCart:()=>void}> = ({onOpenCart}) => {
  return (
    <Fragment>
        <Navbar onOpenCart={onOpenCart}></Navbar>
        <ButtonContainer></ButtonContainer>
    </Fragment>
  )
}
