import React from "react";

type State = {tavoloID:string|null,portate:number|null};

export const TableContext:React.Context<{
    state:State,
    aggiornaIDTavolo:(idTavolo:string)=>void
    aggiornaNumeroPortate:(portate:number)=>void,
  

}> = React.createContext({
    state:{tavoloID:null,portate:null} as State,
    aggiornaIDTavolo:(idTavolo:string)=>{},
    aggiornaNumeroPortate:(portate:number)=>{},
})