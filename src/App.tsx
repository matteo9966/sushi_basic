import React, { useState,useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { CartContext } from "./store/Cart-Context";
import { paths } from "./globals/paths";
// import { Home } from "./pages/Home";
import { Cart } from "./components/cart";
import { CreaTavolo } from "./pages/CreaTavolo";
import { Aggiungiti } from "./pages/Aggiungiti";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { CondivisioneCodice } from "./pages/CondivisioneCodice";
import { Layout } from "./components/UI/Layout";
import { Ordini } from "./pages/Ordini";
function App() {
  const [showCart, setShowCart] = useState(false);
  const [cartEditable, setCartEditable] = useState(false);
  const cartCTX = useContext(CartContext);
  const showCartHandler = (setEditable: boolean) => {
    return () => {
      setCartEditable(setEditable);
      setShowCart(true);
    };
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <div className="App">
    
          {showCart && (
            <Cart onClose={hideCartHandler} editable={cartEditable} cart={cartCTX.state.cart}></Cart>
          )}
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path={paths.CREATAVOLO}
              element={<CreaTavolo></CreaTavolo>}
            />
            <Route
              path={paths.AGGIUNGITI}
              element={<Aggiungiti></Aggiungiti>}
            />
            <Route path={paths.HOME} element={<Layout></Layout>}>
              <Route
                index
                element={<Menu onOpenCart={showCartHandler(true)}></Menu>}
              ></Route>
              <Route
                path={paths.MENU}
                element={<Menu onOpenCart={showCartHandler(true)}></Menu>}
              ></Route>
              <Route
                path={paths.CONDIVIDICODICE}
                element={<CondivisioneCodice></CondivisioneCodice>}
              ></Route>
              <Route
                path={paths.ORDINI}
                element={<Ordini onOpenCart={showCartHandler(true)}></Ordini>}
              ></Route>
            </Route>
          </Routes>
    
    </div>
  );
}

export default App;
