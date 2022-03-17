import React,{useState} from "react";

import { CartProvider } from "./store/CartProvider";

// import { Home } from "./pages/Home";
import {Cart} from './components/cart';
import {CreaTavolo} from './pages/CreaTavolo';
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
        {/* <Home></Home> */}
        <CreaTavolo></CreaTavolo>
      </CartProvider>
    </div>
  );
}

export default App;
