import React from "react";
import { ButtonContainer } from "./components/ButtonContainer/ButtonContainer";
import { CartProvider } from "./store/CartProvider";
import { Navbar } from "./components/header";
function App() {
  return (
    <div className="App">
      <CartProvider>
        <Navbar></Navbar>
        <ButtonContainer></ButtonContainer>
      </CartProvider>
    </div>
  );
}

export default App;
