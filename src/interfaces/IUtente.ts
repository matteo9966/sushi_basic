import { IItemCart } from "./IItem";
// import { IItem } from "./IOrdinazione";

export interface IUtente {
    id?:string,
    nome?:string,
    ordinazione?:IItemCart[];
}