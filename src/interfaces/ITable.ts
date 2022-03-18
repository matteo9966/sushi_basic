import { IUtente } from "./IUtente";

export interface ITable {
    portate:number,
    coperti:number,
    utenti:IUtente[], 
    codiceTavolo: string;
}