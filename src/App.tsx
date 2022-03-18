import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./store/CartProvider";
import { paths } from "./globals/paths";
// import { Home } from "./pages/Home";
import { Cart } from "./components/cart";
import { CreaTavolo } from "./pages/CreaTavolo";
import { Home } from "./pages/Home";
function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <div className="App">
      <CartProvider>
        {showCart && <Cart onClose={hideCartHandler}></Cart>}

        <Routes>
          <Route path="/" element={<Home></Home>}>
          </Route>
            <Route path={paths.CREATAVOLO} element={<CreaTavolo></CreaTavolo>} />
            <Route path={paths.AGGIUNGITI} element={<CreaTavolo></CreaTavolo>} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
