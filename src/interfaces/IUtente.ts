import { IItemCart } from "./IItem";
// import { IItem } from "./IOrdinazione";

export interface IUtente {
    id?:string,
    nome?:string,
    ordinazione?:IItemCart[];
    isAdmin?:boolean; // admin può rimuovere utenti dal tavolo
}