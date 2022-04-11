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
import {ProtectedRoute} from './utils/protectedRoutes/index';


const Protected:React.FC<{children:React.ReactElement,loggedIn:boolean}> = (props)=><ProtectedRoute redirectTo="/" loggedIn={props.loggedIn}>{props.children}</ProtectedRoute>

function App() {
  const [showCart, setShowCart] = useState(false);
  const [loggedIn,setLoggedIn] =useState(false);
  const [cartEditable, setCartEditable] = useState(true);
  const [ordineEffettuato,setOrdineEffettuato]=useState(false);
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


  const updateStateOrder=(ordinato:boolean)=>setOrdineEffettuato(ordinato) //spostare la logica in un context 
  
  const rendiCartModificabile=(modificabile:boolean)=>{
    console.log("sto rendendo modificabile l'ordine!!")
    if(modificabile){
      setCartEditable(true)
      setOrdineEffettuato(false);
    }
    
  }

  return (
    <div className="App">
    
          {showCart && (
            <Cart onClose={hideCartHandler} editable={cartEditable} cart={cartCTX.state.cart} setEditable={setCartEditable} ordineEffettuato={ordineEffettuato} setOrdineEffettuato={updateStateOrder}></Cart>
          )}
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path={paths.CREATAVOLO}
              element={<CreaTavolo 
                loggedIn={loggedIn}
                setIsLoggedIn={setLoggedIn}
                ></CreaTavolo>}
            />
            <Route
              path={paths.AGGIUNGITI}
              element={<Aggiungiti setCartEditable={setCartEditable} updateStateOrder={updateStateOrder}    loggedIn={loggedIn}
              setIsLoggedIn={setLoggedIn}> </Aggiungiti>}
            />
            <Route path={paths.HOME} element={
               <Protected loggedIn={loggedIn}>
                 <Layout></Layout>
               </Protected>
            }>
             
              <Route
                index
                element={
             
                  <Menu onOpenCart={showCartHandler(cartEditable)} editableButton={cartEditable}></Menu>
              
              }
              ></Route>

              <Route
                path={paths.MENU}
                element={<Menu onOpenCart={showCartHandler(cartEditable)} editableButton={cartEditable}></Menu>}
              ></Route>

              <Route
                path={paths.CONDIVIDICODICE}
                element={<CondivisioneCodice></CondivisioneCodice>}
              ></Route>
              <Route
                path={paths.ORDINI}
                element={<Ordini onOpenCart={showCartHandler(true) } ordineEffettuato={ordineEffettuato} setOrdineModificabile={rendiCartModificabile}></Ordini>}
              ></Route>
            </Route>
          </Routes>
    
    </div>
  );
}

export default App;
