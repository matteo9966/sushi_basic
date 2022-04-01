import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./store/CartProvider";
import { TableProvider } from "./store/TableProvider";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <TableProvider>
        <CartProvider>
      <App />
      </CartProvider>
      </TableProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
