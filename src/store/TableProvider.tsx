import React, { useState } from "react";
import { ITable } from "../interfaces/ITable";
import { IUtente } from "../interfaces/IUtente";
import { TableContext } from "./Table-Context";
type State = {tavolo?:ITable,utente?:IUtente};
export const TableProvider: React.FC = (props) => {
  // const [tableData, setTableData] = useState<{
  //   tavoloID: string | null;
  //   portate: number | null;
  // }>({ tavoloID: null, portate: null });

  const [utenteData,setUtenteData] = useState<IUtente>({})
  const [tableData,setTableData] = useState<ITable>({})
  const aggiornaInfoUtente =(utenteInfo:IUtente)=>{
    setUtenteData(oldData=>({...oldData,...utenteInfo}))
  }

  // const aggionraInfoTavolo = (tavolo:ITable) =>{
    
  // }

  // const aggiornaIDtavolo = (id: string) => {
  //   setTableData((tableData) => ({ ...tableData, tavoloID: id }));
  // };
  // const aggiornaNumeroPortate = (nPortate: number) => {
  //   setTableData((tableData) => ({ ...tableData, portate: nPortate }));
  // };

  const aggiornaInfoTavolo = (table:ITable) =>{
    setTableData(table);
  }



  const contextValue: {
    state:State,
    // aggiornaIDTavolo:(idTavolo:string)=>void
    // aggiornaNumeroPortate:(portate:number)=>void,
    aggiornaInfoTavolo:(tavolo:ITable)=>void,
    aggiornaInfoUtente:(utente:IUtente)=>void,
  

} = {
    state: {tavolo:tableData,utente:utenteData},
    // aggiornaIDTavolo: aggiornaIDtavolo,
    // aggiornaNumeroPortate: aggiornaNumeroPortate,
    aggiornaInfoTavolo:aggiornaInfoTavolo,
    aggiornaInfoUtente:aggiornaInfoUtente,
  };

  return (
    <TableContext.Provider value={contextValue}>
      {props.children}
    </TableContext.Provider>
  );
};
