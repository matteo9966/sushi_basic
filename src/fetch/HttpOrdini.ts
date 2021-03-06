import { HttpFetch } from "./HttpFetch";
import { CreateTableRequest } from "../types/CreateTable/CreateTableRequest";
import { CreateTableResponse } from "../types/CreateTable/CreateTableResponse";
import { AddUserRequert } from "../types/AddUser/AddUserRequest";
import { addUserResponse } from "../types/AddUser/AddUserResponse";
import { OrderRequest } from "../types/CreateOrder/OrderRequest";
import { OrderResponse } from "../types/CreateOrder/OrderResponse";
import { OrdineCompletoResponse } from "../types/OrdineCompleto/OrdineCompletoResponse";
import { thisTableResponse } from "../types/ThisTable/thisTable";
export class HttpOrdini {

      /* 
  POST	/createTable	crea un nuovo tavolo
POST	/newUser	aggiungi un nuovo utente al tavolo
POST	/newOrder	utente crea un nuovo ordine
GET	/complete/:id	visualizza ordine completo del tavolo
GET	/thisTable/:id	visualizza tavolo
DELETE	/clearOrders/:id	svuota tutte le ordinazioni del tavolo
  
  */
  static async createTable(body: CreateTableRequest) {
    const response = await HttpFetch.getInstance().post<
      CreateTableRequest,
      CreateTableResponse
    >("/createTable", body);
    if (!response) return;
    if (response.errorCode != null||undefined) {
      throw new Error(response.errorDescription);
    }
    return response.payload;
  }

  static async newUser(body: AddUserRequert) {
    const response = await HttpFetch.getInstance().post<AddUserRequert,addUserResponse>('/newUser',body);
    console.log({response});
    if(!response) return;

    if(response.errorCode != null||undefined){
       
        throw new Error(response.errorDescription);
    }
    return response.payload;

  }


  static async newOrder(body: OrderRequest) {
    const response = await HttpFetch.getInstance().post<OrderRequest,OrderResponse>('/newOrder',body);
    console.log({response});
    if(!response) return ;
    console.log({errorCode: response.errorCode})
    if(response.errorCode != null){ throw new Error(response.errorDescription)}
    return response.payload;
  }
  static async getCompletOrder(idTavolo:string) {
    const response = await HttpFetch.getInstance().get<OrdineCompletoResponse>('/complete/'+idTavolo);
    console.log({response});
    if(!response) return ;
    console.log({errorCode: response.errorCode})
    if(response.errorCode != null){ throw new Error(response.errorDescription)}
    return response.payload;
  
  }
  static async deleteAllOrders() {}
  
  static async thisTable(idTavolo:string) {
    if(!idTavolo) throw new Error("ID tavolo non presente")
    const endpoint = `/thisTable/${idTavolo}`


    const response = await HttpFetch.getInstance().get<thisTableResponse>(endpoint);

    console.log({response,endpoint});
    if(!response) return 
    if(response.errorCode!= null){throw new Error(response.errorDescription)}
    return response.payload;

  }

  static async deleteUserOrder(params:{idTavolo:string,idUtente:string}){
    if(!params.idTavolo || !params.idUtente){
      console.log({idTavolo:params.idTavolo,idUtente:params.idUtente})
      throw new Error('ID tavolo o ID utente assente');
    }
    // const endpoint = '/clearSingleOrder/PB8GK/Y1Z591'
    const endpoint = `/clearSingleOrder/${params.idTavolo}/${params.idUtente}`;
    const response = await HttpFetch.getInstance().delete<OrdineCompletoResponse>(endpoint);
    console.log({response});
    if(!response)return
    console.log({errorCode:response.errorCode})
    if(response.errorCode!= null){throw new Error(response.errorDescription)}
    return response.payload;
  }

  static async removeUserFromTable(params:{idTavolo:string,idUtente:string}){
    if(!params.idTavolo || !params.idUtente){
      console.log({idTavolo:params.idTavolo,idUtente:params.idUtente})
      throw new Error('ID tavolo o ID utente assente');
    }
    const endpoint = `/removeUserFromTable/${params.idTavolo}/${params.idUtente}`;
    const response = await HttpFetch.getInstance().delete<OrdineCompletoResponse>(endpoint);
    if(!response)return
    console.log({errorCode:response.errorCode})
    if(response.errorCode!= null){throw new Error(response.errorDescription)}
    return response.payload;
  }
}

// export const httpOrdini = new HttpOrdini();
