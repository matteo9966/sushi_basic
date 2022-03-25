import { IItemCart } from "../../interfaces/IItem";

export type OrderRequest = {idUtente:string,idTavolo:string,piatti:IItemCart[]}