import { IOrdinazione } from "./IOrdinazione";

export interface IUtente {
    id:string,
    nome:string,
    ordinazione:IOrdinazione[];
}