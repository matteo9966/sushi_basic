import React from "react";
import {IItem, IItemCart} from '../interfaces/IItem'
type State = {items:IItem[],cart:IItemCart[]};
export const CartContext:React.Context<{
    state:State,
    addItem:(item:IItem)=>void,
    removeItem:(itemID:number)=>void,
    updateItemCount:(item:IItem,amount:number)=>void

}> = React.createContext({
    state:{amount:0,items:[],cart:[]} as State,
    addItem:(item:IItem)=>{},
    removeItem:(itemID:number)=>{},
    updateItemCount:(item:IItem,amount:number)=>{},
})