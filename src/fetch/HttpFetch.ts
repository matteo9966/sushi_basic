import { makeFetchConfig } from "../utils/makeFetchConfig";
export class HttpFetch {
  private static instance: HttpFetch;
  private baseurl = "http://localhost:4444/api/v1";
  private constructor() {
    this.post = this.post.bind(this);
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new HttpFetch();
    }
    return this.instance;
  }

  async get<ResponseBody>(endpoint: string) {
    const url = this.baseurl + endpoint;

    const myRequest = new Request(url, {
      method: "GET",
    });
    try {
      const response = await fetch(myRequest);
      if (!response.ok) {
        throw new Error("Errore richiesta, " + response.status);
      }
      const responseHeaders = response.headers;
      const contentType = responseHeaders.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("non ho ricevuto i dati nel formato corretto :(");
      }
      const data = (await response.json()) as ResponseBody;

      console.log({ data });
      return data;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async post<RequestBody, ResponseBody>(endpoint: string, body: RequestBody) {
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

    try {
      const response = await fetch(requestConfig);

      if (!response.ok) {
        throw new Error("Errore richiesta, " + response.status);
      }
      const responseHeaders = response.headers;
      const contentType = responseHeaders.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("non ho ricevuto i dati nel formato corretto :(");
      }
      const data = (await response.json()) as ResponseBody;

      console.log({ data });
      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        console.error(error);
      }
      return;
    }
  }

  async delete<ResponseBody,RequestBody=void>(
    endpoint: string,
    body?: RequestBody
  ) {
    const url = this.baseurl + endpoint;
    let init: RequestInit = {
      method: "DELETE",
    };
    if (body) {
      const headers: Headers = new Headers();
      headers.append("Content-Type", "application/json");
      const jsonBody = JSON.stringify(body);
      init.body = jsonBody;
      init.headers = headers;
    }
    const requestConfig = makeFetchConfig(url, init);
    try {
      const response = await fetch(requestConfig);
      if (!response.ok) {
        throw new Error("Errore richiesta, " + response.status);
      }
      const responseHeaders = response.headers;
      const contentType = responseHeaders.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("non ho ricevuto i dati nel formato corretto :(");
      }
      const data = (await response.json()) as ResponseBody;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const instance = HttpFetch.getInstance();
