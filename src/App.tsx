import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./store/CartProvider";
import { TableProvider } from "./store/TableProvider";
import { paths } from "./globals/paths";
// import { Home } from "./pages/Home";
import { Cart } from "./components/cart";
import { CreaTavolo } from "./pages/CreaTavolo";
import { Aggiungiti } from "./pages/Aggiungiti";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import {CondivisioneCodice} from './pages/CondivisioneCodice'
import { Layout } from "./components/UI/Layout";
import { Ordini } from "./pages/Ordini";
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
    <TableProvider>
      <CartProvider>
        {showCart && <Cart onClose={hideCartHandler}></Cart>}
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
            <Route path={paths.CREATAVOLO} element={<CreaTavolo></CreaTavolo>} />
            <Route path={paths.AGGIUNGITI} element={<Aggiungiti></Aggiungiti>} />
            <Route path={paths.HOME} element={<Layout></Layout>}>
              <Route index element={<Menu onOpenCart={showCartHandler}></Menu>}></Route>
              <Route path={paths.MENU} element={<Menu onOpenCart={showCartHandler}></Menu>}></Route>
              <Route path={paths.CONDIVIDICODICE} element={<CondivisioneCodice></CondivisioneCodice>}></Route>
              <Route path={paths.ORDINI} element={<Ordini></Ordini>}></Route>
              
            </Route>
        </Routes>
      </CartProvider>
    </TableProvider>
    </div>
  );
}

export default App;
