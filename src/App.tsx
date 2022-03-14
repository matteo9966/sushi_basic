import React,{useState} from "react";
import { ButtonContainer } from "./components/ButtonContainer/ButtonContainer";
import { CartProvider } from "./store/CartProvider";
import { Navbar } from "./components/header";
import {Cart} from './components/cart';
function App() {
  const [showCart,setShowCart] = useState(false);
   
  const showCartHandler  =()=>{
    setShowCart(true)
  }
  const hideCartHandler = ()=>{
    setShowCart(false)
  }

  return (
    <div className="App">
    
      <CartProvider>
        {showCart && <Cart onClose={hideCartHandler}></Cart>}
        <Navbar onOpenCart={showCartHandler}></Navbar>
        <ButtonContainer></ButtonContainer>
      </CartProvider>
    </div>
  );
}

export default App;
