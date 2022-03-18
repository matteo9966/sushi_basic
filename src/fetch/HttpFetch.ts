import { CreateTableRequest } from "../types/CreateTable/CreateTableRequest";
import { CreateTableResponse } from "../types/CreateTable/CreateTableResponse";
import { makeFetchConfig } from "../utils/makeFetchConfig";
class HttpFetch {
  private static instance: HttpFetch;
  private baseurl = "";
  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new HttpFetch();
    }
    return this.instance;
  }

  //inizializzo la richiesta del fetch e restituisco il metodo che fa la richiesta con quegli header e quel body

  //createTable
  /* 
  POST	/createTable	crea un nuovo tavolo
POST	/newUser	aggiungi un nuovo utente al tavolo
POST	/newOrder	utente crea un nuovo ordine
GET	/complete/:id	visualizza ordine completo del tavolo
GET	/thisTable/:id	visualizza tavolo
DELETE	/clearOrders/:id	svuota tutte le ordinazioni del tavolo
  
  */

  //la gestione dell'errore avviene tutta dentro il body, il json viene già convertito se l'esito va a buon fine
  async createTable(body: CreateTableRequest) {
    try{
         const response =  await this.post<CreateTableRequest,CreateTableResponse>('/createTable',body);
         if(response.errorCode!==null){
             throw new Error(response.errorDescription);
         }

         return response.payload;

    }catch(err){
       throw err 
    }


  }

  newUser(body: any) {}
  newOrder(body: any) {}
  getCompletOrder() {}
  thisTable() {}
  deleteAllOrders() {}

  //tutte richieste con un json in pancia
 private async post<RequestBody, ResponseBody>(endpoint: string, body: RequestBody) {
    const jsonBody = JSON.stringify(body);
    const headers: Headers = new Headers();
    const url = this.baseurl + endpoint;
    headers.append("Content-Type", "application/json");

    let init: RequestInit = {
      method: "POST",
      headers: headers,
      body: jsonBody,
    };
    const requestConfig = makeFetchConfig(url, init);

    const response = await fetch(requestConfig);
    if (!response.ok) {
      let responseBody = response.body;
      console.log(responseBody);
      throw new Error("è avvenuto un errore");
    }

    const responseHeaders = response.headers;
    const contentType = responseHeaders.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("non ho ricevuto i dati nel formato corretto :(");
    }
    const data = (await response.json()) as ResponseBody;
    return data;
  }
}

export const instance = HttpFetch.getInstance();