import React, { useState } from "react";
import { TableContext } from "./Table-Context";
type State = { tavoloID: string | null; portate: number | null };
export const TableProvider: React.FC = (props) => {
  const [tableData, setTableData] = useState<{
    tavoloID: string | null;
    portate: number | null;
  }>({ tavoloID: null, portate: null });
  const aggiornaIDtavolo = (id: string) => {
    setTableData((tableData) => ({ ...tableData, tavoloID: id }));
  };
  const aggiornaNumeroPortate = (nPortate: number) => {
    setTableData((tableData) => ({ ...tableData, portate: nPortate }));
  };

  const contextValue: {
    state: State;
    aggiornaIDTavolo: (idTavolo: string) => void;
    aggiornaNumeroPortate: (portate: number) => void;
  } = {
    state: tableData,
    aggiornaIDTavolo: aggiornaIDtavolo,
    aggiornaNumeroPortate: aggiornaNumeroPortate,
  };

  return (
    <TableContext.Provider value={contextValue}>
      {props.children}
    </TableContext.Provider>
  );
};
