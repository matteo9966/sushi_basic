import { IItemCart } from "../../interfaces/IItem";
import { ITable } from "../../interfaces/ITable";

export type OrdineCompletoResponse = {
  payload: {
    tavolo: ITable;
    ordine: IItemCart[];
  };
  errorCode: number;
  errorDescription: string;
};
