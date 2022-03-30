import { IItem } from "../../interfaces/IItem";
import { ITable } from "../../interfaces/ITable";

export type OrdineCompletoResponse = {
  payload: {
    tavolo: ITable;
    ordine: IItem[];
  };
  errorCode: number;
  errorDescription: string;
};
