import { IUtente } from "../../interfaces/IUtente";
import { ITable } from "../../interfaces/ITable";
export type CreateTableResponse = {
  errorCode: number;
  errorDescription: string;
  payload: { tavolo: ITable; utente: IUtente };
};
