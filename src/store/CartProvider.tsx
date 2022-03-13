import { CartContext } from "./Cart-Context";
import React,{ useReducer} from 'react';
import {IItem} from '../interfaces/IItem'
import {dummy_items} from './DUMMY_DATA';
type Action = {type:'ADD',item:IItem}|{type:'REMOVE',itemID:number}|{type:'UPDATE COUNT',item:IItem,amount:number}
type State = {items:IItem[],cart:IItem[]};
// type Item = {id:number,amount:number}
type Reducer = (state:State,action:Action)=>State;

function itemsWithAmountGT0 (items:IItem[]):number{
    const amount = items.filter(item=>item.amount>0).length;
    return amount;
}

const defaultState:State={items:dummy_items,cart:[]};




const reducerFunction:Reducer = (state:State,action:Action)=>{
    if(action.type==='ADD'){
      const cart = [...state.cart]
      const item = cart.find(item=>item.id===action.item.id);
      if(!item){
          cart.push(action.item);
      }
      else {
          item.amount=item.amount+action.item.amount;
      }

      return {...state,cart:cart}
      
    }
    /* TODO: aggiornare la logica prevedendo il fatto che nel carrello ci sono sempre tutti gli elementi ma con un amount variabile da 0 a X */
    // if(action.type==='REMOVE'){
    //   const filteredArray = state.items.filter(item=>item.id!==action.itemID);
    //   const newState:State = {amount:filteredArray.length,items:filteredArray}
    //   return newState
    // }
    // if(action.type==='UPDATE COUNT'){
    //     const indexOfEl = state.items.map(el=>el.id).indexOf(action.item.id)
        
    //     if (indexOfEl > -1) {
    //         const updatedItem:IItem =  {amount:state.items[indexOfEl].amount,id:state.items[indexOfEl].id};
    //         if(updatedItem.amount+action.amount>=0){
    //             updatedItem.amount=updatedItem.amount+action.amount;
    //         }
    //         const newList = [...state.items,updatedItem];
    //         return {items:newList,amount:newList.length}
    //       }
          
    //     }
        
        return defaultState;
    

    }



export const CartProvider:React.FC = (props) => {

  const [cartState,dispatch] = useReducer(reducerFunction,defaultState);
  const addItemToCart = (item:IItem)=>{
      dispatch({type:'ADD',item:item})
  }
  const removeItemFromCart = (itemID:number)=>{
      dispatch({type:'REMOVE',itemID:itemID})
  }

  const updateCartItem = (item:IItem,amount:number)=>{
      dispatch({type:'UPDATE COUNT',amount:amount,item:item})
  }



  const contextValue:any={
    items:[],
    addItem:(item:IItem)=>{},
    removeItem:(itemID:number)=>{},
    updateItemCount:(item:IItem,amount:number)=>{},
}


  contextValue.addItem=addItemToCart;
  contextValue.removeItem=removeItemFromCart
  contextValue.updateItemCount = updateCartItem
  contextValue.state=cartState;

  
  
  
  

  return (
    <CartContext.Provider value={contextValue}>
        {props.children}
    </CartContext.Provider>
  )
}
