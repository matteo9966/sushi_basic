import { ITable } from "../../interfaces/ITable";
import { IUtente } from "../../interfaces/IUtente";

export type addUserResponse = {
  errorCode: number;
  errorDescription: string;
  payload: { tavolo: ITable; utente: IUtente };
};
