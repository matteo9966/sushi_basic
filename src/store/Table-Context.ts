import React from "react";
import { ITable } from "../interfaces/ITable";
import { IUtente } from "../interfaces/IUtente";

type State = {tavolo?:ITable,utente?:IUtente};

export const TableContext:React.Context<{
    state:State,
    // aggiornaIDTavolo:(idTavolo:string)=>void
    // aggiornaNumeroPortate:(portate:number)=>void,
    aggiornaInfoTavolo:(tavolo:ITable)=>void,
    aggiornaInfoUtente:(utente:IUtente)=>void,
  

}> = React.createContext({
    state:{} as State,
    // aggiornaIDTavolo:(idTavolo:string)=>{},
    // aggiornaNumeroPortate:(portate:number)=>{},
    aggiornaInfoTavolo:(tavolo:ITable)=>{},
    aggiornaInfoUtente:(utente:IUtente)=>{},
})