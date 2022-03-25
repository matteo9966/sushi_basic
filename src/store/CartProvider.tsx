import { CartContext } from "./Cart-Context";
import React, { useReducer } from "react";
import { IItem, IItemCart } from "../interfaces/IItem";

type Action =
  | { type: "ADD"; item: IItem }
  | { type: "REMOVE"; itemID: number }
  | { type: "UPDATE COUNT"; item: IItem; amount: number }
  // | { type: "UPDATE ITEMS LIST"; qnt:number};
type State = {  cart: IItemCart[] };
// type Item = {id:number,amount:number}
type Reducer = (state: State, action: Action) => State;

function removeItemFromCart(cart: IItemCart[], id: number) {
  const item = cart.find((item) => item.id === id);
  if (!item) {
    return cart;
  }
  let cartCopy = [...cart];
  cartCopy = cartCopy.filter((item) => item.id !== id);
  return cartCopy;
}

const defaultState: State = { cart: [] };

/**
 * @description
 * - ADD : fa il toggle tra aggiungi e rimuovi, se item non c'è lo aggiunge altrimenti se c'è lo rimuove
 * - REMOVE : cerca elemento, se c'è fai il filter
 * - UPDATE COUNT può aggiungere e sottrarre un elemento al cart, se la somma della quantità diventa 1 rimuovi
 *  */

const reducerFunction: Reducer = (state: State, action: Action) => {
  if (action.type === "ADD") {
    let cart = [...state.cart];
    const item = cart.find((item) => item.id === action.item.id);
    if (!item) {
      cart.push({id:action.item.id,qnt:1});
    } else {
      cart = state.cart.filter((item) => item.id !== action.item.id);
    }

    return { ...state, cart: cart };
  }
  /* TODO: aggiornare la logica prevedendo il fatto che nel carrello ci sono sempre tutti gli elementi ma con un amount variabile da 0 a X */
  if (action.type === "REMOVE") {
    const filteredCart = removeItemFromCart(state.cart, action.itemID);
    return { ...state, cart: filteredCart };
  }

  if (action.type === "UPDATE COUNT") {
    const item = state.cart.find((item) => item.id === action.item.id);
    if (!item) {
      return state;
    }
    const updatedItem = { ...item };
    updatedItem.qnt = updatedItem.qnt + action.amount;
    let newState;
    const filteredCart = removeItemFromCart(state.cart, action.item.id); // rimuovo l'elemento con il count <0
    newState = { ...state, cart: filteredCart };
    if (updatedItem.qnt <= 0) {
      //se updatedItem non ha un contatore > 0 non lo aggiungo nuovamente
      return newState;
    }

    newState.cart.push(updatedItem); //aggiungo l'item con il contatore aggiornato
    return newState;
  }

  // if(action.type==="UPDATE ITEMS LIST"){
  //   const quantita = action.qnt;
  //   if(quantita<=0){
  //     return state
  //   }
  //   let items:IItem[] = Array.from({length:quantita},(_,index)=>({id:index+1})) 
  //   let newState:State = {cart:[]};
  //   return newState
  

  // }

  return defaultState;
};

export const CartProvider: React.FC = (props) => {
  const [cartState, dispatch] = useReducer(reducerFunction, defaultState);
  const addItemToCart = (item: IItem) => {
    dispatch({ type: "ADD", item: item });
  };
  const removeItemFromCart = (itemID: number) => {
    dispatch({ type: "REMOVE", itemID: itemID });
  };

  const updateCartItem = (item: IItem, amount: number) => {
    dispatch({ type: "UPDATE COUNT", amount: amount, item: item });
  };

  const contextValue: any = {
    // items: [],
    addItem: (item: IItem) => {},
    removeItem: (itemID: number) => {},
    updateItemCount: (item: IItem, amount: number) => {},
  };

  contextValue.addItem = addItemToCart;
  contextValue.removeItem = removeItemFromCart;
  contextValue.updateItemCount = updateCartItem;
  contextValue.state = cartState;

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
